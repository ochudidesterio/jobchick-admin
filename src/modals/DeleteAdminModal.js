import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

const DeleteAdminModal = ({ open, onClose, onSubmit }) => {
    const {t} = useTranslation()
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
        <h5 style={{color:'#b22222'}}>{t('deleteadmin')}!!</h5>
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <form onSubmit={onSubmit}>
            <div>
            <p>{t('deleteadminwarning')}</p>

            </div>
            <Button
              variant="contained"
              style={{ backgroundColor: "#b22222", marginTop: 15 }}
              fullWidth
              type="submit"
            >
              {t('delete')}
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteAdminModal;
