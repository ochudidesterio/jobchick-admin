import React from "react";
import { useSelector } from "react-redux/es/exports";
import { Menu, Dropdown } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { getTypes } from "../../redux/slices/TypesSlice";

const JobTypeTable = ({editType}) => {
  const types = useSelector(getTypes)

  const handleMenuClick = (id, action) => {
    switch (action) {
      case 'edit':
        editType(id); // Pass the ID to the openModal function
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
          
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {types.map((item) => (
          <tr key={item.id} className="tableRow">
            
            <td>{item.name}</td>
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

export default JobTypeTable;
