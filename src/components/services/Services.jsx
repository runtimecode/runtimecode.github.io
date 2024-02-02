import React from "react";
import "./services.css";
import { BiCheck } from "react-icons/bi";

const Services = () => {
  return (
    <section id="experience">
      <h5>Where I’ve Worked</h5>
      <h2>My Experiences</h2>

      <div className="container services__container">

      <article className="service">
          <div className="service__head">
            <h3>Autodesk Inc.</h3>
            <h5>Principal Engineer | January 2024 - Present</h5>
          </div>

          <div className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>
              Leading Software products and services for the architecture, engineering, construction, manufacturing, me-dia, education, and entertainment industries
              </p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Re-Architecting from monolith design to microservices
              </p>
            </li>
          </div>
        </article>

      <article className="service">
          <div className="service__head">
            <h3>Amazon Inc.</h3>
            <h5>SDE | September 2022 - January 2024</h5>
          </div>

          <div className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>
              Developing next generation end to end customer notifications for the Supply chain portal (SCP)
              </p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>
              Implementating datahandling solutions to the customer data
              </p>
            </li>
          </div>
        </article>


        <article className="service">
          <div className="service__head">
            <h3>Adobe Systems Inc.</h3>
            <h5>Computer Scientist | October 2017 - September 2022</h5>
          </div>

          <div className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Developed new Adobe localization Framework toolkit to translate
                all Adobe Products
              </p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Developed system for automated translation of help documents
                using markdown
              </p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Developed end to end Lingustic Testing workflow and tool, All
                the Adobe Products are tested with this tool only
              </p>
            </li>
          </div>
        </article>

        <article className="service">
          <div className="service__head">
            <h3>Times Internet Ltd (Times of India Group)</h3>
            <h5>Manager Level II | June 2016 to October 2017</h5>
          </div>
          <div className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Developed self-service portal for ad serving platform.</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Developed several Ad serving streatagies</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Worked on user personalization and prefrence optimization
                (Content Personalization Engine)
              </p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Worked on billing and revenue Automation (Expresso) system to
                identify cost for advertisers
              </p>
            </li>
          </div>
        </article>

        <article className="service">
          <div className="service__head">
            <h3>SSN Logistics Pvt Ltd. (Delhivery)</h3>
            <h5>Senior Associate Technology | Nov 2015 to June 2016</h5>
          </div>
          <div className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Developed webapp & Android App for LMAP(Last Mile As Product).
              </p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Rolled out to 500+ centers and supported roll out operations.
              </p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Handled half a million packages data and reliably initegarted
                with third party service providers.
              </p>
            </li>
          </div>
        </article>

        <article className="service">
          <div className="service__head">
            <h3>Wipro Technologies Ltd.</h3>
            <h5>Sr. Software Engineer | April 2011 — November 2015</h5>
          </div>
          <div className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Developed NexGen Insite platform</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Developed first prototype of Insite Anywhere web Product</p>
            </li>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Services;
