import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { getActiveJobs } from '../../redux/slices/JobsSlice'
import { Menu, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const JobsTable = () => {
    const jobs = useSelector(getActiveJobs)
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
          <th>Title</th>
          <th>Company</th>
          <th>Region</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((item) => (
          <tr key={item.id} className="tableRow">
            <td>{item.title}</td>
            <td>{item.company.name}</td>
            <td>{item.region}</td>
            <td>
              <Dropdown
                overlay={menu(item.id)}
                trigger={["click"]}
                placement="bottomRight"
              >
                <EllipsisOutlined
                  style={{
                    fontSize: "25px",
                    color: "black",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#179CBD";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "black";
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

export default JobsTable