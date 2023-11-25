import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";

const EditJobDescriptionModal = ({
  open,
  onClose,
  data,
  onSubmit,
  onChange,
}) => {
  const { t } = useTranslation();

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
          width: 700,
          direction: "rtl",
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 5,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <h5>Description for {data.title}</h5>
        <div
          style={{
            maxHeight: 500,
            overflow: "auto",
          }}
        >
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              label={t("description")}
              placeholder={t("name")}
              margin="normal"
              multiline
              name="description"
              size="small"
              value={data.description}
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
                    textAlign: "right",
                  },
                },
              }}
            />

            <Button
              variant="contained"
              style={{ backgroundColor: "#179CBD", marginTop:15 }}
              fullWidth
              type="submit"
            >
              {t("save")}
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default EditJobDescriptionModal;
