import React, { useEffect, useState } from "react";
import "./region.css";
import CustomAddButton from "../../components/CustomAddButton";
import api from "../../api/api";
import { useDispatch } from "react-redux";
import { setRegions } from "../../redux/slices/RegionSlice";
import RegionsTable from "./RegionsTable";
import { ToastContainer } from "react-toastify";
import { showSuccessToast } from "../../Constants/Toasts";
import AddRegionModal from "../../modals/AddRegionModal";
const Regions = () => {
  const dispatch = useDispatch();
  //add category modal
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  //create category data
  const [regionData, setRegionData] = useState({
    name: "",
  });
  const handleRegionInputChange = (e) => {
    const { name, value } = e.target;
    setRegionData({ ...regionData, [name]: value });
  };
  const handleRegionFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/region/create", regionData);
      if (response.status === 200) {
        showSuccessToast("Created");
      }
    } catch (error) {}
    handleClose();
    //window.location.reload()
  };
  useEffect(() => {
    fetchRegions();
  });
  const fetchRegions = async () => {
    try {
      const response = await api.get("/region/all");
      if (response.status === 200) {
        dispatch(setRegions(response.data));
      }
    } catch (error) {}
  };
  return (
    <div className="regions-home">
      <ToastContainer position="top-right" />

      <div className="regions-top">
        <h3>Regions</h3>
        <CustomAddButton onClick={handleShow} name="Add Region" />
      </div>
      <RegionsTable />
      <AddRegionModal
        open={showModal}
        onClose={handleClose}
        onChange={handleRegionInputChange}
        onSubmit={handleRegionFormSubmit}
        formData={regionData}
      />
    </div>
  );
};

export default Regions;
