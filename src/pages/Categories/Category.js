import React, { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";
import SelectPageSize from "../../components/SelectPageSize";
import PaginationItem from "../../components/PaginationItem";

const Category = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  //pagination
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(4);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [entries, setEntries] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Default page size

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10); // Use radix 10

    setPageSize(newSize);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
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
    id: "",
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
        showSuccessToast(t("created"));
      }
    } catch (error) {}
    handleClose();
  };

  const handleEditCategoryFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `/category/update/${updateData.id}/${updateData.name}`
      );
      console.log("Edit", updateData);
      if (response.status === 200) {
        showSuccessToast(t("updated"));
      } else {
        showErrorToast(t("failed"));
      }
    } catch (error) {}
    handleCloseEdit();
  };

  const fetchPagedCategories = async () => {
    try {
      const response = await api.get(
        `/category/paged/${page}/size/${pageSize}`
      );
      if (response.status === 200) {
        dispatch(setCategories(response.data.data));
        setPageCount(response.data.totalPages);
        setStartIndex(response.data.startIndex);
        setEndIndex(response.data.endIndex);
        setEntries(response.data.totalItems);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchPagedCategories();
  });
  const editCategory = (id) => {
    api
      .get(`/category/get/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setUpdateData({
            id: res.data.id,
            name: res.data.name,
          });
          setShowEditModal(true);
        }
      })
      .catch((e) => console.log(e));
  };
  const deleteCategory = (id) =>{
    if(id !== 0){
      api.delete(`/category/delete/${id}`)
    .then((res)=>{showSuccessToast(res.data)})
    .catch((e)=>showErrorToast("failed"))
    }else{
      showErrorToast("Cannot delete default category")
    }
  }
  return (
    <div dir="rtl" className="category-home">
      <ToastContainer position="top-right" />
      <div className="category-top">
        <h3>{t("categories")} ({entries})</h3>
        <SelectPageSize pageSize={pageSize} handlePageSizeChange={handlePageSizeChange} />
        <div>
          <CustomAddButton onClick={handleShow} name={t("addcategory")} />
        </div>
      </div>
      <CategoryTable editCategory={editCategory} deleteCategory={deleteCategory} />
      <PaginationItem 
      page={page}
      pageCount ={pageCount}
      handleChange={handleChange}
      startIndex={startIndex}
      endIndex={endIndex}
      entries={entries}
       />
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
        onSubmit={handleEditCategoryFormSubmit}
        formData={updateData}
      />
    </div>
  );
};

export default Category;
