import React from "react";
import { useSelector } from "react-redux/es/exports";
import { Menu, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

import { getTypes } from "../../redux/slices/TypesSlice";
import { useTranslation } from 'react-i18next';


const JobTypeTable = ({editType,deleteType}) => {
  const {t} = useTranslation()
  const types = useSelector(getTypes)

  const handleMenuClick = (id, action) => {
    switch (action) {
      case 'edit':
        editType(id); // Pass the ID to the openModal function
        break;
      
      case "delete":
        deleteType(id);
        break;
      default:
        break;
    }
    };
  const menu = (id) => (
    <Menu onClick={({ key }) => handleMenuClick(id, key)}>
      <Menu.Item key="edit">{t('edit')}</Menu.Item>
      <Menu.Item key="delete" danger='true'>{t('delete')}</Menu.Item>

    </Menu>
  );
  return (
    <table className="table">
      <thead>
        <tr>
          
          <th>{t('type')}</th>
          <th>{t('action')}</th>
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
  );
};

export default JobTypeTable;
