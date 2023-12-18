import React,{useEffect,useState} from 'react'
import './jobtype.css'
import CustomAddButton from '../../components/CustomAddButton'
import { useDispatch } from 'react-redux'
import api from '../../api/api'
import { setTypes } from '../../redux/slices/TypesSlice'
import JobTypeTable from './JobTypeTable'
import { ToastContainer } from "react-toastify";

import { showErrorToast, showSuccessToast } from '../../Constants/Toasts'
import AddJobTypeModal from '../../modals/AddJobTypeModal'
import EditTypeModal from '../../modals/EditTypesModal'
import { useTranslation } from 'react-i18next';


const JobTypes = () => {
  const {t} = useTranslation()
    const dispatch = useDispatch()
    //add category modal
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

   //add category modal
   const [showEditModal, setShowEditModal] = useState(false);
   const handleEditClose = () => setShowEditModal(false);
  //create category data
  const [jobTypeData, setJobTypeData] = useState({
    name: "",
  });

   //update  data
   const [updateData, setUpdateData] = useState({
    name: "",
    id:""
  });

  const handleEditTypeInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };
  const handleJobTypeInputChange = (e) => {
    const { name, value } = e.target;
    setJobTypeData({ ...jobTypeData, [name]: value });
  };
  const handleJobTypeFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("JobType",jobTypeData)
      const response = await api.post("/type/create", jobTypeData);
      if (response.status === 200) {
        showSuccessToast(t('created'));
      }
    } catch (error) {}
    handleClose();
    //window.location.reload()
  };

  const handleEditTypeFormSubmit = async (e) => {
    e.preventDefault();
    try {
       const response = await api.post(`/type/update/${updateData.id}/${updateData.name}`);
      console.log("Edit",updateData)
      if (response.status === 200) {
        showSuccessToast(t('updated'));
      }else{
        showErrorToast(t('failed'))
      }
    } catch (error) {}
    handleEditClose();
    //window.location.reload()
  };
    useEffect(()=>{fetchTypes()})
    const fetchTypes = async ()=>{
        try {
          const response = await api.get("/type/all") 
          if(response.status === 200){
            dispatch(setTypes(response.data))
          } 
        } catch (error) {
            
        }
    }
    const editType =(id)=>{
      api.get(`/type/get/${id}`)
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
    const deleteType = (id)=>{
      if(id !== 0){
        api.delete(`/type/delete/${id}`)
        .then((res)=>{showSuccessToast(res.data)})
        .catch((e)=>showErrorToast("failed"))
      }else{
        showErrorToast("Cannot delete a default type")
      }
    }
  return (
    <div dir='rtl' className='jobtype-home'>
            <ToastContainer position="top-right" />

        <div className="jobtype-top">
            <h3>{t('jobtypes')}</h3>
            <CustomAddButton onClick={handleShow} name={t('addtype')} />
        </div>
        <JobTypeTable editType={editType} deleteType={deleteType}/>
        <AddJobTypeModal
        open={showModal}
        onClose={handleClose}
        formData={jobTypeData}
        onChange={handleJobTypeInputChange}
        onSubmit={handleJobTypeFormSubmit}
         />
         <EditTypeModal
         open={showEditModal}
         onClose={handleEditClose}
         onChange={handleEditTypeInputChange}
         onSubmit={handleEditTypeFormSubmit}
         formData={updateData}
          />
    </div>
  )
}

export default JobTypes