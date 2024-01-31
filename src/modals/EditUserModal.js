import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CustomInput from "../components/CustomInput";
import { useTranslation } from "react-i18next";

const EditUserModal = ({ open, onClose, data, onChange, onSubmit }) => {
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
          p: 2,
          direction: "rtl",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <h5>Edit User Details</h5>
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <form dir="rtl" onSubmit={onSubmit}>
            <div className="form-row">
              <div dir="rtl" className="form-row-left">
                <CustomInput
                  label={t("firstname")}
                  name="firstName"
                  onChange={onChange}
                  placeholder={t("firstname")}
                  value={data.firstName}
                />
              </div>
              <div className="form-row-right">
                <CustomInput
                  label={t("lastname")}
                  name="lastName"
                  onChange={onChange}
                  placeholder={t("lastname")}
                  value={data.lastName}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-row-left">
                <CustomInput
                  label={t("gender")}
                  name="gender"
                  onChange={onChange}
                  placeholder={t("gender")}
                  value={data.gender}
                />
              </div>
              <div className="form-row-right">
                <CustomInput
                  label={t("phonenumber")}
                  name="phoneNumber"
                  onChange={onChange}
                  placeholder={t("phonenumber")}
                  value={data.phoneNumber}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-row-left">
                <CustomInput
                  label={t("username")}
                  name="authUsername"
                  onChange={onChange}
                  placeholder={t("username")}
                  value={data.authUsername}
                />
              </div>
              <div className="form-row-right">
                <CustomInput
                  label={t("age")}
                  name="age"
                  onChange={onChange}
                  placeholder={t("age")}
                  value={data.age}
                />
              </div>
            </div>

            

            <Button
              variant="contained"
              style={{ backgroundColor: "#179CBD" }}
              fullWidth
              type="submit"
            >
              {t("update")}
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
