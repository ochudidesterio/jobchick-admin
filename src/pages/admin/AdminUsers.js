import React, { useEffect} from "react";
import api from "../../api/api";
import "./admin.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setAdmins } from "../../redux/slices/UsersSlice";
import AdminTable from "./AdminTable";
import { ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';


const AdminUsers = () => {
  const {t} = useTranslation()
 
 
  
  const dispatch = useDispatch();
  useEffect(() => {
    getAddmins();
  });
  const getAddmins = async () => {
    try {
      const response = await api.get("/user/admins");
      if (response.status === 200) {
        dispatch(setAdmins(response.data));
      }
    } catch (error) {}
  };

  return (
    <div dir="rtl" className="adminhome">
      <ToastContainer position="top-right" />

      <div className="admintop">
        <h3>{t('admins')}</h3>
       
      </div>
      <AdminTable />
      
    </div>
  );
};

export default AdminUsers;
