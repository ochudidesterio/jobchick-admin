import React, { useEffect,useState} from "react";
import api from "../../api/api";
import "./admin.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setAdmins } from "../../redux/slices/UsersSlice";
import AdminTable from "./AdminTable";
import { ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';
import SelectPageSize from "../../components/SelectPageSize";
import PaginationItem from "../../components/PaginationItem";


const AdminUsers = () => {
  const {t} = useTranslation()
 
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
  
  const dispatch = useDispatch();
  useEffect(() => {
    getAddmins();
  });
  const getAddmins = async () => {
    try {
      const response = await api.get(`/user/admins/page/${page}/size/${pageSize}`);
      if (response.status === 200) {
        dispatch(setAdmins(response.data.users));
        setPageCount(response.data.totalPages);
        setStartIndex(response.data.startIndex);
        setEndIndex(response.data.endIndex);
        setEntries(response.data.totalItems);
      }
    } catch (error) {}
  };

  return (
    <div dir="rtl" className="adminhome">
      <ToastContainer position="top-right" />

      <div className="admintop">
        <h3>{t('admins')}</h3>
       <SelectPageSize pageSize={pageSize} handlePageSizeChange={handlePageSizeChange} />
      </div>
      <AdminTable />
      <PaginationItem page={page} pageCount={pageCount} handleChange={handleChange} startIndex={startIndex} endIndex={endIndex} entries={entries} />
      
    </div>
  );
};

export default AdminUsers;
