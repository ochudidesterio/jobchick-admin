import React from "react";
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";

const RolesList = ({ roles, job, openEditRoles }) => {
  const { t } = useTranslation();

  if (roles.length === 0) {
    return <div>No roles available.</div>;
  }

  return (
    <div>
      <div className="edit-header">
        <h4>{t("rolesandresposibilities")}</h4>
        { (
          <EditOutlined
            onClick={() => {
              openEditRoles(job.id);
            }}
            className="edit-icon"
          />
        )}
      </div>
      <ol>
        {roles.map((role) => (
          <li key={role.id}>{role.role}</li>
        ))}
      </ol>
    </div>
  );
};

export default RolesList;
