import React, { useEffect, useState } from "react";
import api from "../../api/api";
import CustomAddButton from "../../components/CustomAddButton";
import "./companies.css";
import { useDispatch } from "react-redux/es/exports";
import { setCompanies } from "../../redux/slices/CompaniesSlice";
import { setCategories } from "../../redux/slices/CategorySlice";
import { CompaniesTable } from "./CompaniesTable";
import AddCompaniesModal from "../../modals/AddCompaniesModal";
import { showErrorToast, showSuccessToast } from "../../Constants/Toasts";
import { ToastContainer } from "react-toastify";
import CreateJobModal from "../../modals/CreateJobModal";

const Companies = () => {
  const dispatch = useDispatch();

  //selected company
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  //add company modal
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  //create job modal
  const [showCreateJob, setCreateJob] = useState(false);
  const handleCloseCreateJob = () => setCreateJob(false);

  //create company data
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
  useEffect(() => {
    fetchCompanies();
  });
  //create job data
  const [jobData, setJobData] = useState({
    title: "",
    type: "",
    region: "",
    categoryId: "",
    description: "",
    level: "",
    companyId: "",
  });
  const handleJobInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };
  const handleJobFormSubmit = async (e) => {
    jobData.companyId = selectedCompanyId;
    e.preventDefault();
    try {
      if (
        jobData.description === "" ||
        jobData.level === "" ||
        jobData.region === "" ||
        jobData.title === "" ||
        jobData.type === ""
      ) {
        showErrorToast("Failed, all fields are required")
      }else{
        
        const response = await api.post("/job/create", jobData);
        if(response.status === 200){
          showSuccessToast("Created")
          handleCloseCreateJob();

        }

      }
    } catch (error) {}

    //window.location.reload()
  };
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
  const openCreateJob = (companyId) => {
    setSelectedCompanyId(companyId); // Update the selected company ID
    setCreateJob(true); // Open the modal
  };

  useEffect(() => {
    fetchCategories();
  });
  const fetchCategories = async () => {
    try {
      const response = await api.get("/category/get/all");
      if (response.status === 200) {
        dispatch(setCategories(response.data));
      }
    } catch (error) {
      console.log(error);
    }
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
      <CompaniesTable openCreateJob={openCreateJob} />
      <AddCompaniesModal
        open={showModal}
        onClose={handleClose}
        onSubmit={handleFormSubmit}
        formData={formData}
        onChange={handleInputChange}
      />
      <CreateJobModal
        open={showCreateJob}
        onClose={handleCloseCreateJob}
        onSubmit={handleJobFormSubmit}
        jobData={jobData}
        onChange={handleJobInputChange}
      />
    </div>
  );
};

export default Companies;
