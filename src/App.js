import React, { useState,useEffect } from "react";
import Login from "./Login";
import Main from "./Main";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getIsLoggedIn, setIsLoggedIn } from "./redux/slices/UsersSlice";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import "./App.css";
import Footer from "./Footer.js";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageSelector from "./language/LangaugeSelector";
import enTranslation from "./language/english.json";
import heTranslation from "./language/hebrew.json";
import { resetUsers } from "./redux/slices/UsersSlice";
import { resetTypes } from "./redux/slices/TypesSlice";
import { resetRegions } from "./redux/slices/RegionSlice";
import { resetPackages } from "./redux/slices/PremiumSlice";
import { resetJobs } from "./redux/slices/JobsSlice";
import { resetCompanies } from "./redux/slices/CompaniesSlice";
import { resetCategories } from "./redux/slices/CategorySlice";
import { useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const navigate = useNavigate()

  const handleLogin = () => {
    // Perform login logic
    dispatch(setIsLoggedIn(true));
  };

  const handleLogout = () => {
    // Perform logout logic
    dispatch(setIsLoggedIn(false));
    dispatch(resetUsers())
    dispatch(resetTypes())
    dispatch(resetRegions())
    dispatch(resetPackages())
    dispatch(resetJobs())
    dispatch(resetCompanies())
    dispatch(resetCategories())
    navigate("/")
  };

  const [language, setLanguage] = useState("en");
  const changeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  useEffect(() => {
    console.log(language); // Log the updated language
    i18n.changeLanguage(language); // Update the i18n language
  }, [language]);
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: enTranslation },
      he: { translation: heTranslation },
    },
    lng: "he", // Default language
    fallbackLng: "he",
    interpolation: {
      escapeValue: false,
    },
  });

  return (
    // <div>
    //   {isLoggedIn ? (
    //     <>
    //       <LanguageSelector changeLanguage={changeLanguage} />
    //       <Main onLogout={handleLogout} />
    //       <Footer />
    //     </>
    //   ) : (
    //     <>
    //       <LanguageSelector changeLanguage={changeLanguage} />
    //       <Login onLogin={handleLogin} i18bn={i18n} />
    //     </>
    //   )}
    // </div>

    <div className="app-container">
      <LanguageSelector changeLanguage={changeLanguage} className="floating-button" />
      <div className="content-container">
        {isLoggedIn ? (
          <Main onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin}  />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default App;

