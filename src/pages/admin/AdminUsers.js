import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./admin.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setAdmins } from "../../redux/slices/UsersSlice";
import AdminTable from "./AdminTable";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import SelectPageSize from "../../components/SelectPageSize";
import PaginationItem from "../../components/PaginationItem";
import { setSelectedUser } from "../../redux/slices/UsersSlice";
import ViewProfileModal from "../../modals/ViewProfileModal";
import { showSuccessToast } from "../../Constants/Toasts";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";

const AdminUsers = () => {
  const { t } = useTranslation();

  //admin users
  let adminsResponse;

  //pagination
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(4);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [entries, setEntries] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [searchParam, setSearchParam] = useState(null);
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchParam(value);
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10); // Use radix 10

    setPageSize(newSize);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  //create view profile
  const [showViewProfile, setViewProfile] = useState(false);
  const handleShowViewProfile = () => setViewProfile(false);

  const openViewProfile = (userId) => {
    try {
      api
        .get(`/user/${userId}`)
        .then((res) => {
          if (res.status === 200) {
            dispatch(setSelectedUser(res.data));
            setViewProfile(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };
  const deleteAdminUser = (userId) => {
    try {
      api
        .post(`/company/delete/admin/${userId}`)
        .then((res) => {
          if (res.status === 200) {
            showSuccessToast(res.data);
            getAddmins();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getAddmins();
  });
  const getAddmins = async () => {
    try {
      if (searchParam === null) {
        adminsResponse = await api.get(
          `/user/admins/page/${page}/size/${pageSize}`
        );
      }
      if (searchParam !== null) {
        let apiEndpoint = `/user/search/admins/page/${page}/size/${pageSize}`;
        const params = searchParam
          ? `?param=${encodeURIComponent(searchParam)}`
          : "";
        adminsResponse = await api.get(apiEndpoint + params);
      }

      if (adminsResponse.status === 200) {
        dispatch(setAdmins(adminsResponse.data.users));
        setPageCount(adminsResponse.data.totalPages);
        setStartIndex(adminsResponse.data.startIndex);
        setEndIndex(adminsResponse.data.endIndex);
        setEntries(adminsResponse.data.totalItems);
      }
    } catch (error) {}
  };

  return (
    <div dir="rtl" className="adminhome">
      <ToastContainer position="top-right" />

      <div className="admintop">
        <h3>{t("admins")}</h3>
        <SelectPageSize
          pageSize={pageSize}
          handlePageSizeChange={handlePageSizeChange}
        />
        <div className="search">
          <TextField
            placeholder={t("searchuser")}
            margin="normal"
            size="small"
            className="search-input"
            value={searchParam}
            onChange={handleSearchInputChange}
            InputProps={{
              startAdornment: <Search style={{ color: "#179CBD" }} />,
              style: {
                borderRadius: "2px",
                height: "35px",
                width: "200px",
                borderWidth: 0.5,
                fontFamily: "Open Sans",
              },
            }}
            dir="rtl"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#179CBD",
                  fontFamily: "Open Sans",
                },
                "&:hover fieldset": {
                  borderColor: "#179CBD", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#179CBD", // Border color when focused
                  color: "#179CBD", // Text color when focused
                },
              },
            }}
          />
        </div>
      </div>
      <AdminTable
        openViewProfile={openViewProfile}
        deleteAdminUser={deleteAdminUser}
      />
      <PaginationItem
        page={page}
        pageCount={pageCount}
        handleChange={handleChange}
        startIndex={startIndex}
        endIndex={endIndex}
        entries={entries}
      />
      <ViewProfileModal
        open={showViewProfile}
        onClose={handleShowViewProfile}
      />
    </div>
  );
};

export default AdminUsers;
