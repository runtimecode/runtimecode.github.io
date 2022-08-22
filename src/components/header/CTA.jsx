import React from "react";
import CV from "../../assets/Prabhat_Kumar_10_Years_dev.pdf";

const CTA = () => {
  return (
    <div className="cta">
      <a
        href="https://runtimecode.github.io/resume/"
        className="btn"
        target="_blank"
      >
        Resume
      </a>
      <a href={CV} className="btn btn-primary" download>
        Download CV
      </a>
    </div>
  );
};

export default CTA;
