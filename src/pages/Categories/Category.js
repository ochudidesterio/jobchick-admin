import React, { useEffect } from "react";
import api from "../../api/api";
import { useDispatch } from "react-redux/es/exports";
import CustomAddButton from "../../components/CustomAddButton";
import "./category.css";
import { setCategories } from "../../redux/slices/CategorySlice";
import CategoryTable from "./CategoryTable";

const Category = () => {
  const dispatch = useDispatch();

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
      <div className="category-top">
        <h3>Categories</h3>
        <div>
          <CustomAddButton name="Add Category" />
        </div>
      </div>
      <CategoryTable />
    </div>
  );
};

export default Category;
