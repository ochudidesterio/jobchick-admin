import React from "react";
import { useSelector } from "react-redux/es/exports";
import { Menu, Dropdown } from "antd";
import { getCategories } from "../../redux/slices/CategorySlice";
import { EllipsisOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';


const CategoryTable = ({ editCategory,deleteCategory }) => {
  const {t} = useTranslation()
  const categories = useSelector(getCategories);

  const handleMenuClick = (id, action) => {
    switch (action) {
      case "edit":
        editCategory(id); // Pass the ID to the openModal function
        break;
      case "delete":
        deleteCategory(id)
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
          <th>{t('name')}</th>
          <th>{t('action')}</th>
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

export default CategoryTable;
