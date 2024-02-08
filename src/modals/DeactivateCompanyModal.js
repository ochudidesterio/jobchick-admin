import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const DeactivateCompanyModal = ({ open, onClose, onSubmit }) => {
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
          width: 450,
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 5,
          direction: "rtl",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <h5 style={{color:'#b22222'}}>Deactivate a company</h5>
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <form onSubmit={onSubmit}>
            <div>
                <p>Deactivating this company will make all its jobs invisible to users. You return visibility by activating the company</p>
            <p>Are you sure you want to deactivate this company?</p>

            </div>
            <Button
              variant="contained"
              style={{ backgroundColor: "#b22222", marginTop: 15 }}
              fullWidth
              type="submit"
            >
              Deactivate
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default DeactivateCompanyModal;
