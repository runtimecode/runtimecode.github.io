import { useState } from "react";
import { createLearningModule } from "./learningStorage";

const topics = [
  { slug: "dsa", title: "DSA", folder: "DSA", filename: "dsa.js" },
  {
    slug: "system-design",
    title: "System Design",
    folder: "Systemdesign",
    filename: "systemDesign.js",
  },
  { slug: "lld", title: "LLD", folder: "LLD", filename: "lld.js" },
];

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createEmptyContent(topic) {
  return {
    topic,
    slug: "",
    type: "",
    title: "",
    summary: "",
    sections: [{ heading: "", body: "" }],
    codeSamples: [],
    visible: false,
  };
}

function LearningAdmin({ contentByTopic, overrides, onSave, storageError }) {
  const [topic, setTopic] = useState(topics[0].slug);
  const [editingSlug, setEditingSlug] = useState(null);
  const [form, setForm] = useState(() => createEmptyContent(topics[0].slug));
  const [slugWasEdited, setSlugWasEdited] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isExported, setIsExported] = useState(false);
  const topicInfo = topics.find((item) => item.slug === topic);
  const entries = contentByTopic[topic] || [];

  function startNewContent(nextTopic = topic) {
    setEditingSlug(null);
    setForm(createEmptyContent(nextTopic));
    setSlugWasEdited(false);
    setMessage("");
    setError("");
    setIsExported(false);
  }

  function selectTopic(nextTopic) {
    setTopic(nextTopic);
    startNewContent(nextTopic);
  }

  function editContent(item) {
    setTopic(item.topic);
    setEditingSlug(item.slug);
    setForm({
      ...item,
      sections: item.sections.map((section) => ({ ...section })),
      codeSamples: (item.codeSamples || []).map((sample) => ({ ...sample })),
    });
    setSlugWasEdited(true);
    setMessage("");
    setError("");
    setIsExported(false);
  }

  function saveContent(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsExported(false);

    const slug = slugify(form.slug);
    const sections = form.sections
      .map((section) => ({
        heading: section.heading.trim(),
        body: section.body.trim(),
      }))
      .filter((section) => section.heading && section.body);
    const codeSamples = form.codeSamples
      .map((sample) => ({
        title: sample.title.trim(),
        language: sample.language.trim(),
        code: sample.code,
      }))
      .filter((sample) => sample.title && sample.language && sample.code.trim());

    if (!form.title.trim() || !slug || !form.type.trim() || !form.summary.trim()) {
      setError("Add a title, URL slug, content type, and summary before saving.");
      return;
    }
    if (sections.length === 0) {
      setError("Add at least one section with a heading and body.");
      return;
    }
    if (
      entries.some(
        (item) => item.slug === slug && item.slug !== editingSlug
      )
    ) {
      setError("That URL slug is already in use in this topic. Choose another.");
      return;
    }

    const savedContent = {
      topic,
      slug,
      type: form.type.trim(),
      title: form.title.trim(),
      summary: form.summary.trim(),
      sections,
      codeSamples,
      visible: form.visible,
      createdAt:
        entries.find((item) => item.slug === editingSlug)?.createdAt ||
        new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedOverrides = overrides.filter(
      (item) =>
        !(item.topic === topic && item.slug === editingSlug) &&
        !(item.topic === topic && item.slug === slug)
    );
    updatedOverrides.push(savedContent);

    const saveError = onSave(updatedOverrides);
    if (saveError) {
      setError(saveError);
      return;
    }
    setEditingSlug(slug);
    setForm(savedContent);
    setSlugWasEdited(true);
    setMessage(
      "Saved in this browser. Export the topic file to publish it site-wide."
    );
  }

  function exportTopic() {
    const source = createLearningModule(entries);
    const file = new Blob([source], { type: "text/javascript;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = topicInfo.filename;
    link.click();
    URL.revokeObjectURL(downloadUrl);
    setIsExported(true);
  }

  return (
    <div className="portfolio-shell article-admin-page learning-admin-page">
      <header className="site-topbar">
        <a className="site-wordmark" href="#top">Prabhat Kumar</a>
        <nav className="topbar-links" aria-label="Main navigation">
          <a className="article-nav-link" href="#learning-sharing">Learning &amp; sharing</a>
          <a className="article-nav-link" href="#top">Homepage</a>
        </nav>
      </header>

      <main className="article-admin-layout">
        <section className="article-admin-intro content-panel">
          <p className="section-kicker">Local authoring tool</p>
          <h1>Manage learning content</h1>
          <p>
            Add and edit topic entries in this browser. Saved changes are local
            until you export the topic file and publish the site.
          </p>
          <p className="article-admin-privacy-note">
            This tool is available only on localhost and does not use an account
            or server.
          </p>
        </section>

        <section className="article-admin-notice content-panel" aria-label="Publishing workflow">
          <h2>How publishing works</h2>
          <ol>
            <li>Choose a topic and save entries; changes are stored in this browser.</li>
            <li>Turn on <strong>Visible on portfolio</strong> to include an entry in the local preview.</li>
            <li>
              Export that topic’s JavaScript file and replace the matching file
              in its folder under <code>src/learning/</code>, then build and deploy.
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

        <div className="learning-admin-topic-picker content-panel">
          <label>
            Topic
            <select onChange={(event) => selectTopic(event.target.value)} value={topic}>
              {topics.map((item) => (
                <option key={item.slug} value={item.slug}>{item.title}</option>
              ))}
            </select>
          </label>
          <button
            className="profile-secondary-link article-admin-export"
            disabled={Boolean(storageError)}
            onClick={exportTopic}
            type="button"
          >
            Export {topicInfo.filename}
          </button>
          {isExported && (
            <p className="article-admin-export-note">
              Replace{" "}
              <code>
                src/learning/{topicInfo.folder}/{topicInfo.filename}
              </code>{" "}
              with the downloaded file, then deploy to publish.
            </p>
          )}
        </div>

        <div className="article-admin-columns">
          <section className="article-admin-list content-panel">
            <div className="panel-heading">
              <div>
                <p className="section-kicker">{topicInfo.title}</p>
                <h2>Entries ({entries.length})</h2>
              </div>
            </div>
            <button
              className="profile-primary-link learning-admin-new"
              onClick={() => startNewContent()}
              type="button"
            >
              Add new content
            </button>
            <div className="article-admin-items">
              {entries.map((item) => (
                <article className="article-admin-item" key={item.slug}>
                  <div>
                    <p className="article-idea-category">{item.type}</p>
                    <h3>{item.title}</h3>
                    <span className={`article-visibility${item.visible === false ? " is-hidden" : ""}`}>
                      {item.visible === false ? "Hidden" : "Visible"}
                    </span>
                  </div>
                  <button
                    className="show-more-button"
                    onClick={() => editContent(item)}
                    type="button"
                  >
                    Edit
                  </button>
                </article>
              ))}
            </div>
          </section>

          <form className="article-admin-form content-panel" onSubmit={saveContent}>
            <div className="panel-heading">
              <div>
                <p className="section-kicker">{editingSlug ? "Editing content" : "New content"}</p>
                <h2>{form.title || "Content details"}</h2>
              </div>
            </div>

            <label>
              Title
              <input
                onChange={(event) => {
                  const title = event.target.value;
                  setForm((current) => ({
                    ...current,
                    title,
                    slug: slugWasEdited ? current.slug : slugify(title),
                  }));
                }}
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
              Content type
              <input
                onChange={(event) =>
                  setForm((current) => ({ ...current, type: event.target.value }))
                }
                placeholder="Problem walkthrough, system design…"
                required
                value={form.type}
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
              <h3>Content sections</h3>
              <button
                className="show-more-button"
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    sections: [...current.sections, { heading: "", body: "" }],
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
                      setForm((current) => ({
                        ...current,
                        sections: current.sections.map((item, sectionIndex) =>
                          sectionIndex === index
                            ? { ...item, heading: event.target.value }
                            : item
                        ),
                      }))
                    }
                    required
                    value={section.heading}
                  />
                </label>
                <label>
                  Body
                  <textarea
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        sections: current.sections.map((item, sectionIndex) =>
                          sectionIndex === index
                            ? { ...item, body: event.target.value }
                            : item
                        ),
                      }))
                    }
                    required
                    rows="7"
                    value={section.body}
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

            <div className="article-admin-section-heading">
              <h3>Code or diagrams</h3>
              <button
                className="show-more-button"
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    codeSamples: [
                      ...current.codeSamples,
                      { title: "", language: "text", code: "" },
                    ],
                  }))
                }
                type="button"
              >
                Add code block
              </button>
            </div>
            {form.codeSamples.map((sample, index) => (
              <fieldset className="article-admin-section" key={`code-${index}`}>
                <legend>Code block {index + 1}</legend>
                <label>
                  Label
                  <input
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        codeSamples: current.codeSamples.map((item, sampleIndex) =>
                          sampleIndex === index
                            ? { ...item, title: event.target.value }
                            : item
                        ),
                      }))
                    }
                    value={sample.title}
                  />
                </label>
                <label>
                  Language (for example java, sql, mermaid)
                  <input
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        codeSamples: current.codeSamples.map((item, sampleIndex) =>
                          sampleIndex === index
                            ? { ...item, language: event.target.value }
                            : item
                        ),
                      }))
                    }
                    value={sample.language}
                  />
                </label>
                <label>
                  Code or diagram source
                  <textarea
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        codeSamples: current.codeSamples.map((item, sampleIndex) =>
                          sampleIndex === index
                            ? { ...item, code: event.target.value }
                            : item
                        ),
                      }))
                    }
                    rows="8"
                    value={sample.code}
                  />
                </label>
                <button
                  className="article-admin-remove"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      codeSamples: current.codeSamples.filter(
                        (_, sampleIndex) => sampleIndex !== index
                      ),
                    }))
                  }
                  type="button"
                >
                  Remove code block
                </button>
              </fieldset>
            ))}

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
                <small>Hidden content stays out of the learning page until enabled.</small>
              </span>
            </label>

            <div className="article-admin-form-actions">
              <button className="profile-primary-link" disabled={Boolean(storageError)} type="submit">
                Save content
              </button>
              {editingSlug && (
                <button
                  className="profile-secondary-link"
                  onClick={() => startNewContent()}
                  type="button"
                >
                  Add another
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default LearningAdmin;
