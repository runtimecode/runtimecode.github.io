function WorkingWithMe() {
  return (
    <div className="portfolio-shell working-with-me-page">
      <header className="site-topbar">
        <a className="site-wordmark" href="#top">Prabhat Kumar</a>
        <a className="topbar-contact" href="mailto:kmrprabhat@outlook.com">
          Get in touch <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main className="working-with-me-content" id="top">
        <section className="content-panel working-with-me-intro">
          <p className="section-kicker">A short guide for teammates</p>
          <h1>Working with me</h1>
          <p>
            I lead software engineering teams by setting clear direction, building
            trust, and helping people do their best work. This is a practical
            starting point for how we can work well together; it is not a set of
            rigid rules, and I welcome feedback on what works for you, too.
          </p>
        </section>

        <section className="content-panel working-with-me-section">
          <p className="section-kicker">01 / How I work</p>
          <h2>Clarity, ownership, and collaboration</h2>
          <ul>
            <li>
              I value clear goals and context. Let’s align on the problem, the
              outcome, and how we’ll know we are making progress.
            </li>
            <li>
              I encourage people to take ownership and make decisions close to
              the work, with the support and context they need.
            </li>
            <li>
              I stay engaged in technical discussions and may ask detailed
              questions. The goal is to understand trade-offs and help, not to
              take ownership away from you.
            </li>
          </ul>
        </section>

        <section className="content-panel working-with-me-section">
          <p className="section-kicker">02 / Communication</p>
          <h2>Be direct and bring the context</h2>
          <ul>
            <li>
              I appreciate concise updates that cover what changed, what is
              blocked, and what decision or help is needed.
            </li>
            <li>
              For complex or time-sensitive topics, let’s talk. Written notes
              are useful for sharing context and keeping decisions visible.
            </li>
            <li>
              Please raise risks early, even when the details are still unclear.
              Early signals give us more options.
            </li>
            <li>
              I sometimes choose to work late at night. If you see a message
              from me outside your usual work hours, there is no expectation
              that you reply then; respond during your normal working time.
            </li>
            <li>
              If something genuinely needs attention outside normal hours, I
              will mark it as <strong>URGENT / TIME-CRITICAL</strong> and say
              when I need a response. Otherwise, it can wait until the next
              working day.
            </li>
          </ul>
        </section>

        <section className="content-panel working-with-me-section">
          <p className="section-kicker">03 / Decisions and disagreement</p>
          <h2>Challenge ideas constructively</h2>
          <ul>
            <li>
              I want to hear different perspectives, especially when you see a
              risk or a simpler approach. Explain your reasoning and the
              trade-offs you see.
            </li>
            <li>
              When we decide, let’s make the owner and next steps clear. If new
              information changes the picture, bring it back and we can revisit.
            </li>
            <li>
              We should balance customer impact, reliability, delivery, and
              maintainability rather than optimizing for speed alone.
            </li>
          </ul>
        </section>

        <section className="content-panel working-with-me-section">
          <p className="section-kicker">04 / Feedback and support</p>
          <h2>Make feedback timely and specific</h2>
          <ul>
            <li>
              I prefer feedback that is candid, respectful, and grounded in
              specific examples. You can share it with me directly.
            </li>
            <li>
              If you are blocked, tell me what you have tried and what would
              help. We can work through the problem together or find the right
              person to unblock it.
            </li>
            <li>
              In one-on-ones, bring what is most useful to you: decisions,
              coaching, feedback, career goals, or time to think through a
              challenge.
            </li>
          </ul>
        </section>

        <footer className="working-with-me-footer">
          <p>
            These are preferences, not expectations that everyone works the
            same way. Tell me what helps you do your best work.
          </p>
          <a className="profile-primary-link" href="mailto:kmrprabhat@outlook.com">
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
          <a className="working-with-me-home-link" href="#top">
            Back to homepage
          </a>
        </footer>
      </main>
    </div>
  );
}

export default WorkingWithMe;
