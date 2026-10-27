import { useCallback, useEffect, useRef, useState } from "react";
import TopbarSocialLinks from "../TopbarSocialLinks";

const sites = [
  {
    id: "google",
    name: "Google",
    url: "https://www.google.com/favicon.ico",
    color: "#4285f4",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/favicon.ico",
    color: "#24292f",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    url: "https://www.cloudflare.com/favicon.ico",
    color: "#f38020",
  },
  {
    id: "wikipedia",
    name: "Wikipedia",
    url: "https://www.wikipedia.org/favicon.ico",
    color: "#54595d",
  },
  {
    id: "reddit",
    name: "Reddit",
    url: "https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png",
    color: "#ff4500",
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://www.youtube.com/favicon.ico",
    color: "#e62117",
  },
];

const maxHistoryEntries = 20;
const refreshIntervalMs = 30_000;
const probeTimeoutMs = 8_000;
const speedTestBytes = 1_000_000;
const speedTestTimeoutMs = 20_000;

function probeSite(site) {
  return new Promise((resolve) => {
    const image = new Image();
    const startedAt = performance.now();
    const timeoutId = window.setTimeout(() => finish(false), probeTimeoutMs);
    let completed = false;

    function finish(reachable) {
      if (completed) return;
      completed = true;
      window.clearTimeout(timeoutId);
      image.onload = null;
      image.onerror = null;
      resolve({
        siteId: site.id,
        latencyMs: reachable
          ? Math.round(performance.now() - startedAt)
          : null,
        reachable,
      });
    }

    image.onload = () => finish(true);
    image.onerror = () => finish(false);
    image.src = `${site.url}?latency-check=${Date.now()}`;
  });
}

async function measureDownloadSpeed() {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    speedTestTimeoutMs
  );
  const startedAt = performance.now();

  try {
    const response = await fetch(
      `https://speed.cloudflare.com/__down?bytes=${speedTestBytes}&speed-check=${Date.now()}`,
      { cache: "no-store", signal: controller.signal }
    );
    if (!response.ok) {
      throw new Error(`Speed test returned HTTP ${response.status}`);
    }

    const payload = await response.arrayBuffer();
    const elapsedSeconds = (performance.now() - startedAt) / 1000;
    if (payload.byteLength === 0 || elapsedSeconds <= 0) {
      throw new Error("Speed test returned no data");
    }

    return (payload.byteLength * 8) / elapsedSeconds / 1_000_000;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function LatencyChart({ history }) {
  const width = 800;
  const height = 260;
  const padding = { top: 18, right: 20, bottom: 38, left: 48 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxLatency = Math.max(
    300,
    ...history.flatMap((entry) =>
      entry.results
        .filter((result) => result.reachable)
        .map((result) => result.latencyMs)
    )
  );
  const yMax = Math.ceil(maxLatency / 100) * 100;
  const x = (index) =>
    padding.left +
    (history.length <= 1 ? plotWidth / 2 : (index / (history.length - 1)) * plotWidth);
  const y = (value) => padding.top + plotHeight - (value / yMax) * plotHeight;
  const gridLines = [0, 1, 2, 3, 4].map((tick) => (yMax * tick) / 4);
  const timeLabels = history.length > 1
    ? [
        { index: 0, label: history[0].checkedAt.toLocaleTimeString() },
        {
          index: history.length - 1,
          label: history[history.length - 1].checkedAt.toLocaleTimeString(),
        },
      ]
    : [];

  return (
    <div className="latency-chart-scroll">
      <svg
        className="latency-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Recent response-time estimates for each monitored site, in milliseconds"
      >
        <title>Recent site response-time estimates</title>
        {gridLines.map((value) => (
          <g key={value}>
            <line
              x1={padding.left}
              y1={y(value)}
              x2={width - padding.right}
              y2={y(value)}
              className="latency-chart-gridline"
            />
            <text x={padding.left - 9} y={y(value) + 4} textAnchor="end">
              {Math.round(value)} ms
            </text>
          </g>
        ))}
        {timeLabels.map(({ index, label }) => (
          <text
            key={index}
            x={x(index)}
            y={height - 10}
            textAnchor={index === 0 ? "start" : "end"}
          >
            {label}
          </text>
        ))}
        {sites.map((site) => {
          const points = history.flatMap((entry, index) => {
            const result = entry.results.find(
              (item) => item.siteId === site.id
            );
            return result?.reachable
              ? [{ x: x(index), y: y(result.latencyMs) }]
              : [];
          });
          if (points.length === 0) return null;

          return (
            <g key={site.id}>
              {points.length > 1 && (
                <polyline
                  points={points.map((point) => `${point.x},${point.y}`).join(" ")}
                  fill="none"
                  stroke={site.color}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              )}
              {points.map((point, index) => (
                <circle
                  key={`${site.id}-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r="3.5"
                  fill={site.color}
                />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function LatencyMonitor() {
  const [latestResults, setLatestResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [isTestingSpeed, setIsTestingSpeed] = useState(false);
  const [speedTestError, setSpeedTestError] = useState("");
  const isMounted = useRef(false);
  const checking = useRef(false);
  const testingSpeed = useRef(false);

  const runChecks = useCallback(async () => {
    if (checking.current) return;
    checking.current = true;
    if (isMounted.current) setIsChecking(true);

    try {
      const results = await Promise.all(sites.map(probeSite));
      if (!isMounted.current) return;

      const checkedAt = new Date();
      setLatestResults(results);
      setLastChecked(checkedAt);
      setHistory((previous) =>
        [...previous, { checkedAt, results }].slice(-maxHistoryEntries)
      );
    } finally {
      checking.current = false;
      if (isMounted.current) setIsChecking(false);
    }
  }, []);

  const runSpeedTest = useCallback(async () => {
    if (testingSpeed.current) return;
    testingSpeed.current = true;
    setIsTestingSpeed(true);
    setSpeedTestError("");

    try {
      const speed = await measureDownloadSpeed();
      setDownloadSpeed(speed);
    } catch (error) {
      setSpeedTestError(
        error.name === "AbortError"
          ? "The speed test timed out. Try again on a steadier connection."
          : "The speed test could not complete. Check your connection and try again."
      );
    } finally {
      testingSpeed.current = false;
      setIsTestingSpeed(false);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    runChecks();
    const intervalId = window.setInterval(runChecks, refreshIntervalMs);

    return () => {
      isMounted.current = false;
      window.clearInterval(intervalId);
    };
  }, [runChecks]);

  const reachableCount = latestResults.filter((result) => result.reachable).length;

  return (
    <div className="portfolio-shell latency-monitor-page">
      <header className="site-topbar">
        <a className="site-wordmark" href="#top">Prabhat Kumar</a>
        <nav className="topbar-links" aria-label="Main navigation">
          <a className="article-nav-link" href="#top">Homepage</a>
          <a className="topbar-guide-link" href="#working-with-me">Working with me</a>
          <TopbarSocialLinks />
        </nav>
      </header>

      <main className="latency-monitor-content">
        <section className="latency-monitor-intro content-panel">
          <a className="article-breadcrumb" href="#top">← Homepage</a>
          <p className="section-kicker">Network diagnostics</p>
          <h1>Popular Site Latency Monitor</h1>
          <p>
            Compare browser-measured response times for popular sites and follow
            their recent trends.
          </p>
        </section>

        <section className="content-panel latency-overview" aria-live="polite">
          <div>
            <p className="section-kicker">Live checks</p>
            <h2>
              {latestResults.length === 0
                ? "Checking sites…"
                : `${reachableCount} of ${sites.length} sites reachable`}
            </h2>
            <p>
              {lastChecked
                ? `Last checked ${lastChecked.toLocaleTimeString()}`
                : "Measuring response times from your browser"}
              {" · "}Automatic checks every 30 seconds
            </p>
          </div>
          <button
            className="latency-refresh-button"
            type="button"
            onClick={runChecks}
            disabled={isChecking}
          >
            {isChecking ? "Checking…" : "Check now"}
          </button>
        </section>

        <section className="latency-site-grid" aria-label="Current site status">
          {sites.map((site) => {
            const result = latestResults.find(
              (item) => item.siteId === site.id
            );
            const status = !result
              ? "Waiting"
              : result.reachable
                ? "Reachable"
                : "No response";

            return (
              <article
                className="content-panel latency-site-card"
                key={site.id}
                aria-label={`${site.name}: ${status}`}
              >
                <div className="latency-site-heading">
                  <span
                    className={`latency-status-dot ${
                      result?.reachable
                        ? "is-reachable"
                        : result
                          ? "is-unreachable"
                          : ""
                    }`}
                    aria-hidden="true"
                  />
                  <h2>{site.name}</h2>
                </div>
                <p className="latency-status-label">{status}</p>
                <p className="latency-value">
                  {result?.reachable ? `${result.latencyMs} ms` : "—"}
                </p>
              </article>
            );
          })}
        </section>

        <section
          className="content-panel latency-speed-panel"
          aria-live="polite"
        >
          <div>
            <p className="section-kicker">Download speed</p>
            <h2>
              {downloadSpeed === null
                ? "Measure your connection"
                : `${downloadSpeed.toFixed(1)} Mbps`}
            </h2>
            <p>
              {speedTestError ||
                "A one-time 1 MB download estimates throughput. Site latency and download speed are different measurements."}
            </p>
          </div>
          <button
            className="latency-refresh-button"
            type="button"
            onClick={runSpeedTest}
            disabled={isTestingSpeed}
          >
            {isTestingSpeed
              ? "Testing…"
              : downloadSpeed === null
                ? "Run speed test"
                : "Test again"}
          </button>
        </section>

        <section className="content-panel latency-history-panel">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Recent history</p>
              <h2>Response-time trend</h2>
            </div>
          </div>
          {history.length > 0 ? (
            <>
              <LatencyChart history={history} />
              <ul className="latency-chart-legend" aria-label="Chart legend">
                {sites.map((site) => (
                  <li key={site.id}>
                    <span
                      className="latency-legend-swatch"
                      style={{ backgroundColor: site.color }}
                      aria-hidden="true"
                    />
                    {site.name}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="latency-chart-empty">
              The chart will appear after the first check completes.
            </p>
          )}
        </section>

        <aside className="latency-monitor-note">
          Checks load each site’s cache-busted favicon. The time is an estimate
          from your browser to that image endpoint—not a full-page load time or
          an HTTP status check for the site’s main page. Download speed is
          measured separately by timing a 1 MB download from Cloudflare, so it
          is not calculated from site latency. Both measurements can vary by
          network and location, and latency history is kept only while this
          page is open.
        </aside>

        <footer className="article-archive-footer">
          <a href="#top">Back to homepage</a>
        </footer>
      </main>
    </div>
  );
}

export default LatencyMonitor;
