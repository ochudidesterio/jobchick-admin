import React ,{useState,useEffect} from 'react'
import CustomAddButton from '../../components/CustomAddButton'
import AddPackageModal from '../../modals/AddPackageModal';
import { ToastContainer } from "react-toastify";
import './packages.css'
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import api from '../../api/api';
import { showErrorToast, showSuccessToast } from '../../Constants/Toasts';
import { setPackages } from '../../redux/slices/PremiumSlice';
import PackageTable from './PackageTable';

const Packages = () => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [premium,setPremium] = useState({
        name:'',
        price:'',
    })

    const handlePremiumInputChange = (e) => {
        const { name, value } = e.target;
        setPremium({ ...premium, [name]: value });
      };

      const handlePremiumFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/premium/create",premium)
            if(response.status === 200){
                showSuccessToast("Created")
                setPremium({
                    name:'',
                    price:''
                })
            }else{
                showErrorToast("An error occured")
            }
        } catch (error) {}
        handleClose();
      };

      const fetchPackages =async ()=>{
        try {
           const response = await api.get("/premium/get/all") 
           dispatch(setPackages(response.data))
        } catch (error) {
            
        }
      }
      useEffect(()=>{
        fetchPackages()
      })

  return (
    <div className='packages-home'>
              <ToastContainer position="top-right" />

        <div className="packages-top">
            <h3>Premium Packages</h3>
            <CustomAddButton name="Add Package" onClick={handleShow} />
        </div>

        <PackageTable />

        <AddPackageModal
        open={showModal}
        onClose={handleClose}
        onChange={handlePremiumInputChange}
        onSubmit={handlePremiumFormSubmit}
        formData={premium}
      />
    </div>
  )
}

export default Packages