import React, { useEffect, useState } from "react";
import "./jobs.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import api from "../../api/api";
import { setActiveJobs, setIsLikedJob } from "../../redux/slices/JobsSlice";
import { setSelectedJob } from "../../redux/slices/JobsSlice";
import { setRoles } from "../../redux/slices/JobsSlice";
import { setQualifications } from "../../redux/slices/JobsSlice";
import JobsTable from "./JobsTable";
import ViewJobModal from "../../modals/ViewJobModal";
import EditJobModal from "../../modals/EditJobModal";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getCompany } from "../../redux/slices/CompaniesSlice";
import {
  getLoggedInUser,
  setJobLikeUsers,
  setSelectedUser,
} from "../../redux/slices/UsersSlice";
import JobLikesModal from "../../modals/JobLikesModal";
import ViewProfileModal from "../../modals/ViewProfileModal";
const Jobs = () => {
  const dispatch = useDispatch();
  const mycompany = useSelector(getCompany);
  const loggedUser = useSelector(getLoggedInUser);

  //create view profile
  const [showViewProfile, setViewProfile] = useState(false);
  const handleShowViewProfile = () => setViewProfile(false);

  //create view job modal
  const [showViewJobs, setViewJobs] = useState(false);
  const handleShowViewJob = () => setViewJobs(false);
  //create edit job modal
  const [showEditJob, setShowEditJob] = useState(false);
  const handleShowEditJob = () => setShowEditJob(false);

  //create likes user
  const [showLikes, setShowLikes] = useState(false);
  const handleShowLikes = () => setShowLikes(false);
  const [jobtitle, setJobTitle] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);

  //job company
  const [company, setCompany] = useState(null);

  //JOBRESPONSE
  let jobres;

  useEffect(() => {
    getJobs();
  });
  const getJobs = async () => {
    try {
      if (loggedUser && loggedUser.role === "ADMIN") {
        jobres = await api.get(`/job/company/active/${mycompany.id}`);
      } else {
        jobres = await api.get("/job/all/active");
      }
      if (jobres.status === 200) {
        dispatch(setActiveJobs(jobres.data));
      }
    } catch (error) {}
  };

  //showEdit job
  const openEditJob = (jobId) => {
    setShowEditJob(true);
  };

  //show user who liked a job
  const openShowLikes = (jobId, title) => {
    setShowLikes(true);
    setJobTitle(title);
    setSelectedJobId(jobId)
    try {
      api
        .get(`/user/company/${mycompany.id}/job/${jobId}`)
        .then((res) => {
          dispatch(setJobLikeUsers(res.data));
        })
        .catch((e) => console.log(e));
    } catch (e) {}
  };
  
  const fetchIsLiked = (id)=>{
    try{
     if(mycompany.id !== null && selectedJobId !== null){
      api.get(`/job/likes/job/${selectedJobId}/company/${mycompany.id}/user/${id}`)
      .then((res)=>{
        dispatch(setIsLikedJob(res.data))
      }).catch((e)=>console.log(e))
     }
    }catch(e){}
  }

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
        fetchIsLiked(id)

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
    <div className="jobshome">
      <h3>Active Jobs</h3>
      <JobsTable
        openViewJob={openViewJob}
        openEditJob={openEditJob}
        openViewLikes={openShowLikes}
      />
      <ViewJobModal
        open={showViewJobs}
        onClose={handleShowViewJob}
        company={company}
      />
      <EditJobModal open={showEditJob} onClose={handleShowEditJob} />
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
