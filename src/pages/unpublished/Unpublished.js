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
import { useTranslation } from 'react-i18next';
import { setCategories } from "../../redux/slices/CategorySlice";
import { setRegions } from "../../redux/slices/RegionSlice";
import {setTypes} from "../../redux/slices/TypesSlice"
import EditJobRolesModal from "../../modals/EditJobRolesModal";
import EditJobQualificationsModal from "../../modals/EditJobQualificationModal";
import EditJobDescriptionModal from "../../modals/EditJobDescriptionModal";


const Unpublished = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const loggedUser = useSelector(getLoggedInUser);
  const mycompany = useSelector(getCompany);


  const [editDescData, setEditDescData] = useState({
    id: null,
    description: null,
    title: null,
  });
  const [rolesEditData, setRolesEditData] = useState([]);
  const[qualificationEditData,setQualificationEditData] = useState([])

  const [showEditDesc, setShowEditDesc] = useState(false);
  const [showEditRoles, setShowEditRoles] = useState(false);
  const [showEditQualifications, setShowEditQualifications] = useState(false);

  const handleShowEditDesc = () => setShowEditDesc(false);
  const handleShowEditRoles = () => setShowEditRoles(false);
  const handleShowEditQualifications = () => setShowEditQualifications(false);

  const handleEditDescriptionInputChange = (e) => {
    const { name, value } = e.target;
    setEditDescData({ ...editDescData, [name]: value });
  };
  const handleSubmitEditDescription = async(e) => {
    e.preventDefault();
    try {
     const res = await api.post("/job/update",editDescData)
      handleShowEditDesc();
      showSuccessToast(res.data)
    } catch (error) {
      console.log("Error Editing Job Description:",error)
      showErrorToast("Failed")
    }
  };
   // Function to handle changes in roles' descriptions
   const handleRolesChange = (roleId, updatedRole) => {
    // Find the role in the state and update its role property
    const updatedRoles = rolesEditData.map((r) =>
      r.id === roleId ? { ...r, role: updatedRole.role } : r
    );
    setRolesEditData(updatedRoles);
  };

  // Function to handle changes in qualification' descriptions
  const handleQualificationChange = (qId, updatedQ) => {
    // Find the qualification in the state and update its qualification property
    const updatedQualifications = qualificationEditData.map((q) =>
      q.id === qId ? { ...q, qualification: updatedQ.qualification } : q
    );
    setQualificationEditData(updatedQualifications);
  };
  const handleRolesEditSubmit =async(e)=>{
    e.preventDefault()
    try {
     const res = await api.post("/job/roles/update",rolesEditData)
      showSuccessToast(res.data)
      handleShowEditRoles()
    } catch (error) {
      console.log("Error Editing Roles:",error)
      showErrorToast("Failed")
    }
  }
  const handleQualificationsEditSubmit =async(e)=>{
    e.preventDefault()
    try {
     const res = await api.post("/job/qualifications/update",qualificationEditData)
      showSuccessToast(res.data)
      handleShowEditQualifications()
    } catch (error) {
      console.log("Error Editing Qualifications:",error)
      showErrorToast("Failed")
    }
  }



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
    latitude: 31.76904,
    longitude: 35.21633,
  });

  const updateJobData = (newLat, newLng) => {
    setJobData({ ...jobData, latitude: newLat, longitude: newLng });
  };
  const handleJobInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };
  const handleJobFormSubmit = async  (e) => {
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
        showErrorToast(t('failedallfieldsrequired'));
      } else {
        const response = await api.post("/job/create", jobData);
        if (response.status === 200) {
          showSuccessToast(t('created'));
          handleCloseCreateJob();
        }
      }
    } catch (error) {}

    //window.location.reload()
  };

  //qualifications input
  

  const handleQualificationsInputChange = (e,id) => {
    const { value } = e.target;
    setQualificationData((prevState) =>
      prevState.map((qualification) => (qualification.id === id ? { ...qualification, qualification: value } : qualification))
    );
  };
 

  const handleRolesInputChange = (e, id) => {
    const { value } = e.target;
    setRolesData((prevState) =>
      prevState.map((role) => (role.id === id ? { ...role, role: value } : role))
    );
  };
  

  
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
        showSuccessToast(t('added'));
        setQualificationData([{ id: Date.now(), qualification: "" }]); // Reset the qualificationData to a single empty role object
        handleCloseShowAddQualifications();
      } else {
        showErrorToast(t('failed'));
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
        showSuccessToast(t('added'));
        setRolesData([{ id: Date.now(), role: "" }]); // Reset the roleData to a single empty role object
        handleCloseCreateRoles();
      } else {
        showErrorToast(t('failed'));
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
        if (jobres.status === 200) {
          dispatch(setInActiveJobs(jobres.data));
        }

      } else {
        jobres = await api.get("/job/all/inactive");
        if (jobres.status === 200) {
          dispatch(setInActiveJobs(jobres.data));
        }
      }
      
    } catch (error) {}
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
    } catch (error) {}
  };
  useEffect(()=>{fetchRegions()})
  const fetchRegions = async ()=>{
    try{
      const response = await api.get("/region/all")
      if(response.status === 200){
        dispatch(setRegions(response.data))
      }
    }catch(error){

    }
  }
  useEffect(() => {
    fetchJobTypes();
  });
  const fetchJobTypes = async () => {
    try {
      const response = await api.get("/type/all");
      if (response.status === 200) {
        dispatch(setTypes(response.data));
      }
    } catch (error) {}
  };


//showEditDescriptio
const openEditJobDescription = (id) => {
  api
    .get(`/job/${id}`)
    .then((res) => {
      setEditDescData({
        id: res.data.id,
        description: res.data.description,
        title: res.data.title,
      });
      setShowEditDesc(true);
    })
    .catch((err) => console.log("Error fetching Job", err));
};
//show Edit Qualitifications
const openEditQualifications = (id) => {
  api.get(`/job/qualifications/${id}`)
  .then((res)=>{
    setShowEditQualifications(true);
    setQualificationEditData(res.data)
  })
  .catch(err=>console.log("Error fetching qualifications",err))
  
};
//show Edit Roles
const openEditRoles = (id) => {
  api
    .get(`/job/roles/${id}`)
    .then((res) => {
      setShowEditRoles(true);
      setRolesEditData(res.data);
    })
    .catch((err) => console.log("Error fetching roles", err));
};
const deleteJob = async (id)=>{
  const apiEndpoint = `/job/delete?param=${id}`;

  try {
    const response = await api.delete(apiEndpoint);

    if (response.status === 200) {
      // Assuming you have a function to refresh the job list after deletion
      getInActiveJobs();
      showSuccessToast("Job deleted successfully");
    } else {
      showErrorToast("Failed to delete job");
    }
  } catch (error) {
    console.error("Error deleting job:", error);
    showErrorToast("Failed to delete job");
  }
}


  return (
    <div dir="rtl" className="unpublished-home">
      <ToastContainer position="top-right" />
      <div className="unpublished-top">
        <h3>{t('unpublishedjobs')}</h3>
        {loggedUser && loggedUser.role === "ADMIN" && (
          <CustomAddButton onClick={handleShowCreateJob} name={t('createajob')} />
        )}
      </div>
      <UpublishedTable
        openAddRole={openAddRole}
        openAddQualification={openAddQualification}
        openViewJob={openViewJob}
        deleteJob = {deleteJob}
      />
     

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
        openEditDesc ={openEditJobDescription}
        openEditRoles ={openEditRoles}
        openEditQualification = {openEditQualifications}
      />

      <CreateJobModal
        open={showCreateJob}
        onClose={handleCloseCreateJob}
        onSubmit={handleJobFormSubmit}
        jobData={jobData}
        onChange={handleJobInputChange}
        upDateJobData={updateJobData}
      />

<EditJobRolesModal
        data={rolesEditData}
        open={showEditRoles}
        onClose={handleShowEditRoles}
        onChange={handleRolesChange}
        onSubmit={handleRolesEditSubmit}
      />
      <EditJobDescriptionModal
        open={showEditDesc}
        onClose={handleShowEditDesc}
        onChange={handleEditDescriptionInputChange}
        onSubmit={handleSubmitEditDescription}
        data={editDescData}
      />
      <EditJobQualificationsModal
        open={showEditQualifications}
        onClose={handleShowEditQualifications}
        data={qualificationEditData}
        onChange={handleQualificationChange}
        onSubmit = {handleQualificationsEditSubmit}
      />
    </div>
  );
};

export default Unpublished;
