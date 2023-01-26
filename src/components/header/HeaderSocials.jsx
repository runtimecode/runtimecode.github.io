import React from "react";

import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

import CV from "../../assets/Prabhat_Kumar_12_Years_dev.pdf";

const HeaderSocials = () => {
  return (
    <div className="header__social">
      <a href="https://github.com/runtimecode" target="_blank">
        <FaGithub />
      </a>
      <a href="https://www.linkedin.com/in/kmrprabhat/" target="_blank">
        <BsLinkedin />
      </a>
      <a href={CV} download>
        <BsFillFileEarmarkPdfFill />
      </a>
    </div>
  );
};

export default HeaderSocials;
