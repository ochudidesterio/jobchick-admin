import React  from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { getCategories } from "../redux/slices/CategorySlice";

const CreateJobModal = ({ open, onClose, onSubmit, jobData, onChange }) => {
 const categories = useSelector(getCategories)

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
        <h5>Create Job</h5>
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          {
            <form onSubmit={onSubmit}>
              <div className="form-row">
                <div className="form-row-left">
                  <TextField
                    fullWidth
                    label="Title"
                    placeholder="Software Engineer"
                    margin="normal"
                    name="title"
                    size="small"
                    value={jobData.title}
                    onChange={onChange}
                  />
                </div>
                <div className="form-row-right">
                  <TextField
                    fullWidth
                    label="Type"
                    placeholder="Contract/Full time/part time etc"
                    margin="normal"
                    name="type"
                    size="small"
                    value={jobData.type}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-row-left">
                  <TextField
                    fullWidth
                    label="Region"
                    placeholder="Israel/USA/Europe"
                    margin="normal"
                    size="small"
                    name="region"
                    value={jobData.region}
                    onChange={onChange}
                  />
                </div>
                <div className="form-row-right">
                  <TextField
                    fullWidth
                    label="Level"
                    placeholder="Senior/Junior/Experienced/Beginner"
                    margin="normal"
                    size="small"
                    name="level"
                    value={jobData.level}
                    onChange={onChange}
                  />
                </div>
              </div>
              <TextField
                    fullWidth
                    label="Salary"
                    placeholder="$10k - $30k"
                    margin="normal"
                    size="small"
                    name="salary"
                    value={jobData.salary}
                    onChange={onChange}
                  />
              {/* Render categories */}
              <TextField
                fullWidth
                select
                label="Category"
                placeholder="Select category"
                margin="normal"
                size="small"
                name="categoryId"
                value={jobData.categoryId}
                onChange={onChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextareaAutosize
                placeholder="Enter Job Description"
                minRows={3}
                maxRows={8}
                name="description"
                value={jobData.description}
                onChange={onChange}
                style={{
                  padding: "10px",
                  marginTop: "10px",
                  width: "96.5%",
                  border: "1px solid grey",
                  fontFamily:"Open Sans"
                }}
              />

              <Button
                variant="contained"
                style={{ backgroundColor: "#179CBD" }}
                fullWidth
                type="submit"
              >
                Save
              </Button>
            </form>
          }
        </div>
      </Box>
    </Modal>
  );
};

export default CreateJobModal;
