import React from "react";
import { Menu, Dropdown } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { getInActiveJobs } from "../../redux/slices/JobsSlice";
import { getLoggedInUser } from "../../redux/slices/UsersSlice";

const UpublishedTable = ({
  openAddRole,
  openAddQualification,
  openViewJob,
}) => {
  const inactiveJobs = useSelector(getInActiveJobs);
  const loggedInUser = useSelector(getLoggedInUser)
  const handleMenuClick = (id, title, action) => {
    switch (action) {
      case "view":
        openViewJob(id); // Pass the ID to the openModal function
        break;
      case "roles":
        openAddRole(id, title); // Pass the ID to the openModal function
        break;
      case "qualifications":
        openAddQualification(id, title); // Pass the ID to the openModal function
        break;
      case "delete":
        console.log(`Delete - Company ID: ${id}`);
        break;
      default:
        break;
    }
  };
  const menu = (id, title) => (
    <Menu onClick={({ key }) => handleMenuClick(id, title, key)}>
      <Menu.Item key="view">View</Menu.Item>
      {loggedInUser && loggedInUser.role === "ADMIN" && <>
      <Menu.Item key="roles">Roles</Menu.Item>
      <Menu.Item key="qualifications">Qualifications</Menu.Item>
      <Menu.Item key="delete" danger="true">
        Delete
      </Menu.Item>
      </>}
    </Menu>
  );

  if (inactiveJobs.length === 0) {
    return <p>No inactive jobs available.</p>;
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Company</th>
          <th>Region</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {inactiveJobs.map((item) => (
          <tr key={item.id} className="tableRow">
            <td>{item.title}</td>
            <td>{item.company.name}</td>
            <td>{item.region}</td>
            <td>
              <Dropdown
                overlay={menu(item.id, item.title)}
                trigger={["click"]}
                placement="bottomRight"
              >
                <EyeOutlined
                  style={{
                    fontSize: '16px',
                    color: '#696969',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#179CBD';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#696969';
                  }}
                />
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UpublishedTable;
