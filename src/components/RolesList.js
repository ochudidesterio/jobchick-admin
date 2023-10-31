import React from 'react';
import { useTranslation } from 'react-i18next';


const RolesList = ({ roles }) => {
  const {t} = useTranslation()
  if (roles.length === 0) {
    return <div>No roles available.</div>;
  }

  return (
    <div >
      <h4>{t('rolesandresposibilities')}</h4>
      <ol>
        {roles.map((role) => (
          <li key={role.id}>{role.role}</li>
        ))}
      </ol>
    </div>
  );
};

export default RolesList;

