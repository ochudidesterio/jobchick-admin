import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const EditJobModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{ width: 700, p: 2, bgcolor: "background.paper", borderRadius: 2 }}
      >
        <h5>Edit Job</h5>
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          
        </div>
      </Box>
    </Modal>
  );
};

export default EditJobModal;
