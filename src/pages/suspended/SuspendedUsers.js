import React,{useState,useEffect} from 'react'
import { ToastContainer } from "react-toastify";
import api from '../../api/api';
import PaginationItem from '../../components/PaginationItem';
import SuspendedUsersTable from './SuspendeUsersTable';
import { useDispatch } from 'react-redux';
import { setSuspendedUsers } from '../../redux/slices/UsersSlice';
import { showErrorToast, showSuccessToast } from '../../Constants/Toasts';

const SuspendedUsers = () => {
    const dispatch = useDispatch()
    //pagination
   const [page, setPage] = useState(1);
   const [pageCount,setPageCount] = useState(4)
   const [startIndex,setStartIndex] = useState(0)
   const [endIndex,setEndIndex] = useState(0)
   const [entries,setEntries] = useState(0)
   const [pageSize, setPageSize] = useState(10); // Default page size
   //search param
   const [searchParam,setSearchParam] = useState(null)

   const handleChange = (event, value) => {
     setPage(value);
   };
   const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10); // Use radix 10

    setPageSize(newSize);
  };
   
   const handleSearchInputChange = (e) => {
     const { value } = e.target;
   setSearchParam(value);
   };
  const activateUser =async(id)=>{
    try {
       const res = await api.post(`/user/activate/${id}`) 
       if(res.status === 200){
        fetchSuspendedUsers()
        showSuccessToast(res.data)
    
       }else{
        showErrorToast(res.data)
       }
    } catch (error) {
        showErrorToast("Something went wrong, try again")
    }
  }
  const fetchSuspendedUsers = async () => {
    try {
      let apiEndpoint = `/user/all/suspended/page/${page}/size/${pageSize}`
      const params = searchParam ? `?param=${encodeURIComponent(searchParam)}` : '';

      const response = await api.get(
        apiEndpoint + params
      );
      if (response.status === 200) {
        dispatch(setSuspendedUsers(response.data.users));
        setPageCount(response.data.totalPages);
        setStartIndex(response.data.startIndex);
        setEndIndex(response.data.endIndex);
        setEntries(response.data.totalItems);
      }
    } catch (error) {}
  };
  useEffect(()=>{
    fetchSuspendedUsers()
  })
  return (
    <div className="supended-home" dir='rtl'>
    <ToastContainer position="top-right" />
    <SuspendedUsersTable
        pageSize ={pageSize}
        handlePageSize = {handlePageSizeChange}
        param = {searchParam}
        onChange = {handleSearchInputChange}
        totalUsers={entries}
        activateUser={activateUser}
      />

<PaginationItem page={page} pageCount={pageCount} handleChange={handleChange} startIndex={startIndex} endIndex={endIndex} entries={entries} />

    </div>
  )
}

export default SuspendedUsers