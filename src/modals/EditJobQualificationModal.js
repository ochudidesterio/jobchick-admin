import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EditJobQualificationsModal = ({
  open,
  onClose,
  data,
  onChange,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const handleQualificationChange = (qId, qualification) => {
    // Call the parent component's onChange function
    onChange(qId, qualification);
  };
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
        sx={{ width: 700, direction:"rtl", p: 2, bgcolor: "background.paper", borderRadius: 2 }}
      >
        <h5>Edit Job Qualifications</h5>
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <form onSubmit={onSubmit}>
            {data.map((qualification) => (
              <TextField
                key={qualification.id}
                fullWidth
                label="Qualification"
                placeholder="Qualification"
                margin="normal"
                multiline
                name="qualification"
                size="small"
                value={qualification.qualification}
                onChange={(e) =>
                  handleQualificationChange(qualification.id, {
                    ...qualification,
                    qualification: e.target.value,
                  })
                }
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
            ))}
            <Button
              variant="contained"
              style={{ backgroundColor: "#179CBD" }}
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

export default EditJobQualificationsModal;
