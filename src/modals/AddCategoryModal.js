import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CustomInput from "../components/CustomInput";

const AddCategoryModal = ({ open, onClose, onSubmit, formData, onChange }) => {
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
          direction: "rtl",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <h5>Add Category</h5>
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <form onSubmit={onSubmit}>
            <CustomInput
              label="Category"
              name="name"
              onChange={onChange}
              placeholder="name"
              value={formData.name}
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

export default AddCategoryModal;
