import React from 'react'
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const AddAdminModal = ({title,open,onClose,onSubmit,formData,onChange}) => {
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
        <Box sx={{ width: 400, p: 2, direction:"rtl", bgcolor: "background.paper", borderRadius:2
 }}>
          <h5>{title}</h5>
          <div style={{
            maxHeight: 300,
            overflow: "auto",

          }}>
          <form onSubmit={onSubmit}>
          
            <TextField
              fullWidth
              label="Username"
              placeholder="Username"
              margin="normal"
              name="authUsername"
              size='small'
              value={formData.authUsername}
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
              label="Email"
              size='small'
              placeholder="Enter Email"
              margin="normal"
              name="email"
              value={formData.email}
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
              label="Password"
              size='small'
              placeholder="Enter password"
              margin="normal"
              name="password"
              value={formData.password}
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
            
            
            <Button variant="contained" style={{backgroundColor:"#179CBD"}} fullWidth type="submit">
              Save 
            </Button>
          </form>
          </div>
        </Box>
      </Modal>
  )
}

export default AddAdminModal