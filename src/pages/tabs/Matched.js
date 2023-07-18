import React from "react";
import { EyeOutlined } from "@ant-design/icons";

const Matched = ({ users, handleRowClick, title }) => {
  return (
    <div>
    <h5>Users who matched {title}</h5>
    <table className="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Action</th>
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
            <td colSpan={6}>No Matches</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  );
};

export default Matched;
