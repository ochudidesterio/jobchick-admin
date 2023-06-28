import React,{useEffect,useState} from 'react'
import './jobtype.css'
import CustomAddButton from '../../components/CustomAddButton'
import { useDispatch } from 'react-redux'
import api from '../../api/api'
import { setTypes } from '../../redux/slices/TypesSlice'
import JobTypeTable from './JobTypeTable'
import { ToastContainer } from "react-toastify";

import { showSuccessToast } from '../../Constants/Toasts'
import AddJobTypeModal from '../../modals/AddJobTypeModal'

const JobTypes = () => {
    const dispatch = useDispatch()
    //add category modal
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  //create category data
  const [jobTypeData, setJobTypeData] = useState({
    name: "",
  });
  const handleJobTypeInputChange = (e) => {
    const { name, value } = e.target;
    setJobTypeData({ ...jobTypeData, [name]: value });
  };
  const handleJobTypeFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/type/create", jobTypeData);
      if (response.status === 200) {
        showSuccessToast("Created");
      }
    } catch (error) {}
    handleClose();
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
  return (
    <div className='jobtype-home'>
            <ToastContainer position="top-right" />

        <div className="jobtype-top">
            <h3>Job Types</h3>
            <CustomAddButton onClick={handleShow} name="Add Type" />
        </div>
        <JobTypeTable/>
        <AddJobTypeModal
        open={showModal}
        onClose={handleClose}
        formData={jobTypeData}
        onChange={handleJobTypeInputChange}
        onSubmit={handleJobTypeFormSubmit}
         />
    </div>
  )
}

export default JobTypes