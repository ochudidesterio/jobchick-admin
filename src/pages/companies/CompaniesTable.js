import React, { useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { getCompanies } from "../../redux/slices/CompaniesSlice";
import { Menu, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';
import SelectPageSize from "../../components/SelectPageSize";


export const CompaniesTable = ({ openCompanyProfile, openCreateAdmin,pageSize,handlePageSizeChange }) => {
  const {t}=useTranslation()
  const companies = useSelector(getCompanies);
  const [searchQuery, setSearchQuery] = useState("");

  const filterCompanies = (companies, query) => {
    return companies.filter((item) => {
      const name = item.name ? item.name.toLowerCase() : "";
      const email = item.email ? item.name.toLowerCase() : "";
      const phoneNumber = item.phoneNumber
        ? item.phoneNumber.toLowerCase()
        : "";

      const location = item.location ? item.location.toLowerCase() : "";

      return (
        name.includes(query.toLowerCase()) ||
        location.includes(query.toLowerCase()) ||
        phoneNumber.includes(query.toLowerCase()) ||
        email.includes(query.toLowerCase())
      );
    });
  };

  const filteredCompanies = filterCompanies(companies, searchQuery);

  const handleMenuClick = (id, action) => {
    switch (action) {
      case "profile":
        openCompanyProfile(id);
        break;

      case "admin":
        openCreateAdmin(id); // Pass the company ID to the openModal function
        break;
      case "edit":
        console.log(`Edit - Company ID: ${id}`);
        break;
      case "delete":
        console.log(`Delete - Company ID: ${id}`);
        break;
      default:
        break;
    }
  };
  const menu = (id) => (
    <Menu onClick={({ key }) => handleMenuClick(id, key)}>
      <Menu.Item key="profile">{t('view')}</Menu.Item>
      <Menu.Item key="edit">{t('edit')}</Menu.Item>
      <Menu.Item key="admin">{t('createadmin')}</Menu.Item>
      <Menu.Item key="delete" danger="true">
        {t('deactivate')}
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className="seach-container">
      
        <TextField
          placeholder={t('search')}
          margin="normal"
          size="small"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search style={{ color: "#179CBD" }} />,
            style: {
              borderRadius: "10px",
              height: "35px",
              borderWidth: "1px",
              fontFamily: "Open Sans",
            },
          }}
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
         <SelectPageSize
          pageSize={pageSize}
          handlePageSizeChange={handlePageSizeChange}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>{t('name')}</th>
            <th>{t('email')}</th>
            <th>{t('admin')}</th>
            <th>{t('contact')}</th>
            <th>{t('location')}</th>
            <th>{t('action')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.map((item) => (
            <tr key={item.id} className="tableRow">
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                {item.admin &&
                item.admin.firstName !== null &&
                item.admin.lastName !== null
                  ? item.admin.firstName + " " + item.admin.lastName
                  : item.admin && item.admin.authUsername}
              </td>
              <td>{item.admin ? item.admin.phoneNumber : ""}</td>

              <td>{item.location}</td>
              <td>
                <Dropdown
                  overlay={menu(item.id)}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <EllipsisOutlined
                    style={{
                      fontSize: "24px",
                      color: "#696969",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#179CBD";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#696969";
                    }}
                  />
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
