import React from "react";
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getLoggedInUser } from "../redux/slices/UsersSlice";

const QualificationList = ({ qualifications, job, openEditQualifications }) => {
  const { t } = useTranslation();
  const loggedInUser = useSelector(getLoggedInUser);

  if (qualifications.length === 0) {
    return <div>No qualifications available.</div>;
  }

  return (
    <div>
      <div className="edit-header">
        <h4>{t("qualifications")}</h4>
        {loggedInUser && loggedInUser.role === "ADMIN" && (
          <EditOutlined
            onClick={() => {
              openEditQualifications(job.id);
            }}
            className="edit-icon"
          />
        )}
      </div>
      <ol>
        {qualifications.map((q) => (
          <li key={q.id}>{q.qualification}</li>
        ))}
      </ol>
    </div>
  );
};

export default QualificationList;
