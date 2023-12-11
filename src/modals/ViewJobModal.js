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
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";

const ViewJobModal = ({
  open,
  onClose,
  company,
  openEditDesc,
  openEditRoles,
  openEditQualification,
}) => {
  const { t } = useTranslation();
  const job = useSelector(getSelectedJob);
  const roles = useSelector(getRoles);
  const qualifications = useSelector(getQualifications);

  const handlePublish = async (id) => {
    try {
      const response = await api.post(`/job/publish/${id}`);
      if (response.status === 200) {
        window.location.reload();
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
          width: "75vw",
          p: 2,
          direction: "rtl",
          bgcolor: "background.paper",
          borderRadius: 2,
          height: "100%",
          maxHeight: "90vh", // Set a maximum height for the modal
          overflow: "auto", // Enable scrolling when content exceeds the height
        }}
      >
        <div className="view-job-image">
          <div className="view-img-container"></div>
        </div>
        <div className="view-job-title">
          <h4>{company !== null ? company.name : ""}</h4>
        </div>
        <div className="view-job-desc">
          <ViewJobTable job={job} />
          <div className="description-view">
            <div className="edit-header">
              <h4>{t("description")}</h4>
              {(
                <EditOutlined
                  onClick={() => {
                    openEditDesc(job.id);
                  }}
                  className="edit-icon"
                />
              )}
            </div>
            <p dir="rtl">{job.description}</p>
          </div>
          <div className="view-roles">
            <RolesList job={job} openEditRoles={openEditRoles} roles={roles} />
          </div>
          <div className="view-qualifications">
            <QualificationList
              job={job}
              openEditQualifications={openEditQualification}
              qualifications={qualifications}
            />
          </div>
          {job.status === "INACTIVE" &&
             (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#179CBD", textTransform: "none" }}
                  onClick={() => {
                    handlePublish(job.id);
                  }}
                >
                  Publish
                </Button>
              </div>
            )}
        </div>
      </Box>
    </Modal>
  );
};

export default ViewJobModal;
