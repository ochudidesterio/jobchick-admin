import React from "react";
import { useSelector } from "react-redux/es/exports";
import { Menu, Dropdown } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { getPackages } from "../../redux/slices/PremiumSlice";
import { useTranslation } from 'react-i18next';


const PackageTable = ({editPackage}) => {
  const {t} = useTranslation()
  const packages = useSelector(getPackages)

  const handleMenuClick = (id, action) => {
    switch (action) {
      case 'edit':
        editPackage(id)
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
      <Menu.Item key="edit">{t('edit')}</Menu.Item>
      <Menu.Item key="delete" danger="true">
        {t('delete')}
      </Menu.Item>
    </Menu>
  );
  return (
    <table className="table">
      <thead>
        <tr>
          
          <th>{t('name')}</th>
          <th>{t('price')}</th>
          <th>{t('action')}</th>
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
