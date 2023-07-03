import React from 'react'
import { useSelector } from 'react-redux/es/exports'
import { getCompanies } from '../../redux/slices/CompaniesSlice'
import { Menu, Dropdown } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";



export const CompaniesTable = ({openCreateJob,openCompanyProfile}) => {
 const companies = useSelector(getCompanies)


const handleMenuClick = (id, action) => {
  switch (action) {
    case 'profile':
      openCompanyProfile(id)
      break;
    case 'createjob':
      openCreateJob(id); // Pass the company ID to the openModal function
      break;
    case 'edit':
      console.log(`Edit - Company ID: ${id}`);
      break;
    case 'delete':
      console.log(`Delete - Company ID: ${id}`);
      break;
    default:
      break;
  }
  };
  const menu = (id) => (
    <Menu onClick={({ key }) => handleMenuClick(id, key)}>
      <Menu.Item key="profile">View</Menu.Item>
      <Menu.Item key="createjob">Create Job</Menu.Item>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete" danger="true">
        Delete
      </Menu.Item>
    </Menu>
  );
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Location</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((item) => (
          <tr
            key={item.id}
            
            className="tableRow"
          >
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.location}</td>
            <td>
            <Dropdown
                overlay={menu(item.id)}
                trigger={["click"]}
                placement="bottomRight"
              >
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  style={{
                    fontSize: "25px",
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
  )
}
