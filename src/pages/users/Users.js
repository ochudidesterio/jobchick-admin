import React, { useEffect, useState } from "react";
import api from "../../api/api";
// import CustomAddButton from "../../components/CustomAddButton";
import {
  getLoggedInUser,
  setSelectedUser,
  setUsers,
} from "../../redux/slices/UsersSlice";
import { useDispatch, useSelector } from "react-redux";
import "./users.css";
import UsersTable from "./UsersTable";
// import AddUserModal from "../../modals/AddUserModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { showErrorToast, showSuccessToast } from "../../Constants/Toasts";
import ViewProfileModal from "../../modals/ViewProfileModal";
 import EditUserModal from "../../modals/EditUserModal";
// import ChangePasswordModal from "../../modals/ChangePasswordModal";
import { getCompany } from "../../redux/slices/CompaniesSlice";
import PaginationItem from "../../components/PaginationItem";
import { showErrorToast, showSuccessToast } from "../../Constants/Toasts";
import SuspendUserModal from "../../modals/SuspendUserModal";

const Users = () => {
  const loggedUser = useSelector(getLoggedInUser);
  const mycompany = useSelector(getCompany);

   //pagination
   const [page, setPage] = useState(1);
   const [pageCount,setPageCount] = useState(4)
   const [startIndex,setStartIndex] = useState(0)
   const [endIndex,setEndIndex] = useState(0)
   const [entries,setEntries] = useState(0)
   const [pageSize, setPageSize] = useState(10); // Default page size

   const handleChange = (event, value) => {
     setPage(value);
   };
   const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10); // Use radix 10

    setPageSize(newSize);
  };

  //suspend user modal
  const [showSuspendUser, setShowSuspendUser] = useState(false);
  const handleCloseSuspendUser = () => setShowSuspendUser(false);
  const [selectedUserId,setSelectedUserId] = useState(null)

   //update  data
   const [userUpdateData, setUserUpdateData] = useState({
    id:"",
    age:"",
    authUsername:"",
    bio:"",
    cvUrl:"",
    education:"",
    email:"",
    firstName:"",
    gender:"",
    lastName:"",
    phoneNumber:"",
    proffession:""

  });

  const handleEditUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserUpdateData({ ...userUpdateData, [name]: value });
  };
  const handleEditUserFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/user/admin/update/${userUpdateData.id}`,userUpdateData)
      if(response.status === 200){
        showSuccessToast("Updated Successfully")
      }
      handleEditClose()

    } catch (error) {
      
    }
  }
  
  //user res
  let userRes;
  //create view profile
  const [showViewProfile, setViewProfile] = useState(false);
  const handleShowViewProfile = () => setViewProfile(false);
  //edit modals
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditClose = () => setShowEditModal(false);
  //search param
  const [searchParam,setSearchParam] = useState(null)
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
  setSearchParam(value);
  };
 
 

  const dispatch = useDispatch();
  useEffect(() => {
    fetchUsers();
  });

  const fetchUsers = async () => {
    try {
      if (loggedUser && loggedUser.role === "ADMIN") {
        let apiEndpoint = `/user/company/${mycompany.id}/page/${page}/size/${pageSize}`
        const params = searchParam ? `?param=${encodeURIComponent(searchParam)}` : '';
        userRes = await api.get(apiEndpoint + params);
      } 
      if(loggedUser && loggedUser.role === "SUPERADMIN") {
        let apiEndpoint = `/user/all/page/${page}/size/${pageSize}`;
        const params = searchParam ? `?param=${encodeURIComponent(searchParam)}` : '';
        userRes = await api.get(apiEndpoint + params);
      }
      if (userRes.status === 200) {
        dispatch(setUsers(userRes.data.users));
        setPageCount(userRes.data.totalPages)
        setStartIndex(userRes.data.startIndex)
        setEndIndex(userRes.data.endIndex)
        setEntries(userRes.data.totalItems)
      }
    } catch (error) {}
  };


  const openViewProfile =(userId)=>{
    try {
      api.get(`/user/${userId}`)
      .then((res)=>{
        if(res.status===200){
          dispatch(setSelectedUser(res.data))
          setViewProfile(true)
        }
      })
      .catch((error)=>{console.log(error)})
    } catch (error) {

    }

  }
  const openEditProfile = (userId) =>{
    try {
      api.get(`/user/${userId}`)
      .then((res)=>{
        if(res.status===200){
         console.log("UserUpdate",res.data)
         setUserUpdateData({
          id:res.data.id,
          age:res.data.age,
          authUsername:res.data.authUsername,
          bio:res.data.bio,
          cvUrl:res.data.cvUrl,
          education:res.data.education,
          email:res.data.email,
          firstName:res.data.firstName,
          gender:res.data.gender,
          lastName:res.data.lastName,
          phoneNumber:res.data.phoneNumber,
          proffession:res.data.proffession
         })
         setShowEditModal(true)
        }
      })
      .catch((error)=>{console.log(error)})
    } catch (error) {

    }
  }
  const suspendUser =(id)=>{
    setSelectedUserId(id)
    setShowSuspendUser(true);
  }
  const handleSuspendUser = async (e)=>{
    try {
      e.preventDefault()
      const res = await api.post(`/user/suspend/${selectedUserId}`)
      if(res.status === 200){
        showSuccessToast(res.data)
        handleCloseSuspendUser()
      }else{
        showErrorToast(res.data)
      }
      
    } catch (error) {
      showErrorToast("Something went wrong, try again")
    }
  }
 

  return (
    <div dir="rtl" className="userhome">
      <ToastContainer position="top-right" />
      
      <UsersTable
        openViewProfile={openViewProfile} 
        pageSize ={pageSize}
        handlePageSize = {handlePageSizeChange}
        param = {searchParam}
        onChange = {handleSearchInputChange}
        totalUsers={entries}
        openEditProfile={openEditProfile}
        suspendUser={suspendUser}
      />

<PaginationItem page={page} pageCount={pageCount} handleChange={handleChange} startIndex={startIndex} endIndex={endIndex} entries={entries} />
      <ViewProfileModal
        open={showViewProfile}
        onClose={handleShowViewProfile}
      />
      <EditUserModal open={showEditModal} onClose={handleEditClose} onChange={handleEditUserInputChange} onSubmit={handleEditUserFormSubmit} data={userUpdateData}/>
      <SuspendUserModal open={showSuspendUser} onClose={handleCloseSuspendUser} onSubmit={handleSuspendUser} />
    </div>
  );
};

export default Users;
