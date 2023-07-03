import React, { useEffect, useState } from "react";
import "./upublished.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import api from "../../api/api";
import {
  setInActiveJobs,
  setQualifications,
  setRoles,
  setSelectedJob,
} from "../../redux/slices/JobsSlice";
import UpublishedTable from "./UpublishedTable";
import AddRolesModal from "../../modals/AddRolesModal";
import { showErrorToast, showSuccessToast } from "../../Constants/Toasts";
import { ToastContainer } from "react-toastify";
import AddQualificationsModal from "../../modals/AddQualificationsModal";
import ViewJobModal from "../../modals/ViewJobModal";

const Unpublished = () => {
  const dispatch = useDispatch();

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedJobName, setSelectedJobName] = useState(null);

  //create roles modal
  const [showCreateRoles, setShowCreateRoles] = useState(false);
  const handleCloseCreateRoles = () => setShowCreateRoles(false);
  //create qualifications modal
  const [showAddQualification, setShowAddQualification] = useState(false);
  const handleCloseShowAddQualifications = () => setShowAddQualification(false);
  //create view job modal
  const [showViewJobs, setViewJobs] = useState(false);
  const handleShowViewJob = () => setViewJobs(false);

    //job company
    const [company,setCompany] = useState(null)
  //roles data
  const [roleData, setRolesData] = useState({
    jobId: "",
    role: "",
  });
  //qualifications data
  const [qualificationData, setQualificationData] = useState({
    qualification: "",
    jobId: "",
  });

  //qualifications input
  const handleQualificationsInputChange = (e) => {
    const { name, value } = e.target;
    setQualificationData({ ...qualificationData, [name]: value });
  };
  //roles input
  const handleRolesInputChange = (e) => {
    const { name, value } = e.target;
    setRolesData({ ...roleData, [name]: value });
  };

  //qualification submit
  const handleQualificationSubmit = async (e) => {
    e.preventDefault();
    try {
      qualificationData.jobId = selectedJobId;
      const response = await api.post(
        "/job/qualifications/create",
        qualificationData
      );
      if (response.status === 200) {
        showSuccessToast("Added");
        handleCloseShowAddQualifications();
      } else {
        showErrorToast("Failed");
      }
    } catch (error) {}
  };
  //roles submit
  const handleRolesSubmit = async (e) => {
    e.preventDefault();

    try {
      roleData.jobId = selectedJobId;
      const response = await api.post("/job/roles/create", roleData);
      if (response.status === 200) {
        showSuccessToast("Added");
        handleCloseCreateRoles();
      } else {
        showErrorToast("Failed");
      }
    } catch (error) {}
  };
 
  //show roles modal
  const openAddRole = (jobId, title) => {
    setSelectedJobId(jobId);
    setSelectedJobName(title);
    setShowCreateRoles(true);
  };
  //show qualification modal
  const openAddQualification = (jobId, title) => {
    setSelectedJobId(jobId);
    setSelectedJobName(title);
    setShowAddQualification(true);
  };
  //show view job modal
  const openViewJob = (jobId) => {
    setSelectedJobId(jobId);
    try {
      api
        .get(`/job/${jobId}`)
        .then((res) => {
          if (res.status === 200) {
            dispatch(setSelectedJob(res.data));
            setCompany(res.data.company)
            setViewJobs(true);
            api.get(`/job/roles/${jobId}`).then((roles) => {
              dispatch(setRoles(roles.data));
            });
            api.get(`/job/qualifications/${jobId}`).then((qualifications) => {
              dispatch(setQualifications(qualifications.data));
            });
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {}
  };

  useEffect(() => {
    getInActiveJobs();
  });
  const getInActiveJobs = async () => {
    try {
      const response = await api.get("/job/all/inactive");
      if (response.status === 200) {
        dispatch(setInActiveJobs(response.data));
      }
    } catch (error) {}
  };
  return (
    <div className="unpublished-home">
      <ToastContainer position="top-right" />
      <h3>Unpublished Jobs</h3>
      <UpublishedTable
        openAddRole={openAddRole}
        openAddQualification={openAddQualification}
        openViewJob={openViewJob}
      />
      <AddRolesModal
        open={showCreateRoles}
        onClose={handleCloseCreateRoles}
        onSubmit={handleRolesSubmit}
        roleData={roleData}
        onChange={handleRolesInputChange}
        title={selectedJobName}
      />
      <AddQualificationsModal
        open={showAddQualification}
        onClose={handleCloseShowAddQualifications}
        onSubmit={handleQualificationSubmit}
        data={qualificationData}
        onChange={handleQualificationsInputChange}
        title={selectedJobName}
      />
      <ViewJobModal open={showViewJobs} onClose={handleShowViewJob} company={company} />
    </div>
  );
};

export default Unpublished;
