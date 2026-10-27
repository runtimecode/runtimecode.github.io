import { useCallback, useEffect, useRef, useState } from "react";
import TopbarSocialLinks from "../TopbarSocialLinks";

const notes = [
  { key: "A", name: "C", octave: 4, syllable: "Do", frequency: 261.63, color: "#ff7185" },
  { key: "S", name: "D", octave: 4, syllable: "Re", frequency: 293.66, color: "#ff9d58" },
  { key: "D", name: "E", octave: 4, syllable: "Mi", frequency: 329.63, color: "#ffd15c" },
  { key: "F", name: "G", octave: 4, syllable: "Sol", frequency: 392, color: "#62c98b" },
  { key: "G", name: "A", octave: 4, syllable: "La", frequency: 440, color: "#5ec9d4" },
  { key: "H", name: "C", octave: 5, syllable: "Do", frequency: 523.25, color: "#6698f5" },
  { key: "J", name: "D", octave: 5, syllable: "Re", frequency: 587.33, color: "#9b82e8" },
  { key: "K", name: "E", octave: 5, syllable: "Mi", frequency: 659.25, color: "#df78c8" },
];

const balloonColors = [
  "#ff7185",
  "#ff9d58",
  "#ffd15c",
  "#62c98b",
  "#5ec9d4",
  "#6698f5",
  "#9b82e8",
  "#df78c8",
];

function KeyBalloon() {
  const [balloons, setBalloons] = useState([]);
  const [lastNote, setLastNote] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioContext = useRef(null);
  const nextId = useRef(0);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Key Balloon Music | Prabhat Kumar";
    return () => {
      document.title = previousTitle;
      if (audioContext.current) {
        audioContext.current.close();
        audioContext.current = null;
      }
    };
  }, []);

  const playNote = useCallback((note) => {
    if (soundEnabled) {
      const AudioContextConstructor = window.AudioContext;
      if (AudioContextConstructor) {
        if (!audioContext.current) {
          audioContext.current = new AudioContextConstructor();
        }

        const context = audioContext.current;
        if (context.state === "suspended") context.resume();

        const oscillator = context.createOscillator();
        const volume = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = note.frequency;
        volume.gain.setValueAtTime(0.0001, context.currentTime);
        volume.gain.exponentialRampToValueAtTime(0.22, context.currentTime + 0.025);
        volume.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.65);
        oscillator.connect(volume);
        volume.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.67);
      }
    }

    const id = nextId.current;
    nextId.current += 1;
    setLastNote(note);
    setBalloons((current) => [
      ...current.slice(-11),
      {
        id,
        key: note.key,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        left: 7 + Math.random() * 86,
        drift: Math.round(Math.random() * 100 - 50),
        duration: 2.8 + Math.random() * 1.1,
      },
    ]);
  }, [soundEnabled]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
      const key = event.key.toUpperCase();
      const note = notes.find((item) => item.key === key);
      if (!note) return;
      event.preventDefault();
      playNote(note);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playNote]);

  return (
    <div className="portfolio-shell key-balloon-page">
      <header className="site-topbar">
        <a className="site-wordmark" href="#top">Prabhat Kumar</a>
        <nav className="topbar-links" aria-label="Main navigation">
          <a className="article-nav-link" href="#projects">All projects</a>
          <a className="topbar-guide-link" href="#working-with-me">Working with me</a>
          <TopbarSocialLinks />
        </nav>
      </header>

      <main className="key-balloon-content">
        <section className="key-balloon-intro content-panel">
          <a className="article-breadcrumb" href="#projects">← All projects</a>
          <p className="section-kicker">Music &amp; learning</p>
          <h1>Key Balloon Music</h1>
          <p>
            Press a key, hear a musical note, and send a balloon floating up!
            Discover note names while you make your own little tune.
          </p>
        </section>

        <section className="content-panel key-balloon-game" aria-label="Musical keyboard game">
          <div className="key-balloon-game-heading">
            <div>
              <p className="section-kicker">Your musical playground</p>
              <h2>Make some music!</h2>
              <p>Press the letter keys on your keyboard or tap a note below.</p>
            </div>
            <div className="key-balloon-actions">
              <button
                type="button"
                className="key-balloon-sound-button"
                onClick={() => setSoundEnabled((enabled) => !enabled)}
                aria-pressed={soundEnabled}
              >
                {soundEnabled ? "♫ Sound on" : "♫ Sound off"}
              </button>
              <button
                type="button"
                className="key-balloon-clear-button"
                onClick={() => setBalloons([])}
                disabled={balloons.length === 0}
              >
                Clear balloons
              </button>
            </div>
          </div>

          <div
            className="key-balloon-sky"
            aria-label="Balloons float up with the keyboard letter that made each note"
          >
            <div className="key-balloon-cloud key-balloon-cloud-one" aria-hidden="true" />
            <div className="key-balloon-cloud key-balloon-cloud-two" aria-hidden="true" />
            {balloons.length === 0 && (
              <p className="key-balloon-sky-prompt">
                Your balloons will float up here! <span aria-hidden="true">☁</span>
              </p>
            )}
            {balloons.map((balloon) => (
              <div
                className="key-balloon"
                key={balloon.id}
                style={{
                  "--balloon-color": balloon.color,
                  "--balloon-left": `${balloon.left}%`,
                  "--balloon-drift": `${balloon.drift}px`,
                  "--balloon-duration": `${balloon.duration}s`,
                }}
                onAnimationEnd={() =>
                  setBalloons((current) =>
                    current.filter((item) => item.id !== balloon.id)
                  )
                }
                aria-hidden="true"
              >
                <span>{balloon.key}</span>
              </div>
            ))}
            <span className="key-balloon-sun" aria-hidden="true">☀</span>
          </div>

          <div className="key-balloon-last-note" aria-live="polite">
            {lastNote ? (
              <>
                <span className="key-balloon-note-name">
                  {lastNote.name}
                  {lastNote.octave}
                </span>
                <span>
                  {lastNote.syllable} · you pressed{" "}
                  <kbd>{lastNote.key}</kbd>
                </span>
              </>
            ) : (
              <span>Pick a note to hear its sound and see its name.</span>
            )}
          </div>

          <div className="key-balloon-keyboard" aria-label="Play a musical note">
            {notes.map((note) => (
              <button
                className="key-balloon-key"
                key={note.key}
                style={{ "--key-color": note.color }}
                onClick={() => playNote(note)}
                type="button"
                aria-label={`Play ${note.name}${note.octave}, ${note.syllable}. Keyboard key ${note.key}`}
              >
                <span className="key-balloon-key-letter">{note.key}</span>
                <span className="key-balloon-key-note">
                  {note.name}
                  <sub>{note.octave}</sub>
                </span>
                <span className="key-balloon-key-syllable">{note.syllable}</span>
              </button>
            ))}
          </div>

          <p className="key-balloon-song-tip">
            <strong>Try a tune:</strong> press <kbd>A</kbd> <kbd>S</kbd>{" "}
            <kbd>D</kbd> <kbd>F</kbd> <kbd>G</kbd> <kbd>H</kbd> <kbd>J</kbd>{" "}
            <kbd>K</kbd> to climb the musical rainbow!
          </p>
        </section>

        <footer className="article-archive-footer">
          <a href="#projects">Back to all projects</a>
        </footer>
      </main>
    </div>
  );
}

export default KeyBalloon;
