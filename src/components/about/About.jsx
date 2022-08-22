import React from "react";
import "./about.css";
import aboutImage from "../../assets/5.jpg";
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";

const About = () => {
  return (
    <section id="about">
      <h5>Get to Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={aboutImage} alt="About Image" />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>11+ Years of experience</small>
            </article>
            <article className="about__card">
              <FiUsers className="about__icon" />
              <h5>Architect</h5>
              <small>7+ Years of experience</small>
            </article>
            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Lead</h5>
              <small>15+ highly skilled member team</small>
            </article>
          </div>
          <p>
            Software developer with 11+ years of experience and broad knowledge
            of engineering and software technology. In-depth knowledge of
            design, development, and sustenance of product systems and
            subsystems. Strictly adhered to time schedules and successfully
            accomplished engineering and organizational mission. Currently
            working as a Computer Scientist at Adobe Systems Inc.
          </p>

          <a href="#contact" className="btn btn-primary">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
