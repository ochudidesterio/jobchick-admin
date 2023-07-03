import React from "react";
import { useSelector } from "react-redux/es/exports";
import { getUsers } from "../../redux/slices/UsersSlice";
import { Menu, Dropdown } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const UsersTable = ({ openViewProfile,openEditProfile,openChangePassword }) => {
  const users = useSelector(getUsers);

  const handleMenuClick = (id, action) => {
    switch (action) {
      case "profile":
        openViewProfile(id); // Pass the ID to the openModal function
        break;
      case "edit":
        openEditProfile(id);
        break;
      case "password":
        openChangePassword(id)
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
      <Menu.Item key="profile">View Profile</Menu.Item>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="password">Change Password</Menu.Item>
      <Menu.Item key="delete" danger="true">
        Delete
      </Menu.Item>
    </Menu>
  );
  return (
    <table className="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item) => (
          <tr key={item.id} className="tableRow">
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.authUsername}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.email}</td>
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
  );
};

export default UsersTable;
