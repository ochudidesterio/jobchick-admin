import React from "react";
import { Menu, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux/es/exports";
import { getLoggedInUser } from "../../redux/slices/UsersSlice";

const UsersTableComponent = ({
  userList,
  openViewProfile,
  openEditProfile,
  openChangePassword,
}) => {
  const { t } = useTranslation();
  const loggedUser = useSelector(getLoggedInUser);

  const handleMenuClick = (id, action) => {
    switch (action) {
      case "profile":
        openViewProfile(id);
        break;
      case "edit":
        openEditProfile(id);
        break;
      case "password":
        openChangePassword(id);
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
      <Menu.Item key="profile">{t("viewprofile")}</Menu.Item>
      {loggedUser && loggedUser.role === "SUPERADMIN" && (
        <Menu.Item key="edit">{t("edit")}</Menu.Item>
      )}

      {/* Add other menu items as needed */}
    </Menu>
  );

  return (
    <table dir="rtl" className="table">
      <thead>
        <tr>
          <th>{t("firstname")}</th>
          <th>{t("lastname")}</th>
          <th>{t("username")}</th>
          <th>{t("phonenumber")}</th>
          <th>{t("email")}</th>
          <th>{t("action")}</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((item) => (
          <tr key={item.id} className="tableRow">
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.authUsername}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.email}</td>
            <td>
              <Dropdown
                overlay={menu(item.id)}
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
  );
};

export default UsersTableComponent;
