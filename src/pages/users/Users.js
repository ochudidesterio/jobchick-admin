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


  //user res
  let userRes;
  //create view profile
  const [showViewProfile, setViewProfile] = useState(false);
  const handleShowViewProfile = () => setViewProfile(false);

 

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
 

  return (
    <div dir="rtl" className="userhome">
      <ToastContainer position="top-right" />
      
      <UsersTable
        openViewProfile={openViewProfile}
       
      />
     
      <ViewProfileModal
        open={showViewProfile}
        onClose={handleShowViewProfile}
      />
    </div>
  );
};

export default Users;
