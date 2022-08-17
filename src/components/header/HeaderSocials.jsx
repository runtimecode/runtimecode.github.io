import React from "react";

import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

const HeaderSocials = () => {
  return (
    <div className="header__social">
      <a href="https://linkdedin.com" target="_blank">
        <BsLinkedin />
      </a>
      <a href="https://linkdedin.com" target="_blank">
        <FaGithub />
      </a>
      <a href="https://linkdedin.com" target="_blank">
        <FaGithub />
      </a>
      <a href="https://linkdedin.com" target="_blank">
        <FaGithub />
      </a>
    </div>
  );
};

export default HeaderSocials;
