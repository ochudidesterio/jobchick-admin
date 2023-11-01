import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTranslation } from 'react-i18next';


const EditPackageModal = ({ open, onClose, onSubmit, formData, onChange }) => {
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
        sx={{ width: 400, direction:"rtl", p: 2, bgcolor: "background.paper", borderRadius: 2 }}
      >
        <h5>{t("editpackage")}</h5>
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              label={t('name')}
              placeholder={t('packagename')}
              margin="normal"
              name="name"
              size="small"
              value={formData.name}
              onChange={onChange}
              InputLabelProps={{
                style: {
                   transform: "right",
                  left: "unset",
                  right: "1.20rem",
                  fontSize: "Medium",
                  overflow: "unset",
                  backgroundColor: "white", 
                },
              }}

              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#179CBD",
                    fontFamily: "Open Sans",
                    textAlign:"right"
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label={t('price')}
              placeholder={t('packageindollars')}
              margin="normal"
              name="price"
              size="small"
              value={formData.price}
              onChange={onChange}
              InputLabelProps={{
                style: {
                   transform: "right",
                  left: "unset",
                  right: "1.20rem",
                  fontSize: "Medium",
                  overflow: "unset",
                  backgroundColor: "white", 
                },
              }}

              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#179CBD",
                    fontFamily: "Open Sans",
                    textAlign:"right"
                  },
                },
              }}
            />

            <Button
              variant="contained"
              style={{ backgroundColor: "#179CBD" }}
              fullWidth
              type="submit"
            >
              {t('save')}
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default EditPackageModal;
