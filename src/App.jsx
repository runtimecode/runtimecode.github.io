import "./App.css";

const experience = [
  {
    company: "Autodesk Inc",
    role: "Manager, Software Development",
    period: "January 2024 - Present",
    highlight:
      "Leading multiple engineering teams for Fusion 360 with 2M+ monthly active users and driving architecture, delivery, and mentoring across distributed platform services.",
  },
  {
    company: "Amazon Inc",
    role: "SDE, Buy with Prime",
    period: "September 2022 - January 2024",
    highlight:
      "Built customer notification and fulfillment workflows for large-scale commerce infrastructure, supporting distributed systems and operational visibility at scale.",
  },
  {
    company: "Adobe Systems India Inc",
    role: "Computer Scientist, Internationalization",
    period: "October 2017 - September 2022",
    highlight:
      "Created the Adobe Localization Framework, reduced localization cycle time by 40%, and introduced AI-assisted workflows to improve automation and translation quality.",
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
      <header className="topbar">
        <div className="brand">Prabhat Kumar</div>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="page">
        <section className="hero section-card">
          <div className="hero-copy">
            <p className="eyebrow">Engineering Leader | Full Stack Architect</p>
            <h1>Building scalable products for modern digital businesses.</h1>
            <p className="lead">
              Senior software engineering leader with 16+ years of experience
              designing and delivering enterprise SaaS platforms across Autodesk,
              Amazon, Adobe, Times Internet, Delhivery, and Wipro.
            </p>

            <div className="hero-actions">
              <a className="primary-btn" href="mailto:kmrprabhat@outlook.com">
                Email me
              </a>
              <a className="secondary-btn" href="#experience">
                View experience
              </a>
            </div>

            <ul className="mini-stats" aria-label="Professional summary">
              <li>
                <strong>16+</strong>
                <span>Years experience</span>
              </li>
              <li>
                <strong>2M+</strong>
                <span>Users managed</span>
              </li>
              <li>
                <strong>8</strong>
                <span>Industry domains</span>
              </li>
            </ul>
          </div>

          <aside className="hero-panel">
            <div className="panel-badge">Currently</div>
            <h2>Manager, Software Development</h2>
            <p>Autodesk Fusion 360</p>
            <div className="panel-list">
              <span>Cloud-native architecture</span>
              <span>Product strategy</span>
              <span>AI-assisted delivery</span>
              <span>Platform leadership</span>
            </div>
          </aside>
        </section>

        <section id="about" className="about section-card">
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>Technology leader focused on scale, product quality, and execution.</h2>
          </div>
          <p>
            I lead engineering teams and build cloud-native systems that balance
            product ambition with operational reliability. My work spans backend,
            frontend, APIs, distributed systems, localization, and AI-assisted
            product development.
          </p>
        </section>

        <section id="experience" className="experience section-card">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Career highlights</h2>
          </div>

          <div className="timeline">
            {experience.map((item) => (
              <article key={item.company} className="timeline-item">
                <div className="timeline-dot" aria-hidden="true" />
                <div className="timeline-content">
                  <div className="timeline-topline">
                    <h3>{item.role}</h3>
                    <span>{item.period}</span>
                  </div>
                  <p className="company-name">{item.company}</p>
                  <p>{item.highlight}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="skills section-card">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Capabilities</h2>
          </div>

          <div className="chip-grid">
            {skills.map((skill) => (
              <span key={skill} className="chip">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="education section-card">
          <div className="section-heading">
            <p className="eyebrow">Education</p>
            <h2>Academic background</h2>
          </div>

          <div className="education-grid">
            <div>
              <h3>Bachelor of Engineering</h3>
              <p>Electronics and Communication</p>
              <p>Birla Institute of Technology, Mesra (Ranchi)</p>
            </div>
            <div>
              <h3>Senior Secondary</h3>
              <p>Science + Mathematics</p>
              <p>Shri Mahaveer Digambar Jain, Jaipur</p>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="footer section-card">
        <p className="eyebrow">Contact</p>
        <h2>Let’s build something meaningful.</h2>
        <a href="mailto:kmrprabhat@outlook.com">kmrprabhat@outlook.com</a>
      </footer>
    </div>
  );
}

export default App;
