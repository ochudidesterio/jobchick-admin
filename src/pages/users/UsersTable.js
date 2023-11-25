import React, { useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { getUsers } from "../../redux/slices/UsersSlice";
import UsersTableComponent from "./UsersTableComponent";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';



const UsersTable = ({
  openViewProfile,
  openEditProfile,
  openChangePassword,
}) => {

  const{t} = useTranslation()

  const users = useSelector(getUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const filterUsers = (users, query) => {
    return users.filter((user) => {
      const firstName = user.firstName ? user.firstName.toLowerCase() : "";
      const lastName = user.lastName ? user.lastName.toLowerCase() : "";
      const authUsername = user.authUsername
        ? user.authUsername.toLowerCase()
        : "";
      const phoneNumber = user.phoneNumber
        ? user.phoneNumber.toLowerCase()
        : "";
      const email = user.email ? user.email.toLowerCase() : "";

      return (
        firstName.includes(query.toLowerCase()) ||
        lastName.includes(query.toLowerCase()) ||
        authUsername.includes(query.toLowerCase()) ||
        phoneNumber.includes(query.toLowerCase()) ||
        email.includes(query.toLowerCase())
      );
    });
  };

  const filteredUsers = filterUsers(users, searchQuery);

  return (
    <div>
      <div className="seach-container">
        <h3>{t('users')}</h3>
        <TextField
          placeholder={t('searchuser')}
          margin="normal"
          size="small"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search style={{ color: "#179CBD" }} />,
            style: {
              borderRadius: "5px",
              height: "35px",
              borderWidth: "1px",
              fontFamily: "Open Sans",
            },
          }}
          dir = "rtl"
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

      <UsersTableComponent
        userList={filteredUsers}
        openChangePassword={openChangePassword}
        openEditProfile={openEditProfile}
        openViewProfile={openViewProfile}
      />
    </div>
  );
};

export default UsersTable;
