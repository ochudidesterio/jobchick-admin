import React, { useEffect ,useState} from "react";
import api from "../../api/api";
import { useDispatch } from "react-redux/es/exports";
import CustomAddButton from "../../components/CustomAddButton";
import "./category.css";
import { setCategories } from "../../redux/slices/CategorySlice";
import CategoryTable from "./CategoryTable";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../../Constants/Toasts";
import AddCategoryModal from "../../modals/AddCategoryModal";
import EditCategoryModal from "../../modals/EditCategoryModal";


const Category = () => {
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
  const [categoryData, setCategoryData] = useState({
    name: "",
  });

  const handleEditCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };
  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };
  const handleCategoryFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/category/create", categoryData);
      if (response.status === 200) {
        showSuccessToast("Created");
      }
    } catch (error) {}
    handleClose();
    //window.location.reload()
  };

  const handleEditCategoryFormSubmit = async (e) => {
    e.preventDefault();
    try {
       const response = await api.post(`/category/update/${updateData.id}/${updateData.name}`);
      console.log("Edit",updateData)
      if (response.status === 200) {
        showSuccessToast("updated");
      }else{
        showErrorToast("Failed")
      }
    } catch (error) {}
    handleCloseEdit();
    //window.location.reload()
  };

  useEffect(() => {
    fetchCategories();
  });

  const fetchCategories = async () => {
    try {
      const response = await api.get("/category/get/all");
      if (response.status === 200) {
        dispatch(setCategories(response.data));
      }
    } catch (error) {}
  };
  const editCategory = (id)=>{
    api.get(`/category/get/${id}`)
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
  return (
    <div dir="rtl" className="category-home">
      <ToastContainer position="top-right" />
      <div className="category-top">
        <h3>Categories</h3>
        <div>
          <CustomAddButton onClick={handleShow} name="Add Category" />
        </div>
      </div>
      <CategoryTable editCategory={editCategory} />
      <AddCategoryModal
      open={showModal}
      onClose={handleClose}
      onSubmit={handleCategoryFormSubmit}
      formData={categoryData}
      onChange={handleCategoryInputChange}
       />
       <EditCategoryModal 
       open={showEditModal}
       onClose={handleCloseEdit}
       onChange={handleEditCategoryInputChange}
       onSubmit = {handleEditCategoryFormSubmit}
       formData={updateData}
       />
    </div>
  );
};

export default Category;
