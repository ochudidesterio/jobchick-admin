import React from "react";
import "./profileview.css";

const ProfileView = ({user}) => {
  // Keys to exclude from the table display
  const excludeKeys = ["message", "id", "profileImage"];
  const keyLabels = {
    
    phoneNumber: "Phone Number",
    firstName: "First Name",
    lastName: "Last name",
    email: "Email",
    authUsername: "Username",
    gender: "Gender",
    proffession: "Proffession",
    age: "Age",
  };

  // Filter the user object to exclude the keys
  const filteredUser = Object.fromEntries(
    Object.entries(user).filter(([key]) => !excludeKeys.includes(key))
  );
  return (
    <table className="table">
      <tbody>
        {Object.entries(filteredUser).map(([key, value]) => (
          <tr key={key} className="tableRow">
            <td>{keyLabels[key]}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProfileView;
