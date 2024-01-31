import React, { useEffect, useState } from "react";
import "./region.css";
import CustomAddButton from "../../components/CustomAddButton";
import api from "../../api/api";
import { useDispatch } from "react-redux";
import { setRegions } from "../../redux/slices/RegionSlice";
import RegionsTable from "./RegionsTable";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../../Constants/Toasts";
import AddRegionModal from "../../modals/AddRegionModal";
import EditRegionModal from "../../modals/EditRegionModal";
import { useTranslation } from 'react-i18next';

const Regions = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  //add category modal
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  //show edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEdit = () => setShowEditModal(false);
   //update  data
   const [updateData, setUpdateData] = useState({
    name: "",
    id:""
  });
  //create category data
  const [regionData, setRegionData] = useState({
    name: "",
  });
  const handleEditRegionInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };
  const handleRegionInputChange = (e) => {
    const { name, value } = e.target;
    setRegionData({ ...regionData, [name]: value });
  };
  const handleEditRegionFormSubmit = async (e) => {
    e.preventDefault();
    try {
       const response = await api.post(`/region/update/${updateData.id}/${updateData.name}`);
      if (response.status === 200) {
        showSuccessToast(t('updated'));
      }else{
        showErrorToast(t('failed'))
      }
    } catch (error) {}
    handleCloseEdit();
    //window.location.reload()
  };
  const handleRegionFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/region/create", regionData);
      if (response.status === 200) {
        showSuccessToast(t('created'));
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

  const editRegion =(id)=>{
    api.get(`/region/get/${id}`)
    .then((res)=>{
      if(res.status === 200){
        setUpdateData({
          id:res.data.id,
          name:res.data.name,
        })
        setShowEditModal(true)
      }
    })
    .catch((e)=>console.log(e))
  }
  const deleteRegion = (id)=>{
    if(id !==0){
      api.delete(`/region/delete/${id}`)
      .then((res)=>{
        showSuccessToast(res.data)
        fetchRegions()
      })
      .catch(e=>showErrorToast("failed"))
    }else{
      showErrorToast("Cannot delete a default region")
    }
  }
  return (
    <div dir="rtl" className="regions-home">
      <ToastContainer position="top-right" />

      <div className="regions-top">
        <h3>{t('regions')}</h3>
        <CustomAddButton onClick={handleShow} name={t('addregion')} />
      </div>
      <RegionsTable editRegion={editRegion} deleteRegion={deleteRegion}/>
      <AddRegionModal
        open={showModal}
        onClose={handleClose}
        onChange={handleRegionInputChange}
        onSubmit={handleRegionFormSubmit}
        formData={regionData}
      />
      <EditRegionModal 
      open={showEditModal}
      onClose={handleCloseEdit}
      onChange={handleEditRegionInputChange}
      onSubmit={handleEditRegionFormSubmit}
      formData={updateData}
       />
    </div>
  );
};

export default Regions;
