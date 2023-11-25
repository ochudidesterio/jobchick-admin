import React from 'react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";

const EditJobRolesModal = ({open,onClose,onSubmit,onChange,data }) => {
  const { t } = useTranslation();
  const handleRoleChange = (roleId, role) => {
    // Call the parent component's onChange function
    onChange(roleId, role);
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
        sx={{ width: 700,direction:"rtl", paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5, bgcolor: "background.paper", borderRadius: 2 }}
      >
        <h5>Edit Job Roles</h5>
        <div
          style={{
            maxHeight: 400,
            overflow: "auto",
          }}
        >
          <form onSubmit={onSubmit}>
            {data.map((role) => (
              <TextField
                key={role.id}
                fullWidth
                label="role"
                placeholder="role"
                margin="normal"
                multiline
                name="role"
                size="small"
                value={role.role}
                onChange={(e) => handleRoleChange(role.id, { ...role, role: e.target.value })}
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
  )
}

export default EditJobRolesModal

