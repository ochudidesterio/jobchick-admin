import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { getActiveJobs } from '../../redux/slices/JobsSlice'
import { Menu, Dropdown } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const JobsTable = ({openViewJob,openEditJob}) => {
    const jobs = useSelector(getActiveJobs)
    const handleMenuClick = (id,action) => {
      switch (action) {
        case 'view':
          openViewJob(id); // Pass the ID to the openModal function
          break;
        case 'edit':
          openEditJob(id); // Pass the ID to the openModal function
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
          <Menu.Item key="view">View</Menu.Item>
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
        {jobs.length !==0 && jobs.map((item) => (
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

export default JobsTable