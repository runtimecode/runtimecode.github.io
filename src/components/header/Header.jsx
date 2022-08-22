import React from "react";
import "./header.css";
import CTA from "./CTA";

import ME from "./../../assets/1.png";
import HeaderSocials from "./HeaderSocials";

const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <h5>Hi, my name is</h5>
        <h1>Prabhat Kumar</h1>
        <h5 className="text-light">FullStack Developer</h5>
        <CTA />
        <HeaderSocials />
        <img src={ME} alt="Profile Picture" className="me" />
      </div>
    </header>
  );
};

export default Header;
