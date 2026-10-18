import { useMemo, useState } from "react";
import TopbarSocialLinks from "../TopbarSocialLinks";
import { createArticleModule } from "./articleStorage";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createEmptyArticle() {
  return {
    slug: "",
    category: "",
    title: "",
    summary: "",
    sections: [{ heading: "", paragraphs: [""] }],
    takeaways: [""],
    visible: false,
  };
}

function toEditorArticle(article) {
  return {
    ...article,
    sections: article.sections.map((section) => ({
      heading: section.heading,
      paragraphs: section.paragraphs,
    })),
    takeaways: article.takeaways || [""],
    visible: article.visible !== false,
  };
}

function ArticleAdmin({ articles, overrides, onSave, storageError }) {
  const [editingSlug, setEditingSlug] = useState(null);
  const [form, setForm] = useState(createEmptyArticle);
  const [slugWasEdited, setSlugWasEdited] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isExported, setIsExported] = useState(false);

  const sortedArticles = useMemo(
    () => [...articles].sort((first, second) => first.title.localeCompare(second.title)),
    [articles]
  );

  function startNewArticle() {
    setEditingSlug(null);
    setForm(createEmptyArticle());
    setSlugWasEdited(false);
    setMessage("");
    setError("");
  }

  function editArticle(article) {
    setEditingSlug(article.slug);
    setForm(toEditorArticle(article));
    setSlugWasEdited(true);
    setMessage("");
    setError("");
  }

  function updateTitle(title) {
    setForm((current) => ({
      ...current,
      title,
      slug: slugWasEdited ? current.slug : slugify(title),
    }));
  }

  function updateSection(index, key, value) {
    setForm((current) => ({
      ...current,
      sections: current.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [key]: value } : section
      ),
    }));
  }

  function saveArticle(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsExported(false);

    const slug = slugify(form.slug);
    const sections = form.sections
      .map((section) => ({
        heading: section.heading.trim(),
        paragraphs: section.paragraphs
          .flatMap((paragraph) => paragraph.split(/\n\s*\n/))
          .map((paragraph) => paragraph.trim())
          .filter(Boolean),
      }))
      .filter((section) => section.heading && section.paragraphs.length > 0);
    const takeaways = form.takeaways.map((item) => item.trim()).filter(Boolean);

    if (!form.title.trim() || !slug || !form.category.trim() || !form.summary.trim()) {
      setError("Add a title, URL slug, category, and summary before saving.");
      return;
    }
    if (sections.length === 0) {
      setError("Add at least one section with a heading and body text.");
      return;
    }
    if (takeaways.length === 0) {
      setError("Add at least one key takeaway before saving.");
      return;
    }
    if (articles.some((article) => article.slug === slug && article.slug !== editingSlug)) {
      setError("That URL slug is already in use. Choose a unique slug.");
      return;
    }

    const savedArticle = {
      slug,
      category: form.category.trim(),
      title: form.title.trim(),
      summary: form.summary.trim(),
      sections,
      takeaways,
      visible: form.visible,
      createdAt:
        articles.find((article) => article.slug === editingSlug)?.createdAt ||
        new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedOverrides = overrides.filter(
      (article) => article.slug !== editingSlug && article.slug !== slug
    );
    updatedOverrides.push(savedArticle);

    const saveError = onSave(updatedOverrides);
    if (saveError) {
      setError(saveError);
      return;
    }

    setEditingSlug(slug);
    setForm(savedArticle);
    setSlugWasEdited(true);
    setMessage("Saved in this browser. Export the article module to publish it site-wide.");
  }

  function exportArticles() {
    const source = createArticleModule(articles);
    const file = new Blob([source], { type: "text/javascript;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "articles.js";
    link.click();
    URL.revokeObjectURL(downloadUrl);
    setIsExported(true);
  }

  return (
    <div className="portfolio-shell article-admin-page">
      <header className="site-topbar">
        <a className="site-wordmark" href="#top">Prabhat Kumar</a>
        <nav className="topbar-links" aria-label="Main navigation">
          <a className="article-nav-link" href="#top">Homepage</a>
          <TopbarSocialLinks />
        </nav>
      </header>

      <main className="article-admin-layout">
        <section className="article-admin-intro content-panel">
          <p className="section-kicker">Local authoring tool</p>
          <h1>Article admin</h1>
          <p>
            Write and manage article drafts in this browser. Changes are private
            to this browser until you export the article module and publish the
            site.
          </p>
          <p className="article-admin-privacy-note">
            No account or server is used. Avoid using this editor on a shared
            computer for unpublished or sensitive writing.
          </p>
          <button className="profile-primary-link article-admin-new" onClick={startNewArticle} type="button">
            Write a new article
          </button>
        </section>

        <section className="article-admin-notice content-panel" aria-label="Publishing workflow">
          <h2>How publishing works</h2>
          <ol>
            <li>Save your draft here; it is stored in this browser only.</li>
            <li>
              Turn on <strong>Visible on portfolio</strong> to include it in the
              local preview.
            </li>
            <li>
              Export <code>articles.js</code>, replace{" "}
              <code>src/articles/articles.js</code>, then build and deploy the
              site to share changes with everyone.
            </li>
          </ol>
        </section>

        {(storageError || error || message) && (
          <div
            className={`article-admin-status${error || storageError ? " is-error" : ""}`}
            role={error || storageError ? "alert" : "status"}
          >
            {storageError || error || message}
          </div>
        )}

        <div className="article-admin-columns">
          <section className="article-admin-list content-panel">
            <div className="panel-heading">
              <div>
                <p className="section-kicker">Library</p>
                <h2>Articles ({articles.length})</h2>
              </div>
            </div>
            <div className="article-admin-items">
              {sortedArticles.map((article) => (
                <article className="article-admin-item" key={article.slug}>
                  <div>
                    <p className="article-idea-category">{article.category}</p>
                    <h3>{article.title}</h3>
                    <span className={`article-visibility${article.visible === false ? " is-hidden" : ""}`}>
                      {article.visible === false ? "Hidden" : "Visible"}
                    </span>
                  </div>
                  <button
                    className="show-more-button"
                    onClick={() => editArticle(article)}
                    type="button"
                  >
                    Edit
                  </button>
                </article>
              ))}
            </div>
            <button
              className="profile-secondary-link article-admin-export"
              disabled={Boolean(storageError)}
              onClick={exportArticles}
              type="button"
            >
              Export articles.js
            </button>
            {isExported && (
              <p className="article-admin-export-note">
                Replace <code>src/articles/articles.js</code> with the downloaded
                file, then deploy to publish.
              </p>
            )}
          </section>

          <form className="article-admin-form content-panel" onSubmit={saveArticle}>
            <div className="panel-heading">
              <div>
                <p className="section-kicker">{editingSlug ? "Editing article" : "New article"}</p>
                <h2>{form.title || "Article details"}</h2>
              </div>
            </div>

            <label>
              Title
              <input
                onChange={(event) => updateTitle(event.target.value)}
                required
                value={form.title}
              />
            </label>
            <label>
              URL slug
              <input
                onChange={(event) => {
                  setSlugWasEdited(true);
                  setForm((current) => ({ ...current, slug: event.target.value }));
                }}
                readOnly={Boolean(editingSlug)}
                required
                value={form.slug}
              />
            </label>
            <label>
              Category
              <input
                onChange={(event) =>
                  setForm((current) => ({ ...current, category: event.target.value }))
                }
                placeholder="System design, AI, Engineering leadership…"
                required
                value={form.category}
              />
            </label>
            <label>
              Summary
              <textarea
                onChange={(event) =>
                  setForm((current) => ({ ...current, summary: event.target.value }))
                }
                required
                rows="3"
                value={form.summary}
              />
            </label>

            <div className="article-admin-section-heading">
              <h3>Article sections</h3>
              <button
                className="show-more-button"
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    sections: [...current.sections, { heading: "", paragraphs: [""] }],
                  }))
                }
                type="button"
              >
                Add section
              </button>
            </div>
            {form.sections.map((section, index) => (
              <fieldset className="article-admin-section" key={index}>
                <legend>Section {index + 1}</legend>
                <label>
                  Heading
                  <input
                    onChange={(event) =>
                      updateSection(index, "heading", event.target.value)
                    }
                    required
                    value={section.heading}
                  />
                </label>
                <label>
                  Body <span className="article-admin-help">Separate paragraphs with a blank line.</span>
                  <textarea
                    onChange={(event) =>
                      updateSection(index, "paragraphs", [event.target.value])
                    }
                    required
                    rows="7"
                    value={section.paragraphs.join("\n\n")}
                  />
                </label>
                {form.sections.length > 1 && (
                  <button
                    className="article-admin-remove"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        sections: current.sections.filter(
                          (_, sectionIndex) => sectionIndex !== index
                        ),
                      }))
                    }
                    type="button"
                  >
                    Remove section
                  </button>
                )}
              </fieldset>
            ))}

            <label>
              Key takeaways <span className="article-admin-help">One takeaway per line.</span>
              <textarea
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    takeaways: event.target.value.split("\n"),
                  }))
                }
                required
                rows="4"
                value={form.takeaways.join("\n")}
              />
            </label>

            <label className="article-admin-visible">
              <input
                checked={form.visible}
                onChange={(event) =>
                  setForm((current) => ({ ...current, visible: event.target.checked }))
                }
                type="checkbox"
              />
              <span>
                <strong>Visible on portfolio</strong>
                <small>
                  When off, the article is hidden from the article list and direct
                  article route after publishing.
                </small>
              </span>
            </label>

            <div className="article-admin-form-actions">
              <button className="profile-primary-link" disabled={Boolean(storageError)} type="submit">
                Save article
              </button>
              {editingSlug && (
                <button className="profile-secondary-link" onClick={startNewArticle} type="button">
                  Cancel edit
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ArticleAdmin;
