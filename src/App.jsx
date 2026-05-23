import { useState, useEffect, useRef } from "react";

const ACCENT = "#3bf5c7";
const ACCENT2 = "#f5823b";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "React", level: 90, cat: "Frontend", icon: "⚛", color: "#61dafb" },
  { name: "JavaScript", level: 88, cat: "Frontend", icon: "JS", color: "#f7df1e" },
  { name: "HTML & CSS", level: 93, cat: "Frontend", icon: "</>", color: "#e34f26" },
  { name: "Java & Spring Boot", level: 82, cat: "Backend", icon: "☕", color: "#6aad3d" },
  { name: "SQL & MySQL", level: 80, cat: "Database", icon: "⛁", color: "#00758f" },
  { name: "Git & GitHub", level: 86, cat: "DevOps", icon: "⎇", color: "#f05032" },
];

const PROJECTS = [
  {
    title: "SplitEase",
    desc: "Group expense splitter that auto-calculates who owes whom using a debt-simplification algorithm. Add friends, log shared bills, and settle up — no more awkward math after trips or dinners.",
    tags: ["React", "Spring Boot", "MySQL", "REST API", "JWT Auth"],
    color: "#3bf5c7",
    icon: "⚖",
    badge: "Full Stack",
  },
  {
    title: "CodeVault",
    desc: "A personal snippet manager for developers — save, tag, search, and syntax-highlight code snippets across any language. Think a self-hosted GitHub Gist with smart organization and instant search.",
    tags: ["React", "Java", "MySQL", "GitHub", "CSS"],
    color: "#f5823b",
    icon: "◈",
    badge: "Developer Tool",
  },
  {
    title: "CampusAlert",
    desc: "College notice board with role-based access — admins post events and announcements, students RSVP and filter by department. Includes a Spring Boot scheduler for automated reminders.",
    tags: ["React", "Spring Boot", "MySQL", "Spring Scheduler", "Git"],
    color: "#a78bfa",
    icon: "◎",
    badge: "Full Stack",
  },
];

const CONTACT = [
  { label: "Email", value: "aa30340a@gmail.com", icon: "✉", href: "mailto:aa30340a@gmail.com" },
  { label: "GitHub", value: "github.com/testgithubabhishek", icon: "⎇", href: "https://github.com/testgithubabhishek" },
  { label: "LinkedIn", value: "linkedin.com/in/abhishek-singh-8bb183251", icon: "in", href: "https://www.linkedin.com/in/abhishek-singh-8bb183251/" },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function SkillBar({ name, level, cat, icon, color, inView, delay }) {
  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        padding: "18px 20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{
          width: 36, height: 36, display: "flex", alignItems: "center",
          justifyContent: "center", borderRadius: 10, flexShrink: 0,
          background: `${color}15`, color, fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700, fontSize: 12,
        }}>{icon}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: "#e8eaf0", fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
          <div style={{ color: "#6b7280", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>{cat}</div>
        </div>
        <div style={{ marginLeft: "auto", color: ACCENT, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
          {inView ? level : 0}%
        </div>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.06)" }}>
        <div style={{
          height: "100%", borderRadius: 99,
          width: inView ? `${level}%` : "0%",
          background: `linear-gradient(90deg, ${color}, ${ACCENT})`,
          transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay + 200}ms`,
          boxShadow: `0 0 12px ${color}60`,
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ title, desc, tags, color, icon, badge, inView, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, box-shadow 0.3s ease`,
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? color + "50" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 18,
        padding: "24px 22px 20px",
        cursor: "default",
        boxShadow: hovered ? `0 0 40px ${color}18` : "none",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 8 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, flexShrink: 0,
          background: `${color}15`, border: `1px solid ${color}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 20,
        }}>{icon}</div>
        <span style={{
          fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
          padding: "4px 10px", borderRadius: 99,
          background: `${color}15`, color, border: `1px solid ${color}30`,
          letterSpacing: "0.05em", whiteSpace: "nowrap",
        }}>{badge}</span>
      </div>
      <div style={{
        color: "#e8eaf0", fontFamily: "'Syne', sans-serif",
        fontWeight: 700, fontSize: 18, marginBottom: 10,
      }}>{title}</div>
      <div style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.75, marginBottom: 20, flex: 1 }}>{desc}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {tags.map(t => (
          <span key={t} style={{
            fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
            padding: "3px 9px", borderRadius: 99,
            background: "rgba(255,255,255,0.05)", color: "#9ca3af",
            border: "1px solid rgba(255,255,255,0.09)",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Orb({ style }) {
  return (
    <div style={{
      position: "absolute", borderRadius: "50%",
      filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      ...style,
    }} />
  );
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [typed, setTyped] = useState("");
  const [heroVisible, setHeroVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [skillsRef, skillsInView] = useInView();
  const [projRef, projInView] = useInView();
  const [aboutRef, aboutInView] = useInView();
  const [contactRef, contactInView] = useInView();

  const roles = ["Aspiring Full Stack Dev", "React Enthusiast", "Spring Boot Learner", "Open to Internships"];
  const roleIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);
  const pauseRef = useRef(false);

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600;700&display=swap";
    link1.rel = "stylesheet";
    document.head.appendChild(link1);
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const typeInterval = setInterval(() => {
      if (pauseRef.current) return;
      const currentRole = roles[roleIndex.current];
      if (!deleting.current) {
        if (charIndex.current < currentRole.length) {
          setTyped(currentRole.slice(0, ++charIndex.current));
        } else {
          pauseRef.current = true;
          setTimeout(() => { deleting.current = true; pauseRef.current = false; }, 1800);
        }
      } else {
        if (charIndex.current > 0) {
          setTyped(currentRole.slice(0, --charIndex.current));
        } else {
          deleting.current = false;
          roleIndex.current = (roleIndex.current + 1) % roles.length;
        }
      }
    }, 80);
    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#07080f", color: "#e8eaf0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #07080f; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: ${ACCENT}50; border-radius: 99px; }

        .nav-link {
          color: #9ca3af; font-size: 14px; font-weight: 500; cursor: pointer;
          text-decoration: none; position: relative; padding-bottom: 3px;
          transition: color 0.25s ease; font-family: 'DM Sans', sans-serif;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1.5px;
          background: ${ACCENT}; transition: width 0.3s ease;
        }
        .nav-link:hover { color: ${ACCENT}; }
        .nav-link:hover::after { width: 100%; }

        .btn-primary {
          padding: 14px 32px; border-radius: 12px; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 15px;
          background: linear-gradient(135deg, ${ACCENT}, #00a986);
          color: #07080f; transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px ${ACCENT}40; }

        .btn-secondary {
          padding: 14px 32px; border-radius: 12px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 15px;
          background: transparent; color: ${ACCENT};
          border: 1.5px solid ${ACCENT}50; transition: all 0.2s ease;
        }
        .btn-secondary:hover { background: ${ACCENT}12; border-color: ${ACCENT}; transform: translateY(-2px); }

        .contact-card:hover { border-color: ${ACCENT}50 !important; background: rgba(59,245,199,0.04) !important; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }

        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .about-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .hero-stats { display: flex; gap: 32px; margin-top: 60px; flex-wrap: wrap; }
        .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
        .section-pad { padding: 90px 48px; }
        .nav-desktop { display: flex; }
        .nav-mobile { display: none; }
        .hamburger { display: none; }
        .mobile-menu { display: none; }

        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .section-pad { padding: 70px 24px; }
        }

        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr; }
          .projects-grid { grid-template-columns: 1fr; }
          .about-cards { grid-template-columns: 1fr 1fr; }
          .hero-stats { gap: 20px; }
          .hero-buttons { flex-direction: column; }
          .hero-buttons .btn-primary, .hero-buttons .btn-secondary { width: 100%; text-align: center; }
          .section-pad { padding: 60px 20px; }
          .nav-desktop { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: block; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: 64,
        background: scrolled ? "rgba(7,8,15,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        <div style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20,
          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", cursor: "pointer",
        }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{"<AS />"}</div>

        {/* Desktop nav */}
        <ul className="nav-desktop" style={{ gap: 32, listStyle: "none" }}>
          {NAV_LINKS.map(l => (
            <li key={l}><a className="nav-link" onClick={() => scrollTo(l)}>{l}</a></li>
          ))}
        </ul>
        <button className="btn-primary nav-desktop" style={{ padding: "9px 20px", fontSize: 13, borderRadius: 9 }}
          onClick={() => scrollTo("Contact")}>Hire Me</button>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: "none", cursor: "pointer", padding: 8,
          display: "flex", flexDirection: "column", gap: 5,
        }}>
          <span style={{ width: 22, height: 2, background: menuOpen ? ACCENT : "#9ca3af", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ width: 22, height: 2, background: menuOpen ? ACCENT : "#9ca3af", borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 22, height: 2, background: menuOpen ? ACCENT : "#9ca3af", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu" style={{
        position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
        background: "rgba(7,8,15,0.98)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid rgba(255,255,255,0.07)`,
        padding: menuOpen ? "20px 24px 24px" : "0 24px",
        maxHeight: menuOpen ? 300 : 0,
        overflow: "hidden",
        transition: "all 0.35s ease",
      }}>
        {NAV_LINKS.map(l => (
          <div key={l} onClick={() => scrollTo(l)} style={{
            padding: "14px 0", color: "#9ca3af", fontSize: 16, fontWeight: 500,
            borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = ACCENT}
            onMouseLeave={e => e.target.style.color = "#9ca3af"}
          >{l}</div>
        ))}
        <button className="btn-primary" style={{ marginTop: 16, width: "100%", padding: "12px", fontSize: 14 }}
          onClick={() => scrollTo("Contact")}>Hire Me</button>
      </div>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden", padding: "0 24px",
      }}>
        <Orb style={{ width: 400, height: 400, background: `${ACCENT}15`, top: -80, right: -80, animation: "float 8s ease-in-out infinite" }} />
        <Orb style={{ width: 250, height: 250, background: `${ACCENT2}12`, bottom: 50, left: -60, animation: "float 10s ease-in-out infinite 2s" }} />

        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `linear-gradient(rgba(59,245,199,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,245,199,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", width: "100%", paddingTop: 80 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,
            padding: "7px 16px", borderRadius: 99,
            background: `${ACCENT}12`, border: `1px solid ${ACCENT}30`,
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, animation: "pulse-dot 2s infinite", flexShrink: 0 }} />
            <span style={{ color: ACCENT, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>Available for opportunities</span>
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(38px, 8vw, 82px)", lineHeight: 1.05, marginBottom: 18,
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease 0.1s",
          }}>
            Hello, I'm<br />
            <span style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #00c4a8 50%, ${ACCENT2} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Abhishek Singh
            </span>
          </h1>

          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 24, flexWrap: "wrap",
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease 0.2s",
          }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(16px, 3vw, 24px)", fontWeight: 600, color: "#9ca3af" }}>// </span>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(16px, 3vw, 24px)", fontWeight: 700, color: "#c9ccd6" }}>{typed}</span>
            <span style={{ width: 3, height: "1.2em", background: ACCENT, display: "inline-block", animation: "pulse-dot 0.8s steps(1) infinite", borderRadius: 2 }} />
          </div>

          <p style={{
            color: "#6b7280", fontSize: "clamp(14px, 2vw, 17px)", lineHeight: 1.8,
            maxWidth: 560, marginBottom: 36,
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease 0.3s",
          }}>
            I build end-to-end web applications — clean React UIs connected to Spring Boot APIs, backed by structured MySQL databases. Fresh grad, eager to contribute and grow.
          </p>

          <div className="hero-buttons" style={{
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease 0.4s",
          }}>
            <button className="btn-primary" onClick={() => scrollTo("Projects")}>View My Work</button>
            <button className="btn-secondary" onClick={() => scrollTo("Contact")}>Get In Touch</button>
          </div>

          <div className="hero-stats" style={{ opacity: heroVisible ? 1 : 0, transition: "all 0.9s ease 0.6s" }}>
            {[["CS", "Graduate 2025"], ["3", "Projects Built"], ["6+", "Technologies"], ["∞", "Curiosity"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: ACCENT }}>{n}</div>
                <div style={{ color: "#6b7280", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }} ref={aboutRef}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>About Me</div>
          <div className="about-grid" style={{ marginTop: 16 }}>
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1.1, marginBottom: 20 }}>
                A fresher who<br /><span style={{ color: ACCENT }}>builds end to end</span>
              </h2>
              <p style={{ color: "#9ca3af", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
                I'm a Computer Science graduate with a strong foundation in full-stack development. I enjoy building things from scratch — designing React UIs, wiring up Spring Boot REST APIs, and thinking through database schemas in MySQL.
              </p>
              <p style={{ color: "#9ca3af", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
                I'm actively looking for internship or entry-level opportunities where I can learn fast, contribute meaningfully, and grow alongside a great team.
              </p>
              <button className="btn-primary" style={{ fontSize: 14, padding: "12px 24px" }}>Download CV</button>
            </div>

            <div className="about-cards" style={{
              opacity: aboutInView ? 1 : 0, transform: aboutInView ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.8s ease 0.2s",
            }}>
              {[
                { icon: "⚛", label: "Frontend Dev", sub: "React & JS expert", c: "#61dafb" },
                { icon: "☕", label: "Backend Dev", sub: "Spring Boot APIs", c: "#6aad3d" },
                { icon: "⛁", label: "Database", sub: "MySQL & SQL", c: "#00758f" },
                { icon: "⎇", label: "Version Control", sub: "Git & GitHub", c: ACCENT2 },
              ].map(({ icon, label, sub, c }) => (
                <div key={label} style={{ padding: "20px 16px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
                  <div style={{ fontSize: 26, marginBottom: 10, color: c, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: "#6b7280", fontSize: 11 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section-pad" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }} ref={skillsRef}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Technical Skills</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1.1, marginBottom: 8 }}>My Tech Stack</h2>
          <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 40 }}>Technologies I've studied, practiced, and built real projects with.</p>
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <SkillBar key={s.name} {...s} inView={skillsInView} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section-pad">
        <div style={{ maxWidth: 1100, margin: "0 auto" }} ref={projRef}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Projects</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1.1, marginBottom: 8 }}>Things I've Built</h2>
          <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 40 }}>Projects I've designed and built end-to-end — each one solving a real problem.</p>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} {...p} inView={projInView} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-pad" style={{ position: "relative", overflow: "hidden" }}>
        <Orb style={{ width: 350, height: 350, background: `${ACCENT}10`, bottom: -80, right: -80 }} />
        <div style={{ maxWidth: 660, margin: "0 auto", textAlign: "center" }} ref={contactRef}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Contact</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1.1, marginBottom: 16 }}>
            Let's Work<br /><span style={{ color: ACCENT }}>Together</span>
          </h2>
          <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.75, marginBottom: 44 }}>
            I'm actively looking for internship or entry-level roles. If you have an opportunity or just want to connect — my inbox is always open.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {CONTACT.map(({ label, value, icon, href }, i) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-card"
                style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "16px 20px",
                  borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.025)",
                  opacity: contactInView ? 1 : 0,
                  transform: contactInView ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${i * 100}ms, border-color 0.25s, background 0.25s`,
                  cursor: "pointer", textAlign: "left", textDecoration: "none", minWidth: 0,
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: `${ACCENT}15`, display: "flex", alignItems: "center",
                  justifyContent: "center", color: ACCENT,
                  fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 13,
                }}>{icon}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: "#6b7280", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", marginBottom: 2 }}>{label}</div>
                  <div style={{ color: "#e8eaf0", fontWeight: 500, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
                </div>
                <div style={{ marginLeft: "auto", color: "#4b5563", fontSize: 16, flexShrink: 0 }}>→</div>
              </a>
            ))}
          </div>
          <a href="mailto:aa30340a@gmail.com" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ marginTop: 32, width: "100%", padding: "15px" }}>
              Send Me a Message ✉
            </button>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign: "center", padding: "24px 20px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        color: "#4b5563", fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
      }}>
        <span>Designed & built by </span>
        <span style={{ color: ACCENT }}>Abhishek Singh</span>
        <span> · {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
