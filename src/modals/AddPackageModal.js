import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CustomInput from "../components/CustomInput";

const AddPackageModal = ({ open, onClose, onSubmit, formData, onChange }) => {
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
        sx={{
          width: 400,
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 5,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <h5>Add Package</h5>
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <form onSubmit={onSubmit}>
            <CustomInput
              label="name"
              name="name"
              onChange={onChange}
              placeholder="package name"
              value={formData.name}
            />
            <CustomInput
              label="price"
              name="price"
              onChange={onChange}
              placeholder="price in dollars"
              value={formData.price}
            />
             <CustomInput
              label="link"
              name="link"
              onChange={onChange}
              placeholder="link"
              value={formData.link}
            />

            <Button
              variant="contained"
              style={{ backgroundColor: "#179CBD", marginTop: 15 }}
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

export default AddPackageModal;
