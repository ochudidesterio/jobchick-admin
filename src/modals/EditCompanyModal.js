import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CustomInput from "../components/CustomInput";

const EditCompanyModal = ({ open, onClose,title, onSubmit, formData, onChange }) => {
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
          direction: "rtl",
          paddingRight: 5,
          paddingLeft: 5,
          paddingBottom:3,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <h5>{title}</h5>
        <div
          style={{
            maxHeight: 500,
            overflow: "auto",
          }}
        >
          <form onSubmit={onSubmit}>
            <CustomInput
            label="Name"
            name="name"
            onChange={onChange}
            placeholder="name"
            value={formData.name}
             />
             <CustomInput 
             label="Email"
             name="email"
             onChange={onChange}
             placeholder="email"
             value={formData.email}
             />
             <CustomInput 
             label="Contact"
             name="contact"
             onChange={onChange}
             placeholder="contact"
             value={formData.contact}
             />
             <CustomInput 
             label="Location"
             name="location"
             onChange={onChange}
             placeholder="location"
             value={formData.location}
             />

            <Button
              variant="contained"
              style={{ backgroundColor: "#179CBD",marginTop:15 }}
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

export default EditCompanyModal;
