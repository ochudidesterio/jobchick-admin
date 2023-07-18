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
import CreateJobModal from "../../modals/CreateJobModal";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { getLoggedInUser } from "../../redux/slices/UsersSlice";
import { getCompany } from "../../redux/slices/CompaniesSlice";
import CustomAddButton from "../../components/CustomAddButton";

const Unpublished = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(getLoggedInUser);
  const mycompany = useSelector(getCompany);
  //unpublished job response
  let jobres;

  //create job modal
  const [showCreateJob, setCreateJob] = useState(false);
  const handleCloseCreateJob = () => setCreateJob(false);
  const handleShowCreateJob =()=>setCreateJob(true)

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
  const [company, setCompany] = useState(null);
  //roles data
  // const [roleData, setRolesData] = useState({
  //   jobId: "",
  //   role: "",
  // });

  const [roleData, setRolesData] = useState([
    {
      id: 1,
      role: "",
    },
  ]);
  

  //qualifications data
  // const [qualificationData, setQualificationData] = useState({
  //   qualification: "",
  //   jobId: "",
  // });

  const [qualificationData, setQualificationData] = useState([
    {
      id: 1,
      qualification: "",
    },
  ]);

  //create job data
  const [jobData, setJobData] = useState({
    title: "",
    typeId: "",
    regionId: "",
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
    jobData.companyId = mycompany.id;
    e.preventDefault();
    try {
      if (
        jobData.description === "" ||
        jobData.level === "" ||
        jobData.regionId === "" ||
        jobData.title === "" ||
        jobData.typeId === ""
      ) {
        showErrorToast("Failed, all fields are required");
      } else {
        const response = await api.post("/job/create", jobData);
        if (response.status === 200) {
          showSuccessToast("Created");
          handleCloseCreateJob();
        }
      }
    } catch (error) {}

    //window.location.reload()
  };

  //qualifications input
  // const handleQualificationsInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setQualificationData({ ...qualificationData, [name]: value });
  // };

  const handleQualificationsInputChange = (e,id) => {
    const { value } = e.target;
    setQualificationData((prevState) =>
      prevState.map((qualification) => (qualification.id === id ? { ...qualification, qualification: value } : qualification))
    );
  };
  //roles input
  // const handleRolesInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setRolesData({ ...roleData, [name]: value });
  // };

  const handleRolesInputChange = (e, id) => {
    const { value } = e.target;
    setRolesData((prevState) =>
      prevState.map((role) => (role.id === id ? { ...role, role: value } : role))
    );
  };
  

  //qualification submit
  // const handleQualificationSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     qualificationData.jobId = selectedJobId;
  //     const response = await api.post(
  //       "/job/qualifications/create",
  //       qualificationData
  //     );
  //     if (response.status === 200) {
  //       showSuccessToast("Added");
  //       setQualificationData("")
  //       handleCloseShowAddQualifications();
  //     } else {
  //       showErrorToast("Failed");
  //     }
  //   } catch (error) {}
  // };
  const handleQualificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const responses = await Promise.all(
        qualificationData.map(({ qualification }) =>
         api.post("/job/qualifications/create", { jobId: selectedJobId, qualification })
       )
      );

      const successResponses = responses.filter(
        (res) => res.status === 200
      ).length;

      if (successResponses === qualificationData.length) {
        showSuccessToast("Added");
        setQualificationData([{ id: Date.now(), qualification: "" }]); // Reset the qualificationData to a single empty role object
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
      const responses = await Promise.all(
        roleData.map(({ role }) =>
        api.post("/job/roles/create", { jobId: selectedJobId, role })
       )
      );
  
      const successResponses = responses.filter(
        (res) => res.status === 200
      ).length;
  
      if (successResponses === roleData.length) {
        showSuccessToast("Added");
        setRolesData([{ id: Date.now(), role: "" }]); // Reset the roleData to a single empty role object
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
            setCompany(res.data.company);
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
      if (loggedUser && loggedUser.role === "ADMIN") {
        jobres = await api.get(`/job/company/inactive/${mycompany.id}`);
      } else {
        jobres = await api.get("/job/all/inactive");
      }
      if (jobres.status === 200) {
        dispatch(setInActiveJobs(jobres.data));
      }
    } catch (error) {}
  };
  return (
    <div className="unpublished-home">
      <ToastContainer position="top-right" />
      <div className="unpublished-top">
        <h3>Unpublished Jobs</h3>
        {loggedUser && loggedUser.role === "ADMIN" && (
          <CustomAddButton onClick={handleShowCreateJob} name="Create a Job" />
        )}
      </div>
      <UpublishedTable
        openAddRole={openAddRole}
        openAddQualification={openAddQualification}
        openViewJob={openViewJob}
      />
      {/* <AddRolesModal
        open={showCreateRoles}
        onClose={handleCloseCreateRoles}
        onSubmit={handleRolesSubmit}
        roleData={roleData}
        onChange={handleRolesInputChange}
        title={selectedJobName}
      /> */}

<AddRolesModal
  open={showCreateRoles}
  onClose={handleCloseCreateRoles}
  onSubmit={handleRolesSubmit}
  roleData={roleData}
  onChange={handleRolesInputChange}
  title={selectedJobName}
  onAddRole={() =>
    setRolesData((prevState) => [
      ...prevState,
      { id: Date.now(), role: "" },
    ])
  }
/>

      <AddQualificationsModal
        open={showAddQualification}
        onClose={handleCloseShowAddQualifications}
        onSubmit={handleQualificationSubmit}
        data={qualificationData}
        onChange={handleQualificationsInputChange}
        title={selectedJobName}
        onAddQualification={() =>
          setQualificationData((prevState) => [
            ...prevState,
            { id: Date.now(), qualification: "" },
          ])
        }
      />
      <ViewJobModal
        open={showViewJobs}
        onClose={handleShowViewJob}
        company={company}
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

export default Unpublished;
