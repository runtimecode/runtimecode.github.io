import { useEffect, useId, useRef, useState } from "react";

function MermaidDiagram({ title, source }) {
  const generatedId = useId();
  const containerRef = useRef(null);
  const [renderError, setRenderError] = useState("");
  const diagramId = `learning-diagram-${generatedId.replace(/:/g, "")}`;

  useEffect(() => {
    let cancelled = false;
    async function renderDiagram() {
      try {
        const { default: mermaid } = await import("mermaid");
        if (cancelled) return;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "neutral",
          themeVariables: { fontSize: "14px" },
          flowchart: { nodeSpacing: 32, rankSpacing: 42 },
        });
        const { svg } = await mermaid.render(diagramId, source);
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = svg;
        setRenderError("");
      } catch (error) {
        if (cancelled) return;
        setRenderError(`Could not render this Mermaid diagram: ${error.message}`);
      }
    }

    renderDiagram();
    return () => {
      cancelled = true;
    };
  }, [diagramId, source]);

  return (
    <section className="learning-code-block learning-mermaid-block">
      <div>
        <h3>{title}</h3>
        <span>Mermaid</span>
      </div>
      {renderError ? (
        <p className="learning-mermaid-error" role="alert">{renderError}</p>
      ) : (
        <div
          aria-label={title}
          className="learning-mermaid-diagram"
          ref={containerRef}
          role="img"
        />
      )}
      <details className="learning-mermaid-source">
        <summary>View Mermaid source</summary>
        <pre><code>{source}</code></pre>
      </details>
    </section>
  );
}

export default MermaidDiagram;
