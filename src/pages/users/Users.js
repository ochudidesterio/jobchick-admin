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
// import EditUserModal from "../../modals/EditUserModal";
// import ChangePasswordModal from "../../modals/ChangePasswordModal";
import { getCompany } from "../../redux/slices/CompaniesSlice";
const Users = () => {
  const loggedUser = useSelector(getLoggedInUser);
  const mycompany = useSelector(getCompany);
  // const [showModal, setShowModal] = useState(false);
  // const handleClose = () => setShowModal(false);
  // const handleShow = () => setShowModal(true);

  //user res
  let userRes;
  //create view profile
  const [showViewProfile, setViewProfile] = useState(false);
  const handleShowViewProfile = () => setViewProfile(false);

  //create edit profile
  // const [showEditProfile, setEditProfile] = useState(false);
  // const handleShowEditProfile = () => setEditProfile(false);

  //  //create change password
  //  const [showChangePassword, setChangePassword] = useState(false);
  //  const handleShowChangePassword = () => setChangePassword(false);

  //   const [formData, setFormData] = useState({
  //     username: "",
  //    email: "",
  //     password: "",
  //   });
  //   const [editData,setEditData] =useState({
  //     firstName:"",
  //     lastName:"",
  //     authUsername:"",
  //     age:"",
  //     phoneNumber:"",
  //     email:"",
  //     gender:"",
  //     proffession:"",
  //     id:""
  //   })
  //   const [password,setPassword] = useState("");
  //   const [userId,setUserId]=useState(null)

  //   //handle input for password
  //   const handlePasswordInputChange=(e)=>{
  //     setPassword(e.target.value)
  //   }

  //   //handle for create user
  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //   };

  //   //handleSubmitChangePassword
  //   const handleChangePasswordSubmit =async(e)=>{
  //     e.preventDefault()
  //     try {
  //     const response = await api.post(`/user/${userId}/password/${password}`)
  //     if(response.data === "changed"){
  //       handleShowChangePassword()
  //       showSuccessToast("Password changed successfully")
  //       setPassword(null)
  //     }else{
  //       showErrorToast("Password not changed")
  //     }
  //     } catch (error) {

  //     }
  //   }
  // //handle for edit profile
  //   const handleEditProfileInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setEditData({ ...editData, [name]: value });
  //   };

  //   //handle submit for edit user
  //   const handleEditFormSubmit =async (e) =>{
  //     e.preventDefault()
  //     try {
  //       const response = await api.post(`/user/update/${editData.id}`,editData)
  //       if(response.status === 200){
  //         handleShowEditProfile()
  //         showSuccessToast("Updated")
  //       }else{
  //         showErrorToast("An error occured")
  //       }
  //     } catch (error) {

  //     }
  //   }

  // // handle submit for create user
  //   const handleFormSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       if (formData.email === "" || formData.password === "") {
  //          showErrorToast("Email and Password are required");
  //       } else {
  //         const response = await api.post("/auth/register", formData);
  //         if (response.data.message === "Successful") {
  //           showSuccessToast(response.data.message);
  //         } else if (response.data.message === "User with email exists") {
  //           showErrorToast(response.data.message);
  //         } else {
  //           showErrorToast("An error occured");
  //         }
  //       }
  //     } catch {}

  //     handleClose();
  //     //window.location.reload()
  //   };

  const dispatch = useDispatch();
  useEffect(() => {
    fetchUsers();
  });

  const fetchUsers = async () => {
    try {
      if (loggedUser && loggedUser.role === "ADMIN") {
        userRes = await api.get(`/user/company/${mycompany.id}`);
      } else {
        userRes = await api.get("/user/all");
      }
      if (userRes.status === 200) {
        dispatch(setUsers(userRes.data));
      }
    } catch (error) {}
  };

  // const openChangePassword = (id)=>{
  //   setUserId(id)
  //   setChangePassword(true)
  // }
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
  // const openEditProfile =(userId)=>{
  //   try {
  //     api.get(`/user/${userId}`)
  //     .then((res)=>{
  //       if(res.status===200){

  //         setEditData({
  //           firstName: res.data.firstName,
  //           lastName: res.data.lastName,
  //           authUsername: res.data.authUsername,
  //           age: res.data.age,
  //           phoneNumber: res.data.phoneNumber,
  //           email: res.data.email,
  //           gender: res.data.gender,
  //           proffession: res.data.proffession,
  //           id:res.data.id,
  //         });
  //         setEditProfile(true)

  //       }
  //     })
  //     .catch((error)=>{console.log(error)})
  //   } catch (error) {

  //   }

  // }

  return (
    <div className="userhome">
      <ToastContainer position="top-right" />
      <div className="userstop">
        <h3>Users</h3>
        {/* <div>
          <CustomAddButton onClick={handleShow} name="Add User" />
        </div> */}
      </div>
      <UsersTable
        openViewProfile={openViewProfile}
        // openEditProfile={openEditProfile}
        // openChangePassword={openChangePassword}
      />
      {/* <AddUserModal
        title="Add User"
        open={showModal}
        onClose={handleClose}
        onSubmit={handleFormSubmit}
        formData={formData}
        onChange={handleInputChange}
      />
      <EditUserModal open={showEditProfile}
      onClose={handleShowEditProfile}
      data={editData}
      onChange={handleEditProfileInputChange}
      onSubmit={handleEditFormSubmit}
       />
       <ChangePasswordModal
       open={showChangePassword}
       data={password}
       onChange={handlePasswordInputChange}
       onSubmit={handleChangePasswordSubmit}
       onClose={handleShowChangePassword}
        /> */}
      <ViewProfileModal
        open={showViewProfile}
        onClose={handleShowViewProfile}
      />
    </div>
  );
};

export default Users;
