import { useEffect } from "react";

function getReadingTime(article) {
  const text = article.sections
    .flatMap((section) => [...section.paragraphs, ...(section.bullets || [])])
    .join(" ");
  const wordCount = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(wordCount / 220))} min read`;
}

function ArticlePage({ article, articles }) {
  useEffect(() => {
    const previousTitle = document.title;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionMeta?.content;

    if (article) {
      document.title = `${article.title} | Prabhat Kumar`;
      if (descriptionMeta) {
        descriptionMeta.content = article.summary;
      }
    } else {
      document.title = "Article not found | Prabhat Kumar";
    }

    return () => {
      document.title = previousTitle;
      if (descriptionMeta && previousDescription !== undefined) {
        descriptionMeta.content = previousDescription;
      }
    };
  }, [article]);

  if (!article) {
    return (
      <div className="portfolio-shell article-page">
        <header className="site-topbar">
          <a className="site-wordmark" href="#top">Prabhat Kumar</a>
          <a className="article-nav-link" href="#top">Back to homepage</a>
        </header>
        <main className="article-not-found content-panel">
          <p className="section-kicker">Writing</p>
          <h1>Article not found</h1>
          <p>This article may have moved or the link may be incorrect.</p>
          <a className="profile-primary-link" href="#top">Back to homepage</a>
        </main>
      </div>
    );
  }

  const articleIndex = articles.findIndex((item) => item.slug === article.slug);
  const relatedArticles = [articles[(articleIndex + 1) % articles.length], articles[(articleIndex + 2) % articles.length]];

  return (
    <div className="portfolio-shell article-page">
      <header className="site-topbar">
        <a className="site-wordmark" href="#top">Prabhat Kumar</a>
        <nav className="topbar-links" aria-label="Main navigation">
          <a className="article-nav-link" href="#articles">All articles</a>
          <a className="topbar-guide-link" href="#working-with-me">Working with me</a>
          <a className="topbar-contact" href="mailto:kmrprabhat@outlook.com">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main className="article-layout">
        <article className="article-main">
          <header className="article-header content-panel">
            <a className="article-breadcrumb" href="#articles">
              ← All articles
            </a>
            <p className="article-category">{article.category}</p>
            <h1>{article.title}</h1>
            <p className="article-deck">{article.summary}</p>
            <div className="article-byline">
              <span>By Prabhat Kumar</span>
              <span aria-hidden="true">·</span>
              <span>Published</span>
              <span aria-hidden="true">·</span>
              <span>{getReadingTime(article)}</span>
            </div>
          </header>

          <nav className="article-mobile-toc content-panel" aria-label="Article contents">
            <h2>In this article</h2>
            <ol>
              {article.sections.map((section, index) => (
                <li key={section.heading}>
                  <a
                    href={`#article-section-${index}`}
                    onClick={(event) => {
                      event.preventDefault();
                      document
                        .getElementById(`article-section-${index}`)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#article-takeaways"
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById("article-takeaways")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  Key takeaways
                </a>
              </li>
            </ol>
          </nav>

          <div className="article-body content-panel">
            {article.sections.map((section, index) => (
              <section
                className="article-section"
                id={`article-section-${index}`}
                key={section.heading}
              >
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="article-takeaways" id="article-takeaways">
              <h2>Key takeaways</h2>
              <ul>
                {article.takeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ul>
            </section>
            <p className="article-draft-note">
              The examples and recommendations are intended as a starting point
              for discussion and should be adapted to each system and team.
            </p>
          </div>

          <section className="related-articles content-panel">
            <div className="panel-heading">
              <div>
                <p className="section-kicker">Keep reading</p>
                <h2>Related articles</h2>
              </div>
            </div>
            <div className="related-article-list">
              {relatedArticles.map((related) => (
                <a
                  className="related-article-link"
                  href={`#/articles/${related.slug}`}
                  key={related.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{related.category}</span>
                  <strong>{related.title}</strong>
                  <span aria-hidden="true">Read article ↗</span>
                </a>
              ))}
            </div>
          </section>

          <footer className="article-footer">
            <a className="profile-secondary-link" href="#articles">
              Browse all articles
            </a>
            <a href="#top">Back to homepage</a>
          </footer>
        </article>

        <aside className="article-toc content-panel" aria-label="Article contents">
          <p className="section-kicker">On this page</p>
          <ol>
            {article.sections.map((section, index) => (
              <li key={section.heading}>
                <a
                  href={`#article-section-${index}`}
                  onClick={(event) => {
                    event.preventDefault();
                    document
                      .getElementById(`article-section-${index}`)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {section.heading}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#article-takeaways"
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById("article-takeaways")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Key takeaways
              </a>
            </li>
          </ol>
        </aside>
      </main>
    </div>
  );
}

export default ArticlePage;
