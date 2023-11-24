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
import { showSuccessToast } from "../../Constants/Toasts";
import { ToastContainer } from "react-toastify";
import { setTypes } from "../../redux/slices/TypesSlice";
import { setRegions } from "../../redux/slices/RegionSlice";
import ViewCompanyProfileModal from "../../modals/ViewCompanyProfileModal";
import AddUserModal from "../../modals/AddUserModal";
import { useTranslation } from "react-i18next";

const Companies = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

  useEffect(() => {
    fetchCompanies();
  });
  const fetchCompanies = async () => {
    try {
      const response = await api.get("/company/all");
      if (response.status === 200) {
        dispatch(setCompanies(response.data));
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
        <h3>{t("companies")}</h3>
        <div>
          <CustomAddButton onClick={handleShow} name={t("addcompany")} />
        </div>
      </div>
      <CompaniesTable
        openCreateAdmin={openCreateAdmin}
        openCompanyProfile={openCompanyProfile}
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
      />
    </div>
  );
};

export default Companies;
