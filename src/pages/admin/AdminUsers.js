import React, { useEffect, useState } from "react";
import api from "../../api/api";
import CustomAddButton from "../../components/CustomAddButton";
import "./admin.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setAdmins } from "../../redux/slices/UsersSlice";
import AdminTable from "./AdminTable";
import { showSuccessToast, showErrorToast } from "../../Constants/Toasts";
import { ToastContainer } from "react-toastify";
import AddAdminModal from "./AddAdminModal";
import { useTranslation } from 'react-i18next';


const AdminUsers = () => {
  const {t} = useTranslation()
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [formData, setFormData] = useState({
    authUsername: "",
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
        const response = await api.post("/user/add/admin", formData);
        console.log(response.data);
        if (response.data === "created") {
          showSuccessToast(response.data);
        } else if (response.data === "user with email exists") {
          showErrorToast(response.data);
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
    getAddmins();
  });
  const getAddmins = async () => {
    try {
      const response = await api.get("/user/admins");
      if (response.status === 200) {
        dispatch(setAdmins(response.data));
      }
    } catch (error) {}
  };

  return (
    <div dir="rtl" className="adminhome">
      <ToastContainer position="top-right" />

      <div className="admintop">
        <h3>Admins</h3>
        <div>
          <CustomAddButton onClick={handleShow} name="Add Admin" />
        </div>
      </div>
      <AdminTable />
      <AddAdminModal
        title="Add Admin"
        open={showModal}
        onClose={handleClose}
        onSubmit={handleFormSubmit}
        formData={formData}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default AdminUsers;
