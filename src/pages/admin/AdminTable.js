import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getAdmins } from '../../redux/slices/UsersSlice';
import { Menu, Dropdown } from "antd";

import { EyeOutlined } from "@ant-design/icons";


const AdminTable = () => {
    const admins = useSelector(getAdmins)
    const handleRowClick = (client) => {
        
    };
    const handleMenuClick = (id, action) => {
        console.log(`Clicked on menu item: ${action}`);
        console.log(`User ID: ${id}`);
      };
      const menu = (id) => (
        <Menu onClick={({ key }) => handleMenuClick(id, key)}>
          <Menu.Item key="profile">View Profile</Menu.Item>
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
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
        <th>Phone Number</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {admins.map((item) => (
        <tr
          key={item.id}
          onClick={() => handleRowClick(item)}
          className="tableRow"
        >
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
  )
}

export default AdminTable