import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./viewjobmodal.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  getQualifications,
  getRoles,
  getSelectedJob,
} from "../redux/slices/JobsSlice";
import RolesList from "../components/RolesList";
import QualificationList from "../components/QualificationList";
import ViewJobTable from "../components/ViewJobTable";
import api from "../api/api";
const ViewJobModal = ({ open, onClose }) => {
  const job = useSelector(getSelectedJob);
  console.log("Jobs",job)
  const roles = useSelector(getRoles);
  const qualifications = useSelector(getQualifications);

  const handlePublish = async (id) => {
    try {
      const response = await api.post(`/job/publish/${id}`);
      if(response.status === 200){
        window.location.reload()
}
    } catch (error) {}
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        // alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <Box
        sx={{
          width: "80%",
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
          maxHeight: "80vh", // Set a maximum height for the modal
          overflow: "auto", // Enable scrolling when content exceeds the height
        }}
      >
        <div className="view-job-image">
          <div className="view-img-container"></div>
        </div>
        <div className="view-job-title">
          <h4>{job.company.name !== null ? job.company.name :""}</h4>
        </div>
        <div className="view-job-desc">
          <ViewJobTable job={job} />
          <div className="description-view">
            <h4>Description</h4>
            <p>{job.description}</p>
          </div>
          <div className="view-roles">
            <RolesList roles={roles} />
          </div>
          <div className="view-qualifications">
            <QualificationList qualifications={qualifications} />
          </div>
          {job.status === "INACTIVE" && <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#179CBD", textTransform: "none" }}
              onClick={() => {
                handlePublish(job.id)
              }}
            >
              Publish
            </Button>
          </div>}
        </div>
      </Box>
    </Modal>
  );
};

export default ViewJobModal;
