import React from "react";
import { useSelector } from "react-redux/es/exports";
import { Menu, Dropdown } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { getPackages } from "../../redux/slices/PremiumSlice";


const PackageTable = () => {
  const packages = useSelector(getPackages)

  const handleMenuClick = (id, action) => {
    switch (action) {
      case 'edit':
         // Pass the ID to the openModal function
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
          
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {packages.length > 0 && packages.map((item) => (
          <tr key={item.id} className="tableRow">
            
            <td>{item.name}</td>
            <td>$ {item.price}</td>
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
  );
};

export default PackageTable ;
