import React from "react";
import { useSelector } from "react-redux/es/exports";
import {  getDeactivatedCompanies } from "../../redux/slices/CompaniesSlice";
import { Menu, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';
import SelectPageSize from "../../components/SelectPageSize";


export const DeactivatedTable = ({ pageSize, param,handlePageSizeChange,
  onChange,activateCompany }) => {
  const {t}=useTranslation()
  const companies = useSelector(getDeactivatedCompanies);
  

  const handleMenuClick = (id, action) => {
    switch (action) {
      case "activate":
        activateCompany(id);
        break;
      default:
        break;
    }
  };
  const menu = (id) => (
    <Menu onClick={({ key }) => handleMenuClick(id, key)}>
      
      <Menu.Item key="activate" danger="true">
        Activate
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
          value={param}
          onChange={onChange}
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
      {companies.length === 0 ? (
        <p>No companies found</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>{t('name')}</th>
              <th>{t('email')}</th>
              <th>{t('contact')}</th>
              <th>{t('location')}</th>
              <th>{t('action')}</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((item) => (
              <tr key={item.id} className="tableRow">
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
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
      )}
    </>
  );
};
