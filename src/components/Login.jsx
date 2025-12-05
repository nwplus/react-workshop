// src/components/Login.jsx
import React, { useEffect, useState } from "react";

function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onLogin(trimmed);
  };

  // optional: scroll-reveal for sections
  useEffect(() => {
    const sections = document.querySelectorAll(".reveal-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-root">
      {/* Top nav */}
      <header className="landing-nav">
        <div className="landing-logo">
          <div className="landing-logo-mark">NG</div>
          <div className="landing-logo-text">NeighborGood</div>
        </div>

        <nav className="landing-nav-links">
          <button
            className="landing-nav-link"
            onClick={() =>
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            How it works
          </button>
          <button
            className="landing-nav-link"
            onClick={() =>
              document
                .getElementById("for-neighbours")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            For neighbours
          </button>
          <button
            className="landing-nav-link"
            onClick={() =>
              document
                .getElementById("for-organizations")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            For organizations
          </button>
        </nav>
      </header>

      <main className="landing-main">
        {/* Hero section */}
        <section className="landing-hero">
          {/* Left: story + value prop */}
          <div className="landing-hero-left">
            <div className="landing-pill">Vancouver prototype · HackCamp 2025</div>
            <h1 className="landing-title">
              Turn spare food and time
              <span>into real support on your block.</span>
            </h1>
            <p className="landing-subtitle">
              NeighborGood is a concept map for Metro Vancouver that matches
              neighbours, students, and local organizations in real time – so
              an extra meal, jacket, or hour between classes actually reaches
              someone who needs it.
            </p>

            <ul className="landing-points">
              <li>See nearby food banks, shelters, and grassroots orgs on a map.</li>
              <li>Filter by what you have: meals, clothing, time, or funds.</li>
              <li>Walk in with confidence knowing what each place accepts.</li>
            </ul>

            <div className="landing-tags">
              <span className="landing-tag">Vancouver-first</span>
              <span className="landing-tag">Social good</span>
              <span className="landing-tag">Students & neighbours</span>
            </div>
          </div>

          {/* Right: centered "Start NeighborGood" panel */}
          <div className="landing-hero-right">
            <div className="landing-start-wrapper">
              <div className="landing-login-panel">
                <h2>Start NeighborGood</h2>
                <p>
                  Enter your name to explore the interactive map prototype and
                  discover organizations near you.
                </p>

                <form className="landing-login-form" onSubmit={handleSubmit}>
                  <label htmlFor="login-name">Name</label>
                  <input
                    id="login-name"
                    type="text"
                    placeholder="e.g. David"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <button className="button landing-login-button" type="submit">
                    Continue to map
                  </button>
                </form>

                <p className="landing-login-note">
                  No password needed for this prototype. A full version would
                  support separate neighbour and organization accounts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="landing-section reveal-section"
        >
          <h2 className="landing-section-title">How NeighborGood could work</h2>

          <div className="landing-section-grid">
            <div className="landing-section-card">
              <div className="section-icon-container">
                <div className="section-icon icon-have" />
              </div>
              <h3>Tell the app what you have</h3>
              <p>
                “I have 3 extra meals”, “I have a bag of clothes”, or “I can
                volunteer for 1 hour.” Quick presets make it easy to act on
                impulse instead of putting it off.
              </p>
            </div>

            <div className="landing-section-card">
              <div className="section-icon-container">
                <div className="section-icon icon-map" />
              </div>
              <h3>See the closest, most relevant orgs</h3>
              <p>
                The map shows food banks, shelters, and student-led projects
                that match what you can give, sorted by distance and urgency.
              </p>
            </div>

            <div className="landing-section-card">
              <div className="section-icon-container">
                <div className="section-icon icon-badge" />
              </div>
              <h3>Track small streaks of impact</h3>
              <p>
                Each visit earns NeighborGood points: not for clout, but to
                nudge consistent micro-actions over time and highlight
                under-supported organizations.
              </p>
            </div>
          </div>
        </section>

        {/* For neighbours & students */}
        <section
          id="for-neighbours"
          className="landing-section landing-section-neighbours reveal-section"
        >
          <h2 className="landing-section-title">For neighbours &amp; students</h2>

          <div className="landing-section-wide">
            <div className="line-illustration line-illustration-neighbours">
              <div className="line-person line-person-1" />
              <div className="line-person line-person-2" />
              <div className="line-bag" />
              <div className="line-dashed-path" />
            </div>

            <div className="landing-section-text">
              <p>
                Maybe you cooked too much dinner, have an extra bag of clothing,
                or can give an hour between classes. NeighborGood turns those
                small, everyday moments into support for local organizations
                that are usually hard to find.
              </p>
              <p>
                Instead of doomscrolling or feeling guilty, you can open the
                map, see who is closest and most in need, and walk there with
                clear, up-to-date info about what they accept.
              </p>
            </div>
          </div>
        </section>

        {/* For organizations */}
        <section
          id="for-organizations"
          className="landing-section landing-section-orgs reveal-section"
        >
          <h2 className="landing-section-title">For organizations</h2>

          <div className="landing-section-wide">
            <div className="line-illustration line-illustration-orgs">
              <div className="line-building" />
              <div className="line-box line-box-1" />
              <div className="line-box line-box-2" />
              <div className="line-sparkle line-sparkle-1" />
              <div className="line-sparkle line-sparkle-2" />
            </div>

            <div className="landing-section-text">
              <p>
                Smaller food banks, grassroots mutual aid groups, and
                student-led projects often rely on word-of-mouth. NeighborGood
                gives you a dedicated place on the map so nearby donors can
                discover you and bring the right kind of help.
              </p>
              <p>
                Through the “Register your org” concept in the app, we imagine
                onboarding local partners and building a shared, community-owned
                directory for Vancouver.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
