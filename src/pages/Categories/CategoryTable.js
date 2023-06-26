import React from "react";
import { useSelector } from "react-redux/es/exports";
import { Menu, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { getCategories } from "../../redux/slices/CategorySlice";

const CategoryTable = () => {
  const categories = useSelector(getCategories);

  const handleMenuClick = (id, action) => {
    console.log(`Clicked on menu item: ${action}`);
    console.log(`User ID: ${id}`);
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
          
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((item) => (
          <tr key={item.id} className="tableRow">
            
            <td>{item.name}</td>
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
  );
};

export default CategoryTable;
