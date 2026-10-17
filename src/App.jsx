import "./App.css";

function App() {
  return (
    <main className="coming-soon-page">
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />

      <section className="hero-card">
        <p className="eyebrow">Portfolio Launch</p>
        <h1>Something exciting is coming soon.</h1>
        <p className="subtitle">
          I’m building a fresh personal portfolio with projects, ideas, and stories
          worth sharing.
        </p>

        <div className="status-row">
          <span className="status-pill">Coming Soon</span>
          <span className="status-pill muted">2026</span>
        </div>

        <div className="progress-wrap" aria-label="Launch progress">
          <div className="progress-bar">
            <span />
          </div>
        </div>

        <a className="cta-button" href="mailto:kmrprabhat@ourtlook.com">
          Get in touch
        </a>
      </section>
    </main>
  );
}

export default App;
