import React, { useEffect, useState } from "react";
import api from "../../api/api";
import CustomAddButton from "../../components/CustomAddButton";
import { setUsers } from "../../redux/slices/UsersSlice";
import { useDispatch } from "react-redux";
import "./users.css";
import UsersTable from "./UsersTable";
import AddUserModal from "../../modals/AddUserModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from "../../Constants/Toasts";
const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [formData, setFormData] = useState({
    username: "",
   email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.email === "" || formData.password === "") {
         showErrorToast("Email and Password are required");
      } else {
        const response = await api.post("/auth/register", formData);
        if (response.data.message === "Successful") {
          showSuccessToast(response.data.message);
        } else if (response.data.message === "User with email exists") {
          showErrorToast(response.data.message);
        } else {
          showErrorToast("An error occured");
        }
      }
    } catch {}

    handleClose();
    //window.location.reload()
  };

  const dispatch = useDispatch();
  useEffect(() => {
    fetchUsers();
  });

  const fetchUsers = async () => {
    try {
      const response = await api.get("/user/all");
      if (response.status === 200) {
        dispatch(setUsers(response.data));
      }
      console.log(response.status);
    } catch (error) {}
  };

  return (
    <div className="userhome">
      <ToastContainer position="top-right" />
      <div className="userstop">
        <h3>Users</h3>
        <div>
          <CustomAddButton onClick={handleShow} name="Add User" />
        </div>
      </div>
      <UsersTable />
      <AddUserModal
        title="Add User"
        open={showModal}
        onClose={handleClose}
        onSubmit={handleFormSubmit}
        formData={formData}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Users;
