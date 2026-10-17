import "./App.css";

const experience = [
  {
    company: "Autodesk Inc",
    role: "Manager, Software Development",
    period: "Jan 2024 - Present",
    highlight:
      "Leading product and platform engineering for Fusion 360, overseeing multiple teams and cloud-native service delivery for 2M+ monthly active users.",
  },
  {
    company: "Amazon Inc",
    role: "SDE, Buy with Prime",
    period: "Sep 2022 - Jan 2024",
    highlight:
      "Built customer notification and fulfillment workflows for commerce-scale infrastructure, improving operational visibility and distributed system performance.",
  },
  {
    company: "Adobe Systems India Inc",
    role: "Computer Scientist, Internationalization",
    period: "Oct 2017 - Sep 2022",
    highlight:
      "Created automation for localization workflows and introduced AI-assisted translation and quality improvements across global product lines.",
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
  return (
    <div className="portfolio-shell">
      <header className="site-topbar">
        <a className="site-wordmark" href="#top">Prabhat Kumar</a>
        <a className="topbar-contact" href="mailto:kmrprabhat@outlook.com">
          Get in touch <span aria-hidden="true">↗</span>
        </a>
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
              <p className="profile-role">Senior software engineering leader</p>
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
              <span className="panel-index">01</span>
            </div>

            <div className="experience-list">
              {experience.map((item, index) => (
                <article key={item.company} className="experience-entry">
                  <p className="experience-period">{item.period}</p>
                  <div className="experience-detail">
                    <span className="experience-marker" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{item.role}</h3>
                    <p className="experience-company">{item.company}</p>
                    <p className="experience-summary">{item.highlight}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="skills" className="content-panel">
            <div className="panel-heading">
              <div>
                <p className="section-kicker">Toolbox</p>
                <h2>Skills &amp; capabilities</h2>
              </div>
              <span className="panel-index">02</span>
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
              <span className="panel-index">03</span>
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
