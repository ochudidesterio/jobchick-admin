import React from "react";
import "./profileview.css";
import { useTranslation } from 'react-i18next';


const ProfileView = ({ user }) => {
  // Keys to exclude from the table display
  const {t} = useTranslation()

  const excludeKeys = ["message", "id", "profileImage", "role","showProfile","cvUrl"];
  const keyLabels = {
    phoneNumber: t('phonenumber'),
    firstName: t('firstname'),
    lastName: t('lastname'),
    email: t('email'),
    authUsername: t('username'),
    gender: t('gender'),
    proffession: t('proffesion'),
    age: t('age'),
    education: t('educationlevel'),
    skills: t('skills'),
    languages: t('languages'),
    bio:t('biography'),
    location:t('from'),
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
