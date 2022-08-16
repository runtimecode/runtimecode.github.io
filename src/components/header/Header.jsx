import React from "react";
import "./header.css";
import CTA from "./CTA";

import ME from "./../../assets/Profile.JPG";

const Header = () => {
  return (
    <header>
      <div className="container header_container">
        <h5>Hello I'm</h5>
        <h1>Prabhat Kumar</h1>
        <h5 className="text-light">FullStack Developer</h5>
        <CTA />
        <img src={ME} alt="Profile Picture" />
      </div>
    </header>
  );
};

export default Header;
