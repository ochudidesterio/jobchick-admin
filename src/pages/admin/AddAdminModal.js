import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CustomInput from "../../components/CustomInput";

const AddAdminModal = ({
  title,
  open,
  onClose,
  onSubmit,
  formData,
  onChange,
}) => {
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
          p: 2,
          direction: "rtl",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <h5>{title}</h5>
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <form onSubmit={onSubmit}>
            <CustomInput
              label="Username"
              name="authUsername"
              onChange={onChange}
              placeholder="Username"
              value={formData.authUsername}
            />
            <CustomInput
              label="Email"
              name="email"
              onChange={onChange}
              placeholder="Enter email"
              value={formData.email}
            />

            <CustomInput
              label="Password"
              name="password"
              onChange={onChange}
              placeholder="Enter password"
              value={formData.password}
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

export default AddAdminModal;
