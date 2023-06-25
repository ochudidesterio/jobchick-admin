import React from "react";
import "./logo.css";
import LogoImgae from "../../assets/logo.png";
const Logo = () => {
  return (
   <>
    <div className="logoContainer" >
      <img
      className="logo-img"
        src={LogoImgae}
        alt="CompanyLogo"
        style={{width:"100%"}}
        
      />
    </div></>
  );
};

export default Logo;
