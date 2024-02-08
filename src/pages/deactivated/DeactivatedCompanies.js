import React,{useState,useEffect} from 'react'
import './deactivatedcompanies.css'
import { ToastContainer } from "react-toastify";
import { DeactivatedTable } from './DeactivatedTable';
import PaginationItem from '../../components/PaginationItem';
import { useDispatch } from 'react-redux';
import { setDeactivatedCompanies } from '../../redux/slices/CompaniesSlice';
import api from '../../api/api';
import { showErrorToast, showSuccessToast } from '../../Constants/Toasts';

const DeactivatedCompanies = () => {
    const dispatch = useDispatch()
      //pagination
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(4);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [entries, setEntries] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10); // Use radix 10

    setPageSize(newSize);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  //search param
  const [searchParam,setSearchParam] = useState(null)
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
  setSearchParam(value);
  };
  const activateCompany = async(id)=>{
    try {
       const res =  await api.post(`/company/activate/${id}`)
       if(res.status === 200){
        showSuccessToast(res.data)
        fetchDeactivatedCompanies();
       }else{
        showErrorToast(res.data)
       }
    } catch (error) {
       showErrorToast("Something went wrong, try again") 
    }
  }
  const fetchDeactivatedCompanies = async () => {
    try {
      let apiEndpoint = `/company/all/deactivated/page/${page}/size/${pageSize}`
      const params = searchParam ? `?param=${encodeURIComponent(searchParam)}` : '';

      const response = await api.get(
        apiEndpoint + params
      );
      if (response.status === 200) {
        dispatch(setDeactivatedCompanies(response.data.data));
        setPageCount(response.data.totalPages);
        setStartIndex(response.data.startIndex);
        setEndIndex(response.data.endIndex);
        setEntries(response.data.totalItems);
      }
    } catch (error) {}
  };
  useEffect(()=>{
    fetchDeactivatedCompanies()
  })

  return (
    <div className='deactivated-home' dir='rtl'>
        <ToastContainer position="top-right" />

        <div className="companytop">
        <h3>Deactivated Companies ({entries})</h3>
        
        </div>
        <DeactivatedTable onChange={handleSearchInputChange}
        pageSize={pageSize}
        param={searchParam}
        handlePageSizeChange={handlePageSizeChange}
        activateCompany={activateCompany}
         />
         <PaginationItem
        page={page}
        pageCount={pageCount}
        handleChange={handleChange}
        startIndex={startIndex}
        endIndex={endIndex}
        entries={entries}
      />
    </div>
  )
}

export default DeactivatedCompanies