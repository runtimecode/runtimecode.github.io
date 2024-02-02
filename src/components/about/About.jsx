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
              <small>13+ Years of experience</small>
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
          I have 13 years of experience in software development, I bring a comprehensive understanding of engineering and software development. My expertise lies in designing, developing, and maintaining high-performance product systems, subsystems and teams at scale. I am leading a cross-functional team. I excel in meeting strict deadlines and achieving engineering and organizational goals efficiently. Presently, I am employed at Autodesk Inc. leading a team of 7 highly skilled engineers.
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
