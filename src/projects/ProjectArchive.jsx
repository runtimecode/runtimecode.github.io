import TopbarSocialLinks from "../TopbarSocialLinks";

function ProjectArchive({ projects }) {
  return (
    <div className="portfolio-shell project-archive-page">
      <header className="site-topbar">
        <a className="site-wordmark" href="#top">Prabhat Kumar</a>
        <nav className="topbar-links" aria-label="Main navigation">
          <a className="article-nav-link" href="#top">Homepage</a>
          <a className="topbar-guide-link" href="#working-with-me">Working with me</a>
          <TopbarSocialLinks />
        </nav>
      </header>

      <main className="project-archive-content">
        <section className="project-archive-intro content-panel">
          <a className="article-breadcrumb" href="#top">← Homepage</a>
          <p className="section-kicker">Experiments &amp; play</p>
          <h1>All fun projects</h1>
          <p>
            Small interactive projects to explore ideas, experiment with code,
            and have a little fun.
          </p>
          <span className="article-archive-count">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </span>
        </section>

        {projects.length > 0 ? (
          <section className="project-archive-list" aria-label="All fun projects">
            {projects.map((project) => (
              <article className="project-archive-card content-panel" key={project.slug}>
                <p className="article-idea-category">{project.category}</p>
                <h2>
                  <a
                    href={`#/projects/${project.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                  </a>
                </h2>
                <p>{project.summary}</p>
                {project.updatedAt && (
                  <time dateTime={project.updatedAt}>
                    Updated{" "}
                    {new Date(`${project.updatedAt}T00:00:00`).toLocaleDateString(
                      undefined,
                      { year: "numeric", month: "short", day: "numeric" }
                    )}
                  </time>
                )}
                <a
                  className="article-card-link"
                  href={`#/projects/${project.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open project <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </section>
        ) : (
          <section className="content-panel article-archive-empty">
            <h2>More projects coming soon</h2>
            <p>Fun projects will appear here as they are added.</p>
          </section>
        )}

        <footer className="article-archive-footer">
          <a href="#top">Back to homepage</a>
        </footer>
      </main>
    </div>
  );
}

export default ProjectArchive;
