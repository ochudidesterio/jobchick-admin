// import React from 'react';

// function LanguageSelector({ changeLanguage }) {
//   return (
//     <div>
//       <button onClick={() => changeLanguage('en')}>English</button>
//       <button onClick={() => changeLanguage('he')}>עברית</button>
//     </div>
//   );
// }

// export default LanguageSelector;

import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./language.css"

const LanguageSelector = ({ changeLanguage }) => {
  const { i18n } = useTranslation();

  // State to track the selected language
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguageAndSetSelected = (lang) => {
    setSelectedLanguage(lang);
    changeLanguage(lang);
  };

  const languageOptions = ["en", "he"]; // Define your language options

  return (
    <div className="language-selector">
      {languageOptions.map((lang) => (
        <div
          key={lang}
          className={`language-option ${selectedLanguage === lang ? "active" : ""}`}
          onClick={() => changeLanguageAndSetSelected(lang)}
        >
          {lang === "en" ? "English" : "Hebrew"}
        </div>
      ))}
    </div>
  );
};

export default LanguageSelector;

