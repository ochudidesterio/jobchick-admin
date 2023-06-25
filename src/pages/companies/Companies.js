import React, { useEffect, useState } from "react";
import api from "../../api/api";
import CustomAddButton from "../../components/CustomAddButton";
import "./companies.css";
import { useDispatch } from "react-redux/es/exports";
import { setCompanies } from "../../redux/slices/CompaniesSlice";
import { CompaniesTable } from "./CompaniesTable";
import AddCompaniesModal from "../../modals/AddCompaniesModal";
import { showSuccessToast } from "../../Constants/Toasts";
import { ToastContainer } from "react-toastify";

const Companies = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/company/create", formData);
      if (response.status === 200) {
        showSuccessToast("Created");
      }
    } catch (error) {}
    handleClose();
    //window.location.reload()
  };
  const dispatch = useDispatch();
  useEffect(() => {
    fetchCompanies();
  });
  const fetchCompanies = async () => {
    try {
      const response = await api.get("/company/all");
      if (response.status === 200) {
        dispatch(setCompanies(response.data));
      }
    } catch (error) {}
  };
  return (
    <div className="companyhome">
      <ToastContainer position="top-right" />

      <div className="companytop">
        <h3>Companies</h3>
        <div>
          <CustomAddButton onClick={handleShow} name="Add Company" />
        </div>
      </div>
      <CompaniesTable />
      <AddCompaniesModal
        open={showModal}
        onClose={handleClose}
        onSubmit={handleFormSubmit}
        formData={formData}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Companies;
