import MermaidDiagram from "./MermaidDiagram";
import TopbarSocialLinks from "../TopbarSocialLinks";

const sections = [
  {
    slug: "dsa",
    shortTitle: "DSA",
    title: "Data Structures & Algorithms",
    description:
      "Problem-solving patterns, core data structures, and the trade-offs behind choosing an approach.",
    focusAreas: [
      "Arrays, strings, and hashing",
      "Trees and graphs",
      "Dynamic programming",
      "Complexity and optimization",
    ],
  },
  {
    slug: "system-design",
    shortTitle: "System Design",
    title: "System Design",
    description:
      "Designing reliable, scalable systems by making constraints, architecture, and trade-offs explicit.",
    focusAreas: [
      "Requirements and capacity planning",
      "APIs and data modeling",
      "Distributed systems and caching",
      "Reliability and observability",
    ],
  },
  {
    slug: "lld",
    shortTitle: "LLD",
    title: "Low-Level Design",
    description:
      "Turning requirements into clear object models and maintainable implementations.",
    focusAreas: [
      "Domain modeling",
      "SOLID principles",
      "Design patterns",
      "Extensibility and testability",
    ],
  },
];

function LearningAndSharing({
  contentByTopic,
  topicSlug = "dsa",
  contentSlug,
  showManageButton,
}) {
  const activeSection = sections.find((section) => section.slug === topicSlug) || sections[0];
  const content = (contentByTopic[activeSection.slug] || []).filter(
    (item) => item.visible !== false
  );
  const selectedContent = contentSlug
    ? content.find((item) => item.slug === contentSlug && item.visible !== false)
    : null;

  return (
    <div className="portfolio-shell learning-sharing-page">
      <header className="site-topbar">
        <a className="site-wordmark" href="#top">Prabhat Kumar</a>
        <nav className="topbar-links" aria-label="Main navigation">
          {showManageButton && (
            <a className="article-nav-link" href="#learning-admin">Manage</a>
          )}
          <a className="article-nav-link" href="#top">Homepage</a>
          <a className="topbar-guide-link" href="#working-with-me">Working with me</a>
          <TopbarSocialLinks />
        </nav>
      </header>

      <main className="learning-sharing-content" id="top">
        <section className="content-panel learning-sharing-intro">
          <a className="article-breadcrumb" href="#top">← Homepage</a>
          <p className="section-kicker">Learn in public</p>
          <h1>Learning &amp; sharing</h1>
          <p>
            A growing collection of problem walkthroughs and design explorations.
            Each topic has its own library, so new notes can be added over time.
          </p>
        </section>

        <div className="learning-sharing-layout">
          <nav className="learning-sharing-nav content-panel" aria-label="Learning topics">
            <p className="section-kicker">Explore topics</p>
            {sections.map((section) => (
              <a
                aria-current={activeSection.slug === section.slug ? "page" : undefined}
                className={
                  activeSection.slug === section.slug
                    ? "learning-topic-link is-active"
                    : "learning-topic-link"
                }
                href={`#learning-sharing/${section.slug}`}
                key={section.slug}
              >
                {section.shortTitle}
              </a>
            ))}
          </nav>

          <section className="content-panel learning-topic-content">
            {selectedContent ? (
              <>
                <a
                  className="article-breadcrumb"
                  href={`#learning-sharing/${activeSection.slug}`}
                >
                  ← All {activeSection.shortTitle} content
                </a>
                <p className="section-kicker">{selectedContent.type}</p>
                <h2 className="learning-entry-title">{selectedContent.title}</h2>
                <p className="learning-topic-description">{selectedContent.summary}</p>
                {selectedContent.sections.map((item) => (
                  <article className="learning-entry-section" key={item.heading}>
                    <h3>{item.heading}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
                {selectedContent.codeSamples?.length > 0 && (
                  <div className="learning-code-list">
                    {selectedContent.codeSamples.map((sample) => (
                      sample.language.toLowerCase() === "mermaid" ? (
                        <MermaidDiagram
                          key={sample.title}
                          source={sample.code}
                          title={sample.title}
                        />
                      ) : (
                        <section className="learning-code-block" key={sample.title}>
                          <div>
                            <h3>{sample.title}</h3>
                            <span>{sample.language}</span>
                          </div>
                          <pre><code>{sample.code}</code></pre>
                        </section>
                      )
                    ))}
                  </div>
                )}
                {selectedContent.updatedAt && (
                  <time
                    className="learning-entry-updated"
                    dateTime={selectedContent.updatedAt}
                  >
                    Updated{" "}
                    {new Date(`${selectedContent.updatedAt.slice(0, 10)}T00:00:00`).toLocaleDateString(
                      "en",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </time>
                )}
              </>
            ) : (
              <>
                <p className="section-kicker">Learning area</p>
                <h2 id={`learning-${activeSection.slug}-title`}>{activeSection.title}</h2>
                <p className="learning-topic-description">{activeSection.description}</p>

                <div className="learning-focus-block">
                  <h3>Focus areas</h3>
                  <ul>
                    {activeSection.focusAreas.map((area) => (
                      <li key={area}>{area}</li>
                    ))}
                  </ul>
                </div>

                <div className="learning-updates">
                  <div className="learning-updates-heading">
                    <h3>Content</h3>
                    <span>
                      {content.length} {content.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                  {content.length > 0 ? (
                    <div className="learning-update-list">
                      {content.map((item) => (
                        <article className="learning-update-card" key={item.slug}>
                          <p className="article-idea-category">{item.type}</p>
                          <h4>{item.title}</h4>
                          <p>{item.summary}</p>
                          <a
                            className="article-card-link"
                            href={`#/learning/${activeSection.slug}/${item.slug}`}
                          >
                            Read more <span aria-hidden="true">↗</span>
                          </a>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <p className="learning-updates-empty">
                      Content for this area will be added here.
                    </p>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default LearningAndSharing;
