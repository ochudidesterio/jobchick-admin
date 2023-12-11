import React, { useEffect, useState } from "react";
import api from "../../api/api";
import CustomAddButton from "../../components/CustomAddButton";
import "./companies.css";
import { useDispatch } from "react-redux/es/exports";
import {
  setCompanies,
  setSelectedCompany,
} from "../../redux/slices/CompaniesSlice";
import { setCategories } from "../../redux/slices/CategorySlice";
import { CompaniesTable } from "./CompaniesTable";
import AddCompaniesModal from "../../modals/AddCompaniesModal";
import { showErrorToast, showSuccessToast } from "../../Constants/Toasts";
import { ToastContainer } from "react-toastify";
import { setTypes } from "../../redux/slices/TypesSlice";
import { setRegions } from "../../redux/slices/RegionSlice";
import ViewCompanyProfileModal from "../../modals/ViewCompanyProfileModal";
import AddUserModal from "../../modals/AddUserModal";
import { useTranslation } from "react-i18next";
import PaginationItem from "../../components/PaginationItem";
import CreateJobModal from "../../modals/CreateJobModal";

const Companies = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

  //search param
  const [searchParam,setSearchParam] = useState(null)
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
  setSearchParam(value);
  };

  //selected company
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  //add company modal
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  //create admin modal
  const [showCreateAdmin, setCreateAdmin] = useState(false);
  const handleCloseCreateAdmin = () => setCreateAdmin(false);

  //create job modal
   //create job modal
   const [showCreateJob, setCreateJob] = useState(false);
   const handleCloseCreateJob = () => setCreateJob(false);
   const handleShowCreateJob =()=>setCreateJob(true)
  const [showViewCompany, setViewCompany] = useState(false);
  const handleCloseViewCompany = () => setViewCompany(false);

  //create company data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
  });

  const initialAdminData = {
    username: "",
    email: "",
    password: "",
  };
    //create job data
    const [jobData, setJobData] = useState({
      title: "",
      typeId: "",
      regionId: "",
      categoryId: "",
      description: "",
      level: "",
      companyId: "",
      latitude: 31.76904,
      longitude: 35.21633,
    });

  const [adminData, setAdminData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/company/create", formData);
      if (response.status === 200) {
        showSuccessToast(t("created"));
      }
    } catch (error) {}
    handleClose();
    //window.location.reload()
  };
  const handleJobFormSubmit = async  (e) => {
    jobData.companyId = selectedCompanyId
    e.preventDefault();
    try {
      if (
        jobData.description === "" ||
        jobData.level === "" ||
        jobData.regionId === "" ||
        jobData.title === "" ||
        jobData.typeId === ""
      ) {
        showErrorToast(t('failedallfieldsrequired'));
      } else {
        const response = await api.post("/job/create", jobData);
        if (response.status === 200) {
          showSuccessToast(t('created'));
          handleCloseCreateJob();
        }
      }
    } catch (error) {}

    //window.location.reload()
  };
  const handleJobInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };
  const updateJobData = (newLat, newLng) => {
    setJobData({ ...jobData, latitude: newLat, longitude: newLng });
  };

  const handleAdminFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      authUsername: adminData.username,
      email: adminData.email,
      password: adminData.password,
    };
    try {
      const res = await api.post(`/user/add/admin/${selectedCompanyId}`, data);
      if (res.status === 200) {
        showSuccessToast(t("created"));
        setAdminData(initialAdminData);
      }
    } catch (e) {}

    handleCloseCreateAdmin();
    //window.location.reload()
  };
  useEffect(() => {
    fetchCompanies();
  });
 
 
  const fetchCompanies = async () => {
    try {
      let apiEndpoint = `/company/all/page/${page}/size/${pageSize}`
      const params = searchParam ? `?param=${encodeURIComponent(searchParam)}` : '';

      const response = await api.get(
        apiEndpoint + params
      );
      if (response.status === 200) {
        dispatch(setCompanies(response.data.data));
        setPageCount(response.data.totalPages);
        setStartIndex(response.data.startIndex);
        setEndIndex(response.data.endIndex);
        setEntries(response.data.totalItems);
      }
    } catch (error) {}
  };

  const openCompanyProfile = (id) => {
    api
      .get(`/company/get/${id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setSelectedCompany(res.data));
          setViewCompany(true);
        }
      })
      .catch((e) => console.log(e));
  };
  const openCreateJob =(id)=>{
    setSelectedCompanyId(id)
    //setCreateJob(true)
    handleShowCreateJob()

  }

  const openCreateAdmin = (id) => {
    setSelectedCompanyId(id);
    setCreateAdmin(true);
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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchJobTypes();
  });
  const fetchJobTypes = async () => {
    try {
      const response = await api.get("/type/all");
      if (response.status === 200) {
        dispatch(setTypes(response.data));
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchRegions();
  });
  const fetchRegions = async () => {
    try {
      const response = await api.get("/region/all");
      if (response.status === 200) {
        dispatch(setRegions(response.data));
      }
    } catch (error) {}
  };
  return (
    <div dir="rtl" className="companyhome">
      <ToastContainer position="top-right" />

      <div className="companytop">
        <h3>{t("companies")} ({entries})</h3>
        
        <div>
          <CustomAddButton onClick={handleShow} name={t("addcompany")} />
        </div>
      </div>
      <CompaniesTable
        openCreateAdmin={openCreateAdmin}
        openCompanyProfile={openCompanyProfile}
        pageSize={pageSize}
        handlePageSizeChange={handlePageSizeChange}
        param={searchParam}
        onChange={handleSearchInputChange}
        openCreateJob = {openCreateJob}
      />
      <PaginationItem
        page={page}
        pageCount={pageCount}
        handleChange={handleChange}
        startIndex={startIndex}
        endIndex={endIndex}
        entries={entries}
      />
      <AddCompaniesModal
        open={showModal}
        onClose={handleClose}
        onSubmit={handleFormSubmit}
        formData={formData}
        onChange={handleInputChange}
      />

      <ViewCompanyProfileModal
        open={showViewCompany}
        onClose={handleCloseViewCompany}
      />
      <AddUserModal
        open={showCreateAdmin}
        onClose={handleCloseCreateAdmin}
        onSubmit={handleAdminFormSubmit}
        formData={adminData}
        onChange={handleAdminInputChange}
        title="Create admin"
      />
      <CreateJobModal
        open={showCreateJob}
        onClose={handleCloseCreateJob}
        onSubmit={handleJobFormSubmit}
        jobData={jobData}
        onChange={handleJobInputChange}
        upDateJobData={updateJobData}
      />
    </div>
  );
};

export default Companies;
