import React from "react";
import "./contact.css";
import { MdOutlineEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { FaMobileAlt } from "react-icons/fa";
import { BsFileEarmarkPdf } from "react-icons/bs";

const Contact = () => {
  return (
    <section id="contact">
      <h5>Get in touch</h5>
      <h2>Contact me</h2>

      <div className="container contact__cotainer">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail />
            <h4>Email</h4>
            <h5>kmrprabhat@gmail.com</h5>
            <a href="mailto:kmrprabhat@gmail.com@gmail.com">Send a mail</a>
          </article>

          <article className="contact__option">
            <FaMobileAlt />
            <h4>Mobile</h4>
            <h5>+91-7827320278</h5>
            Call
          </article>

          <article className="contact__option">
            <BsWhatsapp />
            <h4>WhatsApp</h4>
            <h5>+91-7827320278</h5>
            <a href="https://wa.me/917827320278">Send a message</a>
          </article>

          {/* <article className="contact__option">
            <BsFileEarmarkPdf />
            <h4>Resume</h4>
            <h5>PDF Resume</h5>
            <a href="https://wa.me/917827320278">Download</a>
          </article> */}
        </div>

        {/* <form action="">
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
          />

          <input type="email" name="email" placeholder="your email" required />
          <textarea
            name="message"
            rows="7"
            placeholder="Your message"
            required
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() =>
              alert(
                "This service is temporarily down, Please use other methods"
              )
            }
          >
            Send Message
          </button>
        </form> */}
      </div>
    </section>
  );
};

export default Contact;
