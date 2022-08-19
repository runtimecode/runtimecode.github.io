import React from "react";
import "./services.css";
import { BiCheck } from "react-icons/bi";

const Services = () => {
  return (
    <section id="services">
      <h5>What I offer</h5>
      <h2>Services</h2>

      <div className="container services__container">
        <article className="service">
          <div className="service__head">
            <h3>Backend Development</h3>
          </div>
          <div className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
          </div>
        </article>

        <article className="service">
          <div className="service__head">
            <h3>Web Development</h3>
          </div>
          <div className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
          </div>
        </article>

        <article className="service">
          <div className="service__head">
            <h3>Backend Development</h3>
          </div>
          <div className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Lorem, Ipsem dolor sit amet consetetur elit....</p>
            </li>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Services;
