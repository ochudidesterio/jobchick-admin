import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';


const Matched = ({ users, handleRowClick, title }) => {
  const {t} = useTranslation()
  return (
    <div>
    <h5>{t('userswhomatched')} {title}</h5>
    <table className="table">
      <thead>
        <tr>
        <th>{t('firstname')}</th>
            <th>{t('lastname')}</th>
            <th>{t('username')}</th>
            <th>{t('phonenumber')}</th>
            <th>{t('email')}</th>
            <th>{t('action')}</th>
        </tr>
      </thead>
      <tbody>
        {users.length !== 0 ? (
          users.map((item) => (
            <tr
              key={item.id}
              onClick={() => handleRowClick(item.id)}
              className="tableRow"
            >
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.authUsername}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.email}</td>
              <td>
                <EyeOutlined style={{ fontSize: "16px", color: "#696969" }} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>{t('nomatches')}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  );
};

export default Matched;
