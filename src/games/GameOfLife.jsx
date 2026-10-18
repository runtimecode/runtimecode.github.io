import { useEffect, useState } from "react";

const DEFAULT_ROWS = 24;
const DEFAULT_COLUMNS = 36;
const MIN_DIMENSION = 8;
const MAX_DIMENSION = 80;

function emptyGrid(rows, columns) {
  return Array(rows * columns).fill(false);
}

function nextGeneration(grid, rows, columns) {
  const next = emptyGrid(rows, columns);

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      let liveNeighbors = 0;

      for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
        for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
          if (rowOffset === 0 && columnOffset === 0) continue;
          const neighborRow = row + rowOffset;
          const neighborColumn = column + columnOffset;
          if (
            neighborRow >= 0 &&
            neighborRow < rows &&
            neighborColumn >= 0 &&
            neighborColumn < columns &&
            grid[neighborRow * columns + neighborColumn]
          ) {
            liveNeighbors += 1;
          }
        }
      }

      const index = row * columns + column;
      next[index] = grid[index]
        ? liveNeighbors === 2 || liveNeighbors === 3
        : liveNeighbors === 3;
    }
  }

  return next;
}

function GameOfLife() {
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [rowInput, setRowInput] = useState(String(DEFAULT_ROWS));
  const [columnInput, setColumnInput] = useState(String(DEFAULT_COLUMNS));
  const [grid, setGrid] = useState(() => emptyGrid(DEFAULT_ROWS, DEFAULT_COLUMNS));
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(6);
  const [density, setDensity] = useState(28);
  const [generation, setGeneration] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Conway's Game of Life | Prabhat Kumar";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    if (!isRunning) return undefined;

    const interval = window.setInterval(() => {
      setGrid((current) => nextGeneration(current, rows, columns));
      setGeneration((current) => current + 1);
    }, 1000 / speed);

    return () => window.clearInterval(interval);
  }, [columns, isRunning, rows, speed]);

  function updateDimensions(event) {
    event.preventDefault();
    const nextRows = Number(rowInput);
    const nextColumns = Number(columnInput);

    if (
      !Number.isInteger(nextRows) ||
      !Number.isInteger(nextColumns) ||
      nextRows < MIN_DIMENSION ||
      nextRows > MAX_DIMENSION ||
      nextColumns < MIN_DIMENSION ||
      nextColumns > MAX_DIMENSION
    ) {
      setError(`Rows and columns must be whole numbers from ${MIN_DIMENSION} to ${MAX_DIMENSION}.`);
      return;
    }

    setError("");
    setIsRunning(false);
    setRows(nextRows);
    setColumns(nextColumns);
    setGrid(emptyGrid(nextRows, nextColumns));
    setGeneration(0);
  }

  function toggleCell(index) {
    setGrid((current) =>
      current.map((cell, cellIndex) => (cellIndex === index ? !cell : cell))
    );
  }

  function randomizeGrid() {
    setGrid(
      Array.from({ length: rows * columns }, () => Math.random() * 100 < density)
    );
    setGeneration(0);
    setIsRunning(false);
  }

  function clearGrid() {
    setGrid(emptyGrid(rows, columns));
    setGeneration(0);
    setIsRunning(false);
  }

  function stepForward() {
    setGrid((current) => nextGeneration(current, rows, columns));
    setGeneration((current) => current + 1);
  }

  const liveCellCount = grid.reduce((count, cell) => count + Number(cell), 0);

  return (
    <div className="portfolio-shell game-page">
      <header className="site-topbar">
        <a className="site-wordmark" href="#top">Prabhat Kumar</a>
        <nav className="topbar-links" aria-label="Main navigation">
          <a className="article-nav-link" href="#projects">All projects</a>
          <a className="topbar-guide-link" href="#working-with-me">Working with me</a>
          <a className="topbar-contact" href="mailto:kmrprabhat@outlook.com">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main className="game-content">
        <section className="game-intro content-panel">
          <a className="article-breadcrumb" href="#projects">← All projects</a>
          <p className="section-kicker">Interactive simulation</p>
          <h1>Conway&apos;s Game of Life</h1>
          <p>
            A zero-player cellular automaton: choose the starting pattern and
            watch simple rules create surprising motion. Click cells to toggle
            them, randomize the board, or let the simulation run.
          </p>
        </section>

        <section className="game-controls-panel content-panel" aria-label="Game controls">
          <div className="game-primary-controls">
            <button
              className="profile-primary-link"
              onClick={() => setIsRunning((running) => !running)}
              type="button"
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              className="profile-secondary-link"
              disabled={isRunning}
              onClick={stepForward}
              type="button"
            >
              Step
            </button>
            <button
              className="profile-secondary-link"
              onClick={randomizeGrid}
              type="button"
            >
              Randomize
            </button>
            <button
              className="profile-secondary-link"
              onClick={clearGrid}
              type="button"
            >
              Clear
            </button>
          </div>

          <form className="game-grid-form" onSubmit={updateDimensions}>
            <label>
              Rows
              <input
                max={MAX_DIMENSION}
                min={MIN_DIMENSION}
                onChange={(event) => setRowInput(event.target.value)}
                type="number"
                value={rowInput}
              />
            </label>
            <label>
              Columns
              <input
                max={MAX_DIMENSION}
                min={MIN_DIMENSION}
                onChange={(event) => setColumnInput(event.target.value)}
                type="number"
                value={columnInput}
              />
            </label>
            <button className="show-more-button" type="submit">Apply size</button>
          </form>

          <div className="game-range-controls">
            <label className="game-range-control">
              <span>Speed <strong>{speed} generations/sec</strong></span>
              <input
                max="20"
                min="1"
                onChange={(event) => setSpeed(Number(event.target.value))}
                type="range"
                value={speed}
              />
            </label>
            <label className="game-range-control">
              <span>Random density <strong>{density}%</strong></span>
              <input
                max="60"
                min="5"
                onChange={(event) => setDensity(Number(event.target.value))}
                type="range"
                value={density}
              />
            </label>
          </div>

          <p className="game-status" aria-live="polite">
            {isRunning ? "Running" : "Paused"} · Generation {generation} ·{" "}
            {liveCellCount} live {liveCellCount === 1 ? "cell" : "cells"} ·{" "}
            {rows} × {columns}
          </p>
          {error && <p className="game-error" role="alert">{error}</p>}
        </section>

        <section className="game-board-panel content-panel">
          <div
            className="game-grid"
            role="group"
            aria-label={`${rows} by ${columns} Game of Life grid`}
            style={{ "--grid-columns": columns }}
          >
            {grid.map((isAlive, index) => {
              const row = Math.floor(index / columns) + 1;
              const column = (index % columns) + 1;
              return (
                <button
                  aria-label={`Row ${row}, column ${column}, ${isAlive ? "alive" : "dead"}`}
                  aria-pressed={isAlive}
                  className={`game-cell${isAlive ? " is-alive" : ""}`}
                  key={index}
                  onClick={() => toggleCell(index)}
                  type="button"
                />
              );
            })}
          </div>
          <p className="game-board-hint">
            Click or keyboard-focus a cell and press Enter or Space to change it.
            The grid edges are fixed: cells beyond the board are considered dead.
          </p>
        </section>

        <section className="game-rules content-panel">
          <p className="section-kicker">The rules</p>
          <h2>Four simple rules, one evolving grid</h2>
          <ul>
            <li>Live cells with fewer than two live neighbors die.</li>
            <li>Live cells with two or three live neighbors survive.</li>
            <li>Live cells with more than three live neighbors die.</li>
            <li>Dead cells with exactly three live neighbors become alive.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default GameOfLife;
