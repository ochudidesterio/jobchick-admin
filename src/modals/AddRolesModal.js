import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const AddRolesModal = ({ open, onClose, onSubmit, roleData, onChange,title }) => {
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
        <h5>Add Roles to {title}</h5>
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <form onSubmit={onSubmit}>
            <TextareaAutosize
              placeholder="Enter Role"
              minRows={2}
              maxRows={5}
              name="role"
              value={roleData.role}
              onChange={onChange}
              style={{
                padding: "10px",
                marginTop: "10px",
                width: "96.5%",
                border: "1px solid grey",
                fontFamily: "Open Sans",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }} >
            <Button
              variant="contained"
              style={{ backgroundColor: "#179CBD"}}
              type="submit"
            >
              Save
            </Button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default AddRolesModal;
