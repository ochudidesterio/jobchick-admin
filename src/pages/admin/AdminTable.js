import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getAdmins } from '../../redux/slices/UsersSlice';
import { Menu, Dropdown } from "antd";

import { EllipsisOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';



const AdminTable = ({openViewProfile}) => {
  const {t} = useTranslation()
    const admins = useSelector(getAdmins)
    const handleRowClick = (client) => {
        
    };
    const handleMenuClick = (id, action) => {
      switch (action) {
        case "profile":
          openViewProfile(id);
          break;
        
        case "delete":
          console.log(`Delete - User ID: ${id}`);
          break;
        default:
          break;
      }
      };
      const menu = (id) => (
        <Menu onClick={({ key }) => handleMenuClick(id, key)}>
          <Menu.Item key="profile">{t('viewprofile')}</Menu.Item>
          <Menu.Item key="delete" danger="true">
            Delete
          </Menu.Item>
        </Menu>
      );
  return (
    <table className="table">
    <thead>
      <tr>
        <th>{t('firstname')}</th>
        <th>{t('lastname')}</th>
        <th>{t('username')}</th>
        <th>{t('phonenumber')}</th>
        <th>{t('email')}</th>
        <th>{t('companies')}</th>
        <th>{t('action')}</th>
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
          <td>{item.company}</td>
          <td>
              <Dropdown
                overlay={menu(item.id)}
                trigger={["click"]}
                placement="bottomRight"
              >
                 <EllipsisOutlined
                  style={{
                    fontSize: '24px',
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