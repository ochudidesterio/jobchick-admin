import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { getCategories } from "../redux/slices/CategorySlice";
import { getTypes } from "../redux/slices/TypesSlice";
import { getRegions } from "../redux/slices/RegionSlice";
import { Loader } from "@googlemaps/js-api-loader";

import Map from "../components/Map";


const CreateJobModal = ({ open, onClose, onSubmit, jobData, onChange,upDateJobData }) => {
  const categories = useSelector(getCategories);
  const types = useSelector(getTypes);
  const regions = useSelector(getRegions);

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Create a new instance of the Google Maps API Loader
    const loader = new Loader({
      apiKey: "AIzaSyAGetXjZiaiI3omBPzwey2e-CX8k_GtVjc", // Replace with your Google Maps API key
      version: "weekly",
      libraries: ["places"], // You can add more libraries if needed
    });

    // Load the Google Maps API
    loader.load().then(() => {
      setMapLoaded(true);
    });
  }, []);

  // Function to handle long-press on the map
  // CreateJobModal.js or your parent component
  const handleMarkerDragEnd = (newLat, newLng) => {
    // Handle the updated marker position here
    console.log("Marker dragged to:", newLat, newLng);
 
    upDateJobData(newLat,newLng)

    // You can update the state or perform other actions as needed
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
        sx={{ width: 700, p: 2,direction:"rtl", bgcolor: "background.paper", borderRadius: 2 }}
      >
        <h5>Create Job</h5>
        <div
          style={{
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {
            <form dir="rtl" onSubmit={onSubmit}>
              <div dir="rtl" className="form-row">
                <div dir="rtl" className="form-row-left">
                  <TextField
                    fullWidth
                    label="Title"
                    placeholder="Software Engineer"
                    margin="normal"
                    name="title"
                    size="small"
                    value={jobData.title}
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
                </div>
                <div dir="rtl" className="form-row-right">
                  <TextField
                    fullWidth
                    label="Level"
                    placeholder="Senior/Junior/Experienced/Beginner"
                    margin="normal"
                    size="small"
                    name="level"
                    value={jobData.level}
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
                </div>
              </div>
              <div className="form-row">
                <div className="form-row-left">
                  <TextField
                    fullWidth
                    select
                    label="Region"
                    placeholder="Select Region"
                    margin="normal"
                    size="small"
                    name="regionId"
                    value={jobData.regionId}
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
                  >
                    {regions.map((region) => (
                      <MenuItem key={region.id} value={region.id}>
                        {region.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div dir="rtl" className="form-row-right">
                  <TextField
                    fullWidth
                    label="Type"
                    select
                    placeholder="Select Type"
                    margin="normal"
                    name="typeId"
                    size="small"
                    value={jobData.typeId}
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
                  >
                    {types.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </TextField>
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
                  fontFamily: "Open Sans",
                }}
              />
              <div style={{ height: "300px", width: "100%" }}>
                {mapLoaded && (
                  <Map
                  
                    lat={jobData.latitude}
                    lng={jobData.longitude}
                    onMarkerDragEnd={handleMarkerDragEnd}
                  />
                )}
              </div>

              <Button
                variant="contained"
                style={{ backgroundColor: "#179CBD",marginTop:"10px",marginBottom:"30px" }}
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
