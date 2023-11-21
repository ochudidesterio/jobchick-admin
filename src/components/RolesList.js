import React from "react";
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getLoggedInUser } from "../redux/slices/UsersSlice";

const RolesList = ({ roles, job, openEditRoles }) => {
  const { t } = useTranslation();
  const loggedInUser = useSelector(getLoggedInUser);

  if (roles.length === 0) {
    return <div>No roles available.</div>;
  }

  return (
    <div>
      <div className="edit-header">
        <h4>{t("rolesandresposibilities")}</h4>
        {loggedInUser && loggedInUser.role === "ADMIN" && (
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
