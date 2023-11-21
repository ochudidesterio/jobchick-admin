import React, { useEffect, useState } from "react";
import "./jobs.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import api from "../../api/api";
import {
  setActiveLikedJobs,
  setActiveUnLikedJobs,
  setIsLikedJob,
} from "../../redux/slices/JobsSlice";
import { setSelectedJob } from "../../redux/slices/JobsSlice";
import { setRoles } from "../../redux/slices/JobsSlice";
import { setQualifications } from "../../redux/slices/JobsSlice";
import JobsTable from "./JobsTable";
import ViewJobModal from "../../modals/ViewJobModal";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getCompany } from "../../redux/slices/CompaniesSlice";
import {
  getLoggedInUser,
  setJobLikeUsers,
  setJobMatchUsers,
  setSelectedUser,
} from "../../redux/slices/UsersSlice";
import JobLikesModal from "../../modals/JobLikesModal";
import ViewProfileModal from "../../modals/ViewProfileModal";
import EditJobRolesModal from "../../modals/EditJobRolesModal";
import EditJobQualificationsModal from "../../modals/EditJobQualificationModal";
import EditJobDescriptionModal from "../../modals/EditJobDescriptionModal";
import { useTranslation } from "react-i18next";

const Jobs = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const mycompany = useSelector(getCompany);
  const loggedUser = useSelector(getLoggedInUser);

  const [editDescData, setEditDescData] = useState({
    id: null,
    description: null,
    title: null,
  });
  const [rolesData, setRolesData] = useState([]);
  const[qualificationData,setQualificationData] = useState([])

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
  const handleSubmitEditDescription = (e) => {
    e.preventDefault();
    console.log("Edit data:::", editDescData);
    handleShowEditDesc();
  };
   // Function to handle changes in roles' descriptions
   const handleRolesChange = (roleId, updatedRole) => {
    // Find the role in the state and update its role property
    const updatedRoles = rolesData.map((r) =>
      r.id === roleId ? { ...r, role: updatedRole.role } : r
    );
    setRolesData(updatedRoles);
  };

  // Function to handle changes in qualification' descriptions
  const handleQualificationChange = (qId, updatedQ) => {
    // Find the qualification in the state and update its qualification property
    const updatedQualifications = qualificationData.map((q) =>
      q.id === qId ? { ...q, qualification: updatedQ.qualification } : q
    );
    setQualificationData(updatedQualifications);
  };
  const handleRolesEditSubmit =(e)=>{
    e.preventDefault()
    console.log("Roles Change: ",rolesData)
  }
  const handleQualificationsEditSubmit =(e)=>{
    e.preventDefault()
    console.log("Qualifications Change: ",qualificationData)
  }

  //create view profile
  const [showViewProfile, setViewProfile] = useState(false);
  const handleShowViewProfile = () => setViewProfile(false);

  //create view job modal
  const [showViewJobs, setViewJobs] = useState(false);
  const handleShowViewJob = () => setViewJobs(false);

  //create likes user
  const [showLikes, setShowLikes] = useState(false);
  const handleShowLikes = () => setShowLikes(false);
  const [jobtitle, setJobTitle] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);

  //job company
  const [company, setCompany] = useState(null);

  //JOBRESPONSE
  let activeLikedJobs;
  let activeUnLikedJobs;

  useEffect(() => {
    getJobs();
  });
  const getJobs = async () => {
    try {
      if (loggedUser && loggedUser.role === "ADMIN") {
        activeLikedJobs = await api.get(
          `/job/company/active/${mycompany.id}/liked`
        );
        activeUnLikedJobs = await api.get(
          `/job/company/active/${mycompany.id}/unliked`
        );
      } else {
        activeLikedJobs = await api.get("/job/all/active/liked");
        activeUnLikedJobs = await api.get("/job/all/active/unliked");
      }
      if (activeLikedJobs.status === 200) {
        dispatch(setActiveLikedJobs(activeLikedJobs.data));
      }
      if (activeUnLikedJobs.status === 200) {
        dispatch(setActiveUnLikedJobs(activeUnLikedJobs.data));
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
      setQualificationData(res.data)
    })
    .catch(err=>console.log("Error fetching qualifications",err))
    
  };
  //show Edit Roles
  const openEditRoles = (id) => {
    api
      .get(`/job/roles/${id}`)
      .then((res) => {
        setShowEditRoles(true);
        setRolesData(res.data);
      })
      .catch((err) => console.log("Error fetching roles", err));
  };

  //show user who liked a job
  const openShowLikes = (jobId, title) => {
    setShowLikes(true);
    setJobTitle(title);
    setSelectedJobId(jobId);
    try {
      //likes
      api
        .get(`/user/company/${mycompany.id}/job/${jobId}/liked`)
        .then((res) => {
          dispatch(setJobLikeUsers(res.data));
        })
        .catch((e) => console.log(e));
      //matches
      api
        .get(`/user/company/${mycompany.id}/job/${jobId}/matched`)
        .then((res) => {
          dispatch(setJobMatchUsers(res.data));
        })
        .catch((e) => console.log(e));
    } catch (e) {}
  };

  const fetchIsLiked = (id) => {
    try {
      if (mycompany.id !== null && selectedJobId !== null) {
        api
          .get(
            `/job/likes/job/${selectedJobId}/company/${mycompany.id}/user/${id}`
          )
          .then((res) => {
            dispatch(setIsLikedJob(res.data));
          })
          .catch((e) => console.log(e));
      }
    } catch (e) {}
  };

  //open user profile
  const openUserProfile = (id) => {
    try {
      api
        .get(`/user/${id}`)
        .then((res) => {
          dispatch(setSelectedUser(res.data));
          setViewProfile(true);
        })
        .catch((e) => console.log(e));
      fetchIsLiked(id);
    } catch (e) {}
  };
  //show view job modal
  const openViewJob = (jobId) => {
    try {
      api
        .get(`/job/${jobId}`)
        .then((res) => {
          if (res.status === 200) {
            dispatch(setSelectedJob(res.data));
            setViewJobs(true);
            setCompany(res.data.company);
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
  return (
    <div dir="rtl" className="jobshome">
      <h3>{t("activejobs")}</h3>
      <JobsTable
        openViewJob={openViewJob}
        openViewLikes={openShowLikes}
      />
      <EditJobRolesModal
        data={rolesData}
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
        data={qualificationData}
        onChange={handleQualificationChange}
        onSubmit = {handleQualificationsEditSubmit}
      />
      <ViewJobModal
        open={showViewJobs}
        onClose={handleShowViewJob}
        company={company}
        openEditDesc={openEditJobDescription}
        openEditRoles={openEditRoles}
        openEditQualification={openEditQualifications}
      />
      <JobLikesModal
        open={showLikes}
        onClose={handleShowLikes}
        title={jobtitle}
        openUserProfile={openUserProfile}
      />
      <ViewProfileModal
        open={showViewProfile}
        onClose={handleShowViewProfile}
        companyId={mycompany.id}
        jobId={selectedJobId}
      />
    </div>
  );
};

export default Jobs;
