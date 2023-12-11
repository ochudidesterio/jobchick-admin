import React ,{useState,useEffect} from 'react'
//import CustomAddButton from '../../components/CustomAddButton'
import AddPackageModal from '../../modals/AddPackageModal';
import EditPackageModal from '../../modals/EditPackageModal';
import { ToastContainer } from "react-toastify";
import './packages.css'
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import api from '../../api/api';
import { showErrorToast, showSuccessToast } from '../../Constants/Toasts';
import { setPackages } from '../../redux/slices/PremiumSlice';
import PackageTable from './PackageTable';
import { useTranslation } from 'react-i18next';

const Packages = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
   // const handleShow = () => setShowModal(true);

    //show edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEdit = () => setShowEditModal(false);

    const [premium,setPremium] = useState({
        name:'',
        price:'',
        link:'',
    })

     //update  data
   const [updateData, setUpdateData] = useState({
    name: "",
    price:"",
    link:"",
    id:""
  });

    const handlePremiumInputChange = (e) => {
        const { name, value } = e.target;
        setPremium({ ...premium, [name]: value });
      };
      const handleEditPremiumInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData({ ...updateData, [name]: value });
      };
      const handleEditPremiumFormSubmit = async (e) => {
        e.preventDefault();
        console.log("UpdateData",updateData)
        try {
           const response = await api.post(`/premium/update`,updateData);
          console.log("Edit",updateData)
          if (response.status === 200) {
            showSuccessToast(t('updated'));
          }else{
            showErrorToast(t('failed'))
          }
        } catch (error) {}
        handleCloseEdit();
        //window.location.reload()
      };

      const handlePremiumFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/premium/create",premium)
            if(response.status === 200){
                showSuccessToast(t('created'))
                setPremium({
                    name:'',
                    price:'',
                    link:''
                })
            }else{
                showErrorToast(t('anerroroccurred'))
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

      const editPackage =(id)=>{
        api.get(`/premium/get/${id}`)
        .then((res)=>{
          if(res.status === 200){
            setUpdateData({
              id:res.data.id,
              name:res.data.name,
              price:res.data.price,
              link:res.data.link
            })
            setShowEditModal(true)
          }
        })
        .catch((e)=>console.log(e))
      }
      const viewPackage = (id)=>{
        api.get(`/premium/get/${id}`)
        .then((res)=>{
          if (res.status === 200) {
            // Open the link in a new browser window or tab
            window.open(res.data.link, '_blank');
          }
        })
        .catch(e=>console.log(e))
      }

  return (
    <div dir='rtl' className='packages-home'>
              <ToastContainer position="top-right" />

        <div className="packages-top">
            <h3>{t('premiumpackage')}</h3>
            {/* <CustomAddButton name="Add Package" onClick={handleShow} /> */}
        </div>

        <PackageTable editPackage={editPackage} viewPackage={viewPackage}/>

        <AddPackageModal
        open={showModal}
        onClose={handleClose}
        onChange={handlePremiumInputChange}
        onSubmit={handlePremiumFormSubmit}
        formData={premium}
      />

      <EditPackageModal
      open={showEditModal}
      onClose={handleCloseEdit}
      onChange={handleEditPremiumInputChange}
      onSubmit={handleEditPremiumFormSubmit}
      formData={updateData}
       />
    </div>
  )
}

export default Packages