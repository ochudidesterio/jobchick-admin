import React from 'react'
import { EllipsisOutlined } from "@ant-design/icons";
import {  Dropdown } from "antd";



const Elipsis = ({menu}) => {
  return (
//     <EllipsisOutlined
//     style={{
//       fontSize: "24px",
//       color: "#696969",
//       transition: "color 0.3s",
//     }}
//     onMouseEnter={(e) => {
//       e.target.style.color = "#179CBD";
//     }}
//     onMouseLeave={(e) => {
//       e.target.style.color = "#696969";
//     }}
//   />

<Dropdown
                overlay={menu}
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
  )
}

export default Elipsis