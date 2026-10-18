import { useEffect, useState } from "react";
import "./App.css";
import WorkingWithMe from "./WorkingWithMe";

const experience = [
  {
    company: "Autodesk Inc",
    role: "Manager, Software Development",
    product: "Fusion 360",
    period: "Jan 2024 - Present",
    description:
      "Design and engineering software serving architecture, construction, manufacturing, media, education, and entertainment industries.",
    highlights: [
      "Lead a 21-member team building products and services for more than 2M monthly active users.",
      "Architect and deliver cloud-native backend services and enterprise apps with Java, Spring Boot, React, and Angular.",
      "Drive delivery from architecture through production, mentoring engineers and staying hands-on with reviews, debugging, and implementation.",
      "Partner with product and global engineering teams to shape the roadmap and platform direction.",
    ],
  },
  {
    company: "Amazon Inc",
    role: "Software Development Engineer",
    product: "Buy with Prime / Multi-Channel Fulfillment",
    period: "Sep 2022 - Jan 2024",
    description:
      "Multi-Channel Fulfillment extends Amazon's fulfillment network to orders placed on other sales channels, with trackable delivery from fulfillment center to customer.",
    highlights: [
      "Designed the customer notification platform for Multi-Channel Fulfillment.",
      "Built scalable backend services in Node.js and Java, plus Angular interfaces for supply-chain workflows.",
      "Developed APIs for fulfillment events across large-scale distributed systems.",
      "Improved customer data pipelines and operational visibility with distributed engineering teams.",
    ],
  },
  {
    company: "Adobe Systems India Inc",
    role: "Computer Scientist",
    product: "Internationalization and Localization",
    period: "Oct 2017 - Sep 2022",
    description:
      "Internationalization prepares applications for different languages and regions; localization adapts them to each market.",
    highlights: [
      "Built the Adobe Localization Framework in Node.js and AngularJS, automating translation workflows across dozens of languages.",
      "Reduced localization cycle time by 40% and standardized workflows across product lines.",
      "Automated help-document translation from Markdown to improve documentation turnaround.",
      "Partnered with research teams on NLP-based translation quality evaluation, bringing AI into localization pipelines.",
    ],
  },
  {
    company: "Times Internet Ltd (Times of India Group)",
    role: "Manager, Level I",
    product: "Colombia",
    period: "Jun 2016 - Oct 2017",
    description:
      "Real-time marketing platform matching offers to digital audiences across Times Internet properties and partner publishers, processing billions of requests daily and reaching nearly 200M users monthly.",
    highlights: [
      "Developed a self-service portal for the ad-serving platform.",
      "Created multiple ad formats to optimize and improve ad consumption.",
    ],
  },
  {
    company: "SSN Logistics Pvt Ltd (Delhivery)",
    role: "Senior Associate, Technology",
    product: "LMAP (Last Mile as a Product)",
    period: "Nov 2015 - Jun 2016",
    description:
      "Developed a web app for LMAP, separating last-mile workflows into a product to improve performance and reduce risk.",
    highlights: [
      "Designed logistics workflows for last-mile package delivery.",
      "Integrated multiple carrier services and built scalable backend services.",
      "Optimized routing and package tracking for high-volume shipment processing.",
    ],
  },
  {
    company: "Wipro Technologies Ltd",
    role: "Senior Software Engineer",
    product: "InSite",
    period: "Apr 2011 - Nov 2015",
    description:
      "Real-time data management for collecting, transmitting, replicating, and managing drilling and rig-site data.",
    highlights: [
      "Developed the next-generation InSite platform and the first prototype of the InSite Anywhere web product.",
    ],
  },
];

const skills = [
  "Java",
  "Python",
  "Node.js",
  "TypeScript",
  "React",
  "Angular",
  "Spring Boot",
  "Express",
  "AWS",
  "Azure",
  "Redis",
  "MySQL",
  "MongoDB",
  "DynamoDB",
  "AI-assisted development",
  "MCP",
  "Enterprise SaaS",
  "Distributed Systems",
];

function App() {
  const [expandedExperiences, setExpandedExperiences] = useState({});
  const [showWorkingWithMe, setShowWorkingWithMe] = useState(
    window.location.hash === "#working-with-me"
  );

  useEffect(() => {
    const updatePage = () => {
      setShowWorkingWithMe(window.location.hash === "#working-with-me");
    };

    window.addEventListener("hashchange", updatePage);
    return () => window.removeEventListener("hashchange", updatePage);
  }, []);

  if (showWorkingWithMe) {
    return <WorkingWithMe />;
  }

  return (
    <div className="portfolio-shell">
      <header className="site-topbar">
        <a className="site-wordmark" href="#top">Prabhat Kumar</a>
        <nav className="topbar-links" aria-label="Main navigation">
          <a className="topbar-guide-link" href="#working-with-me">Working with me</a>
          <a className="topbar-contact" href="mailto:kmrprabhat@outlook.com">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <div className="portfolio-layout" id="top">
        <aside className="profile-column" aria-label="Profile">
          <section className="profile-panel">
            <div className="profile-content">
              <img
                className="profile-illustration"
                src="/profile-illustration.png"
                alt="Illustration of a bearded developer working at a laptop"
              />
              <p className="section-kicker">About me</p>
              <h1>Prabhat Kumar</h1>
              <p className="profile-role">Manager Software Engineering</p>
              <p className="profile-summary">
                Senior software engineering leader with 16+ years of experience
                delivering enterprise SaaS platforms across Autodesk, Amazon, Adobe,
                Times Internet, Delhivery, and Wipro.
              </p>
              <div className="profile-details">
                <p>Leading teams and building cloud-native products</p>
                <p>Experience across 2M+ monthly active users</p>
              </div>
            </div>
            <div className="profile-actions">
              <a className="profile-primary-link" href="mailto:kmrprabhat@outlook.com">
                Email me <span aria-hidden="true">↗</span>
              </a>
              <a className="profile-secondary-link" href="#experience">
                Explore experience
              </a>
            </div>
          </section>
        </aside>

        <main className="main-column">
          <section id="experience" className="content-panel">
            <div className="panel-heading">
              <div>
                <p className="section-kicker">Career</p>
                <h2>Experience</h2>
              </div>
            </div>

            <div className="experience-list" id="experience-list">
              {experience.map((item, index) => {
                const isExpanded = Boolean(expandedExperiences[item.company]);
                const highlightsId = `experience-highlights-${index}`;

                return (
                  <article key={item.company} className="experience-entry">
                    <p className="experience-period">{item.period}</p>
                    <div className="experience-detail">
                      <div className="experience-title-row">
                        <h3>{item.role}</h3>
                        <button
                          className="show-more-button experience-toggle"
                          type="button"
                          aria-expanded={isExpanded}
                          aria-controls={highlightsId}
                          onClick={() =>
                            setExpandedExperiences((previous) => ({
                              ...previous,
                              [item.company]: !previous[item.company],
                            }))
                          }
                        >
                          {isExpanded ? "Show less" : "Show more"}
                        </button>
                      </div>
                      <p className="experience-company">
                        {item.company} <span>{item.product}</span>
                      </p>
                      <p className="experience-summary">{item.description}</p>
                      <ul
                        className="experience-highlights"
                        id={highlightsId}
                        hidden={!isExpanded}
                      >
                        {item.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="skills" className="content-panel">
            <div className="panel-heading">
              <div>
                <p className="section-kicker">Toolbox</p>
                <h2>Skills &amp; capabilities</h2>
              </div>
            </div>
            <div className="skill-list">
              {skills.map((skill) => (
                <span key={skill} className="skill-item">{skill}</span>
              ))}
            </div>
          </section>

          <section className="content-panel education-panel">
            <div className="panel-heading">
              <div>
                <p className="section-kicker">Background</p>
                <h2>Education</h2>
              </div>
            </div>
            <div className="education-list">
              <article className="education-entry">
                <h3>Bachelor of Engineering</h3>
                <p>Electronics and Communication</p>
                <span>Birla Institute of Technology, Mesra (Ranchi)</span>
              </article>
              <article className="education-entry">
                <h3>Senior Secondary</h3>
                <p>Science + Mathematics</p>
                <span>Shri Mahaveer Digambar Jain, Jaipur</span>
              </article>
            </div>
          </section>

          <footer id="contact" className="contact-panel">
            <p className="section-kicker">Contact</p>
            <h2>Have a good challenge in mind?</h2>
            <a href="mailto:kmrprabhat@outlook.com">
              kmrprabhat@outlook.com <span aria-hidden="true">↗</span>
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
