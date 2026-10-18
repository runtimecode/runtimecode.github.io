function ArticleArchive({ articles, showArticleAdmin }) {
  return (
    <div className="portfolio-shell article-archive-page">
      <header className="site-topbar">
        <a className="site-wordmark" href="#top">Prabhat Kumar</a>
        <nav className="topbar-links" aria-label="Main navigation">
          <a className="article-nav-link" href="#top">Homepage</a>
          <a className="topbar-guide-link" href="#working-with-me">Working with me</a>
          <a className="topbar-contact" href="mailto:kmrprabhat@outlook.com">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main className="article-archive-content">
        <section className="article-archive-intro content-panel">
          <a className="article-breadcrumb" href="#top">← Homepage</a>
          <p className="section-kicker">Writing</p>
          <h1>All articles</h1>
          <p>
            System design, AI, localization, and engineering leadership.
            Browse the complete collection of articles.
          </p>
          <span className="article-archive-count">
            {articles.length} {articles.length === 1 ? "article" : "articles"}
          </span>
        </section>

        {articles.length > 0 ? (
          <section className="article-archive-list" aria-label="All articles">
            {articles.map((article) => (
              <article className="article-archive-card content-panel" key={article.slug}>
                <p className="article-idea-category">{article.category}</p>
                <h2>
                  <a
                    href={`#/articles/${article.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </h2>
                <p className="article-archive-summary">{article.summary}</p>
                <a
                  className="article-card-link"
                  href={`#/articles/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </section>
        ) : (
          <section className="content-panel article-archive-empty">
            <h2>No published articles yet</h2>
            <p>Published articles will appear here.</p>
          </section>
        )}

        <footer className="article-archive-footer">
          {showArticleAdmin && (
            <a className="profile-secondary-link" href="#article-admin">
              Manage articles
            </a>
          )}
          <a href="#top">Back to homepage</a>
        </footer>
      </main>
    </div>
  );
}

export default ArticleArchive;
