import React from 'react'
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const EditCategoryModal = ({open,onClose,onSubmit,formData,onChange}) => {
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
        <Box sx={{ width: 400, p: 2, bgcolor: "background.paper", borderRadius:2
 }}>
          <h5>Edit Category</h5>
          <div style={{
            maxHeight: 300,
            overflow: "auto",

          }}>
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              label="Category"
              placeholder="name"
              margin="normal"
              name="name"
              size='small'
              value={formData.name}
              onChange={onChange}
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

export default EditCategoryModal