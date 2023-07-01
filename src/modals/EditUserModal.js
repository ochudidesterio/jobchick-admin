import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const EditUserModal = ({ open, onClose,data,onChange,onSubmit}) => {
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
        sx={{ width: 700, p: 2, bgcolor: "background.paper", borderRadius: 2 }}
      >
        <h5>Edit User Details</h5>
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
            <form onSubmit={onSubmit}>
              <div className="form-row">
                <div className="form-row-left">
                  <TextField
                    fullWidth
                    label="Firt Name"
                    placeholder="first name"
                    margin="normal"
                    name="firstName"
                    size="small"
                    value={data.firstName}
                    onChange={onChange}
                  />
                </div>
                <div className="form-row-right">
                  <TextField
                    fullWidth
                    label="Last Name"
                    placeholder="last name"
                    margin="normal"
                    size="small"
                    name="lastName"
                    value={data.lastName}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-row-left">
                <TextField
                    fullWidth
                    label="Email"
                    placeholder="email"
                    margin="normal"
                    size="small"
                    name="email"
                    value={data.email}
                    onChange={onChange}
                  />
                </div>
                <div className="form-row-right">
                <TextField
                    fullWidth
                    label="Phone Number"
                    placeholder="phone number"
                    margin="normal"
                    size="small"
                    name="phoneNumber"
                    value={data.phoneNumber}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-row-left">
                <TextField
                    fullWidth
                    label="Username"
                    placeholder="username"
                    margin="normal"
                    size="small"
                    name="authUsername"
                    value={data.authUsername}
                    onChange={onChange}
                  />
                </div>
                <div className="form-row-right">
                <TextField
                    fullWidth
                    label="Age"
                    placeholder="age"
                    margin="normal"
                    size="small"
                    name="age"
                    value={data.age}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-row-left">
                <TextField
                    fullWidth
                    label="Gender"
                    placeholder="gender"
                    margin="normal"
                    size="small"
                    name="gender"
                    value={data.gender}
                    onChange={onChange}
                  />
                </div>
                <div className="form-row-right">
                <TextField
                    fullWidth
                    label="Proffession"
                    placeholder="proffession"
                    margin="normal"
                    size="small"
                    name="proffession"
                    value={data.proffession}
                    onChange={onChange}
                  />
                </div>
              </div>
              
             
              

              <Button
                variant="contained"
                style={{ backgroundColor: "#179CBD" }}
                fullWidth
                type="submit"
              >
                Update
              </Button>
            </form>
          
        </div>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
