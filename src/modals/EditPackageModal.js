import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const EditPackageModal = ({ open, onClose, onSubmit, formData, onChange }) => {
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
        sx={{ width: 400, p: 2, bgcolor: "background.paper", borderRadius: 2 }}
      >
        <h5>Add Package</h5>
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              label="name"
              placeholder="package name"
              margin="normal"
              name="name"
              size="small"
              value={formData.name}
              onChange={onChange}
            />

            <TextField
              fullWidth
              label="price"
              placeholder="price in dollars"
              margin="normal"
              name="price"
              size="small"
              value={formData.price}
              onChange={onChange}
            />

            <Button
              variant="contained"
              style={{ backgroundColor: "#179CBD" }}
              fullWidth
              type="submit"
            >
              Save
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default EditPackageModal;
