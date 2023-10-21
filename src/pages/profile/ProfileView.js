import React from "react";
import "./profileview.css";

const ProfileView = ({ user }) => {
  // Keys to exclude from the table display
  const excludeKeys = ["message", "id", "profileImage", "role","showProfile","cvUrl"];
  const keyLabels = {
    phoneNumber: "Phone Number",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    authUsername: "Username",
    gender: "Gender",
    proffession: "Profession",
    age: "Age",
    education: "Education Level",
    skills: "Skills",
    languages: "Languages",
    bio:"Biography",
    location:"From",
  };

  // Filter the user object to exclude the keys
  const filteredUser = Object.fromEntries(
    Object.entries(user).filter(([key]) => !excludeKeys.includes(key))
  );

  return (
    <table dir="rtl" className="table">
      <tbody>
        {Object.entries(filteredUser).map(([key, value]) => (
          <tr key={key} className="tableRow">
            <td>{keyLabels[key]}</td>
            <td>
              {Array.isArray(value) ? (
                <ul className="borderList">
                  {value.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                value
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProfileView;
