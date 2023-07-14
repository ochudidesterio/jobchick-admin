import React from "react";
import "./footer.css"
const Footer = () => {
  return (
    <div className="footer">
    <hr />
      <p>{`Powered by Deslabs © Copy Write 2018 - ${new Date().getFullYear()}`}</p>
    </div>
  );
};

export default Footer;
