import React, { useEffect ,useState} from "react";
import api from "../../api/api";
import { useDispatch } from "react-redux/es/exports";
import CustomAddButton from "../../components/CustomAddButton";
import "./category.css";
import { setCategories } from "../../redux/slices/CategorySlice";
import CategoryTable from "./CategoryTable";
import { ToastContainer } from "react-toastify";
import { showSuccessToast } from "../../Constants/Toasts";
import AddCategoryModal from "../../modals/AddCategoryModal";


const Category = () => {
  const dispatch = useDispatch();
  //add category modal
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  //create category data
  const [categoryData, setCategoryData] = useState({
    name: "",
  });
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
  return (
    <div className="category-home">
      <ToastContainer position="top-right" />
      <div className="category-top">
        <h3>Categories</h3>
        <div>
          <CustomAddButton onClick={handleShow} name="Add Category" />
        </div>
      </div>
      <CategoryTable />
      <AddCategoryModal
      open={showModal}
      onClose={handleClose}
      onSubmit={handleCategoryFormSubmit}
      formData={categoryData}
      onChange={handleCategoryInputChange}
       />
    </div>
  );
};

export default Category;
