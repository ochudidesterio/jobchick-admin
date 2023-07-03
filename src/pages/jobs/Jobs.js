import React, { useEffect, useState } from "react";
import "./jobs.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import api from "../../api/api";
import { setActiveJobs } from "../../redux/slices/JobsSlice";
import { setSelectedJob } from "../../redux/slices/JobsSlice";
import { setRoles } from "../../redux/slices/JobsSlice";
import { setQualifications } from "../../redux/slices/JobsSlice";
import JobsTable from "./JobsTable";
import ViewJobModal from "../../modals/ViewJobModal";
import EditJobModal from "../../modals/EditJobModal";
const Jobs = () => {
  const dispatch = useDispatch();

  //create view job modal
  const [showViewJobs, setViewJobs] = useState(false);
  const handleShowViewJob = () => setViewJobs(false);
  //create edit job modal
  const [showEditJob, setShowEditJob] = useState(false);
  const handleShowEditJob = () => setShowEditJob(false);

  useEffect(() => {
    getJobs();
  });
  const getJobs = async () => {
    try {
      const response = await api.get("/job/all/active");
      console.log("jobsRes",response.data)
      if (response.status === 200) {
        dispatch(setActiveJobs(response.data));
        setViewJobs(false)
      }
    } catch (error) {}
  };

  //showEdit job
  const openEditJob = (jobId) => {
    setShowEditJob(true);
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
      <JobsTable openViewJob={openViewJob} openEditJob={openEditJob} />
      <ViewJobModal open={showViewJobs} onClose={handleShowViewJob} />
      <EditJobModal open={showEditJob} onClose={handleShowEditJob} />
    </div>
  );
};

export default Jobs;
