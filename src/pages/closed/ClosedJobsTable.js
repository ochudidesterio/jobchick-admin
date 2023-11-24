import React from "react";
import { useSelector } from "react-redux/es/exports";
import { getClosedJobs } from "../../redux/slices/JobsSlice";
import { useTranslation } from "react-i18next";
import { EllipsisOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";

const ClosedJobsTable = ({openViewJob,openRepost}) => {
  const { t } = useTranslation();

  const closedJobs = useSelector(getClosedJobs);

  const handleMenuClick = (id, action,title) => {
    switch (action) {
      case "view":
        openViewJob(id) // Pass the ID to the openModal function
        break;
     
      

      case "repost":
        openRepost(id)
        break;
      default:
        break;
    }
  };
  const menu = (id,title) => (
    <Menu onClick={({ key }) => handleMenuClick(id, key,title)}>
      <Menu.Item key="view">{t('view')}</Menu.Item>
      <Menu.Item key="repost" danger="true">
        {t('repost')}
      </Menu.Item>
    </Menu>
  );

  if (closedJobs.length === 0) {
    return <p>No closed jobs available.</p>;
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>{t("title")}</th>
            <th>{t("companies")}</th>
            <th>{t("regions")}</th>
            <th>{t("action")}</th>
          </tr>
        </thead>
        <tbody>
          {closedJobs.length !== 0 &&
            closedJobs.map((item) => (
              <tr key={item.id} className="tableRow">
                <td>{item.title}</td>
                <td>{item.company.name}</td>
                <td>{item.region}</td>
                <td>
                  <Dropdown
                    overlay={menu(item.id, item.title)}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <EllipsisOutlined
                      style={{
                        fontSize: "24px",
                        color: "#696969",
                        transition: "color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#179CBD";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#696969";
                      }}
                    />
                  </Dropdown>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClosedJobsTable;
