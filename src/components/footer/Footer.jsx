import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <a href="#" className="footer__logo">
        Prabhat Kumar
      </a>

      {/* <ul className="permalinks">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Home</a>
        </li>
      </ul> */}
      {/* 
      <div className="footer__socials">
        <a href="">Facebook</a>
        <a href="">Facebook</a>
        <a href="">Facebook</a>
        <a href="">Facebook</a>
      </div> */}

      <div className="footer__copyright">
        <small>
          &copy; Prabhat Kumar | Principal Engineer | Autodesk inc.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
