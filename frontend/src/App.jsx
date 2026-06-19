import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const GITHUB_AVATAR = 'https://avatars.githubusercontent.com/u/105700462?v=4';

/* ─── SVG ICONS ─── */
const QueenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="queen-svg">
    <path d="M4 19h16v-2H4v2z" fill="rgba(251, 191, 36, 0.2)" />
    <path d="M5 17h14" />
    <path d="M5 17l1-9 4 5 2-8 2 8 4-5 1 9H5z" fill="currentColor" />
    <circle cx="6" cy="7" r="1.2" fill="currentColor" />
    <circle cx="10" cy="12" r="1.2" fill="currentColor" />
    <circle cx="12" cy="4" r="1.5" fill="currentColor" />
    <circle cx="14" cy="12" r="1.2" fill="currentColor" />
    <circle cx="18" cy="7" r="1.2" fill="currentColor" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px', marginRight: '10px', color: 'var(--color-studio-ink)', flexShrink: 0 }}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px' }}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

/* ─── NEW SKILLS CATEGORY ICONS ─── */
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px', opacity: 0.6 }}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const ServerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px', opacity: 0.6 }}>
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px', opacity: 0.6 }}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px', opacity: 0.6 }}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const CompassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px', opacity: 0.6 }}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

/* ─── FLOATING PARTICLES ─── */
function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" />;
}

/* ─── CONFETTI BURST ─── */
function ConfettiBurst({ show }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!show) { setPieces([]); return; }
    const colors = ['#00e5ff', '#8b5cf6', '#ec4899', '#fbbf24', '#10b981', '#f59e0b'];
    const newPieces = [];
    for (let i = 0; i < 80; i++) {
      newPieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 8,
        rotation: Math.random() * 360,
      });
    }
    setPieces(newPieces);
    const timer = setTimeout(() => setPieces([]), 4000);
    return () => clearTimeout(timer);
  }, [show]);

  if (pieces.length === 0) return null;

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotateZ(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── TYPING EFFECT HOOK ─── */
function useTypingEffect(text, speed = 80, startDelay = 500) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(startTimer);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/* ─── DATA ─── */
const PROJECTS = [
  {
    name: 'E-Commerce Web App',
    description: 'Built a full-stack e-commerce platform using Spring Boot and React with 10+ REST APIs for products, cart, authentication, and order management.',
    tech: ['Spring Boot', 'React', 'MySQL', 'JWT', 'Hibernate'],
    image: '/ecommerce_project.png',
    url: 'https://github.com/BimanshuKumar23',
  },
  {
    name: 'AR Projectile Motion',
    description: 'AR simulator in Unity with real-time trajectory, velocity, and acceleration visualization on Android.',
    tech: ['Unity', 'C#', 'Android', 'AR'],
    image: '/ar_projectile.png',
    url: 'https://github.com/BimanshuKumar23/Study-of-Projectile-Motion-Using-Augmented-Reality',
  },
  {
    name: 'Career Website',
    description: 'A career website built with Flask for job listings and company pages.',
    tech: ['Flask', 'Python', 'HTML', 'CSS'],
    image: '/career_website.png',
    url: 'https://github.com/BimanshuKumar23/career_website',
  },
  {
    name: 'Bus Pass Management',
    description: 'System to manage bus passes on daily, monthly, and yearly basis with a full frontend.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    image: '/bus_pass.png',
    url: 'https://github.com/BimanshuKumar23/Buss-Pass-Management-System',
  },
  {
    name: 'Varanasi Tourism',
    description: 'Tourist guide website for visitors exploring the temples and ghats of Varanasi.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/varanasi_tourism.png',
    url: 'https://github.com/BimanshuKumar23/Varanasi-The-city-of-Temple',
  },
  {
    name: 'Typing Speed Test',
    description: 'GUI application to measure typing speed with accuracy tracking and WPM scoring.',
    tech: ['Python', 'Tkinter'],
    image: '/typing_speed.png',
    url: 'https://github.com/BimanshuKumar23/Typing-Speed',
  },
  {
    name: 'PhoneBook DSA',
    description: 'Phonebook application implementing core data structures — linked lists, hashing, and search algorithms.',
    tech: ['C', 'DSA'],
    image: '/phonebook_project.png',
    url: 'https://github.com/BimanshuKumar23/PhoneBook_Mini_Project',
  },
];

const SKILLS = [
  { category: 'Programming', items: ['Java', 'Python'] },
  { category: 'Backend', items: ['JDBC', 'JEE', 'JSP', 'Spring Boot', 'Hibernate'] },
  { category: 'Frontend', items: ['React', 'HTML', 'CSS'] },
  { category: 'Database', items: ['MySQL', 'PostgreSQL'] },
  { category: 'Core Concepts', items: ['OOPs', 'Data Structures & Algorithms', 'Networking'] },
];

/* ─── LOCAL N-QUEENS SOLVER FALLBACK FOR 10/10 ROBUSTNESS ─── */
const SOLUTIONS_5X5 = [
  [0, 2, 4, 1, 3],
  [0, 3, 1, 4, 2],
  [1, 3, 0, 2, 4],
  [1, 4, 2, 0, 3],
  [2, 0, 3, 1, 4],
  [2, 4, 1, 3, 0],
  [3, 0, 2, 4, 1],
  [3, 1, 4, 2, 0],
  [4, 1, 3, 0, 2],
  [4, 2, 0, 3, 1]
];

const isValidPlacementLocal = (placedQueens) => {
  if (placedQueens.length === 0) return true;
  for (let i = 0; i < placedQueens.length; i++) {
    for (let j = i + 1; j < placedQueens.length; j++) {
      const q1 = placedQueens[i];
      const q2 = placedQueens[j];
      if (q1.row === q2.row || q1.col === q2.col || Math.abs(q1.row - q2.row) === Math.abs(q1.col - q2.col)) {
        return false;
      }
    }
  }
  return SOLUTIONS_5X5.some((sol) => {
    return placedQueens.every((q) => sol[q.row] === q.col);
  });
};

const NAV_SECTIONS = [
  { id: 'board-section', label: 'Puzzle' },
  { id: 'about-section', label: 'About Me' },
  { id: 'contact-section', label: 'Contact' },
  { id: 'experience-section', label: 'Experience' },
  { id: 'projects-section', label: 'Projects' },
  { id: 'skills-section', label: 'Skills' },
  { id: 'education-section', label: 'Education' },
];

/* ─── MAIN APP ─── */
function App() {
  const n = 5;
  const [visitorName, setVisitorName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [placedQueens, setPlacedQueens] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(-1);
  const [isValidPosition, setIsValidPosition] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [activeSection, setActiveSection] = useState('board-section');
  const [hasScrolledOnSolve, setHasScrolledOnSolve] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const aboutRef = useRef(null);

  // Typing effect for header
  const headerText = nameSubmitted && visitorName
    ? `Welcome ${visitorName}!`
    : 'Bimanshu Kumar';
  const { displayed: typedHeader, done: typingDone } = useTypingEffect(headerText, 70, 300);

  // IntersectionObserver for section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: '-10% 0px -10% 0px' }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Check conflicts
  const getConflicts = useCallback(() => {
    const conflicts = new Set();
    for (let i = 0; i < placedQueens.length; i++) {
      for (let j = i + 1; j < placedQueens.length; j++) {
        const q1 = placedQueens[i];
        const q2 = placedQueens[j];
        if (
          q1.row === q2.row ||
          q1.col === q2.col ||
          Math.abs(q1.row - q2.row) === Math.abs(q1.col - q2.col)
        ) {
          conflicts.add(`${q1.row},${q1.col}`);
          conflicts.add(`${q2.row},${q2.col}`);
        }
      }
    }
    return conflicts;
  }, [placedQueens]);

  const conflicts = getConflicts();
  const hasConflicts = conflicts.size > 0;

  // Auto-validate using Java Backend (with offline fallback logic)
  useEffect(() => {
    const validatePlacements = async () => {
      if (placedQueens.length === 0) {
        setIsValidPosition(true);
        setError(null);
        return;
      }

      if (hasConflicts) {
        setIsValidPosition(false);
        setError("Conflict detected! Queens cannot attack each other.");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/solve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ size: n, placedQueens }),
        });

        if (!response.ok) throw new Error("Server error");
        const data = await response.json();

        if (data.solutions && data.solutions.length > 0) {
          setIsValidPosition(true);
          setError(null);
          setSolutions(data.solutions);
        } else {
          setIsValidPosition(false);
          setError("Invalid position! This layout cannot lead to a valid 5-Queens solution.");
        }
      } catch (err) {
        console.warn("Backend offline, running local N-Queens fallback validator.");
        const isValid = isValidPlacementLocal(placedQueens);
        if (isValid) {
          setIsValidPosition(true);
          setError(null);
        } else {
          setIsValidPosition(false);
          setError("Invalid position! This layout cannot lead to a valid 5-Queens solution.");
        }
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      validatePlacements();
    }, 150);

    return () => clearTimeout(delayDebounceFn);
  }, [placedQueens, hasConflicts]);

  // Computed
  const validQueensCount = isValidPosition ? placedQueens.length : 0;

  // Auto-scroll + confetti when puzzle solved
  useEffect(() => {
    if (validQueensCount === 5 && !hasScrolledOnSolve) {
      setShowConfetti(true);
      setTimeout(() => {
        if (aboutRef.current) {
          aboutRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 800);
      setHasScrolledOnSolve(true);
      setTimeout(() => setShowConfetti(false), 4500);
    }
    if (validQueensCount < 5) {
      setHasScrolledOnSolve(false);
    }
  }, [validQueensCount, hasScrolledOnSolve]);

  const isCellUnderAttack = (row, col) => {
    return placedQueens.some(
      (q) =>
        !(q.row === row && q.col === col) &&
        (q.row === row || q.col === col || Math.abs(q.row - row) === Math.abs(q.col - col))
    );
  };

  const isCellHoverAttack = (row, col) => {
    if (!hoveredCell) return false;
    const { row: hRow, col: hCol } = hoveredCell;
    return (
      !(hRow === row && hCol === col) &&
      (hRow === row || hCol === col || Math.abs(hRow - row) === Math.abs(hCol - col))
    );
  };

  const handleCellClick = (row, col) => {
    if (currentSolutionIndex >= 0) {
      setPlacedQueens([]);
      setCurrentSolutionIndex(-1);
      return;
    }

    const exists = placedQueens.some((q) => q.row === row && q.col === col);
    if (exists) {
      setPlacedQueens(placedQueens.filter((q) => !(q.row === row && q.col === col)));
    } else {
      if (placedQueens.length >= n) {
        setError(`All ${n} queens are already placed.`);
        return;
      }
      setPlacedQueens([...placedQueens, { row, col }]);
    }
  };

  const handleClear = () => {
    setPlacedQueens([]);
    setSolutions([]);
    setCurrentSolutionIndex(-1);
    setIsValidPosition(true);
    setError(null);
  };

  const hasQueen = (row, col) => {
    return placedQueens.some((q) => q.row === row && q.col === col);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <ParticleBackground />
      <ConfettiBurst show={showConfetti} />

      {/* ─── TOP NAVIGATION BAR ─── */}
      <nav className="top-navbar" aria-label="Main navigation">
        <a href="#board-section" className="nav-wordmark" onClick={(e) => { e.preventDefault(); scrollToSection('board-section'); }}>
          Bimanshu Kumar
        </a>
        <div className="nav-links">
          {NAV_SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              className={`nav-link-item ${activeSection === id ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
              href={`#${id}`}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="nav-status">
          <div className="status-dot" />
          <span>Available for work</span>
        </div>
      </nav>

      <div className="app-container">
        {/* ─── NAV SIDEBAR DOTS ─── */}
        <nav className="nav-sidebar" aria-label="Section navigation">
          {NAV_SECTIONS.map(({ id, label }) => (
            <div
              key={id}
              className={`nav-dot ${activeSection === id ? 'active' : ''}`}
              onClick={() => scrollToSection(id)}
              role="button"
              aria-label={`Navigate to ${label}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSection(id)}
            >
              <span className="nav-dot-tooltip">{label}</span>
            </div>
          ))}
        </nav>

        {/* ─── HEADER ─── */}
        <header className="app-header">
          <div className="header-profile">
            <img
              src={GITHUB_AVATAR}
              alt="Bimanshu Kumar"
              className="profile-avatar"
            />
            <h1>
              {typedHeader}
              {!typingDone && <span className="typing-cursor" />}
            </h1>
          </div>
          <p className="subtitle">
            Solve the 5×5 N-Queens puzzle to progressively unlock sections of my portfolio
          </p>
          {/* Queen progress indicator */}
          <div className="queen-progress">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`queen-progress-dot ${
                  i < validQueensCount ? 'filled' : ''
                } ${i < placedQueens.length && !isValidPosition ? 'error' : ''}`}
              />
            ))}
            <span className="queen-progress-label">
              {validQueensCount}/5 Queens
            </span>
          </div>
        </header>

        {/* ─── CHESS BOARD HERO ─── */}
        <section id="board-section" className="board-section glass-card">
          {/* Visitor greeting */}
          {!nameSubmitted && (
            <div style={{ marginBottom: '1.5rem', width: '100%', maxWidth: '420px' }}>
              <label className="control-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
                Introduce Yourself
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  id="visitor-name-input"
                  type="text"
                  className="visitor-input"
                  placeholder="Enter your name..."
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (!visitorName.trim()) setVisitorName('Guest');
                      setNameSubmitted(true);
                    }
                  }}
                />
                <button
                  id="visitor-submit-btn"
                  className="btn-action btn-primary"
                  style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', fontSize: '0.9rem', flexShrink: 0 }}
                  onClick={() => {
                    if (!visitorName.trim()) setVisitorName('Guest');
                    setNameSubmitted(true);
                  }}
                >
                  Enter
                </button>
              </div>
            </div>
          )}

          <div className="board-container">
            <div
              className="board"
              style={{
                gridTemplateColumns: `repeat(${n}, 1fr)`,
                gridTemplateRows: `repeat(${n}, 1fr)`,
              }}
            >
              {Array.from({ length: n }).map((_, r) =>
                Array.from({ length: n }).map((_, c) => {
                  const isLight = (r + c) % 2 === 0;
                  const cellHasQueen = hasQueen(r, c);
                  const isConflicting = cellHasQueen && conflicts.has(`${r},${c}`);
                  const isUnderPlacedAttack = isCellUnderAttack(r, c);
                  const isUnderHoverAttack = isCellHoverAttack(r, c);

                  let cellClass = `cell ${isLight ? 'light' : 'dark'}`;
                  if (isConflicting || (cellHasQueen && !isValidPosition)) cellClass += ' conflict';
                  else if (cellHasQueen && isValidPosition && validQueensCount === 5) cellClass += ' solved-queen';
                  else if (isUnderPlacedAttack) cellClass += ' under-attack-direct';
                  else if (isUnderHoverAttack) cellClass += ' under-attack';

                  return (
                    <div
                      key={`${r}-${c}`}
                      id={`cell-${r}-${c}`}
                      className={cellClass}
                      onClick={() => handleCellClick(r, c)}
                      onMouseEnter={() => currentSolutionIndex === -1 && setHoveredCell({ row: r, col: c })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      {cellHasQueen && (
                        <div className="queen-container">
                          <QueenIcon />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="button-grid" style={{ width: '100%', maxWidth: '420px', marginTop: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button id="clear-btn" className="btn-action btn-secondary" onClick={handleClear} disabled={loading}>
              Clear Board
            </button>
            <button
              id="solve-btn"
              className="btn-action btn-primary"
              onClick={() => {
                // Instantly place a valid 5x5 N-Queens solution
                setPlacedQueens([
                  { row: 0, col: 0 },
                  { row: 1, col: 2 },
                  { row: 2, col: 4 },
                  { row: 3, col: 1 },
                  { row: 4, col: 3 }
                ]);
              }}
              disabled={loading}
            >
              ⚡ Quick Solve
            </button>
          </div>

          {error && (
            <div className="status-alert warning" style={{ marginTop: '1rem', width: '100%', maxWidth: '420px' }}>
              <span>⚠️</span>
              <div>{error}</div>
            </div>
          )}

          {!error && (
            <div className={`status-alert ${validQueensCount === 5 ? 'success celebration-glow' : 'info'}`} style={{ marginTop: '1rem', width: '100%', maxWidth: '420px' }}>
              <span>{validQueensCount === 5 ? '🎉' : 'ℹ️'}</span>
              <div>
                {validQueensCount === 0 && "Place your first queen to unlock Contact Details!"}
                {validQueensCount === 1 && "Great! Place a 2nd queen safely to unlock Experience."}
                {validQueensCount === 2 && "Awesome! Place a 3rd queen to unlock Projects."}
                {validQueensCount === 3 && "You're doing great! Place a 4th queen to unlock Skills."}
                {validQueensCount === 4 && "Almost there! Place the 5th queen to complete the board!"}
                {validQueensCount === 5 && "Congratulations! Full portfolio unlocked! Scroll down ↓"}
              </div>
            </div>
          )}
        </section>

        {/* ─── ABOUT SECTION (always visible) ─── */}
        <section id="about-section" ref={aboutRef} className={`portfolio-card unlocked ${activeSection === 'about-section' ? 'section-active' : ''}`}>
          <h2>👤 About Me</h2>
          <div className="about-content">
            <img src={GITHUB_AVATAR} alt="Bimanshu Kumar" className="about-avatar" />
            <div>
              <p className="about-text">
                Full-stack Java Developer with hands-on experience in Spring Boot, React, REST APIs, MySQL, and cloud deployment.
                Skilled in building scalable web applications with secure authentication, database integration, and responsive user interfaces.
                Strong foundation in DSA, OOP, Java, and Software Engineering. Seeking Backend or Full-Stack Developer roles.
              </p>
              <div className="about-actions">
                <a href="/Bimanshu_Kumar_.pdf?v=2" download className="btn-resume">
                  <DownloadIcon />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PORTFOLIO SECTIONS STACK ─── */}
        <div className="portfolio-stack">

          {/* CONTACT (1 Queen) */}
          {validQueensCount >= 1 ? (
            <div id="contact-section" className={`portfolio-card unlocked fade-in ${activeSection === 'contact-section' ? 'section-active' : ''}`}>
              <h2>📞 Contact Details</h2>
              <div className="contact-grid">
                <div className="contact-item"><strong>Email:</strong> <a href="mailto:kumarbimanshu99@gmail.com">kumarbimanshu99@gmail.com</a></div>
                <div className="contact-item"><strong>Phone:</strong> +91 6299247393</div>
                <div className="contact-item"><strong>Location:</strong> Bengaluru, Karnataka</div>
                <div className="contact-item"><strong>GitHub:</strong> <a href="https://github.com/BimanshuKumar23" target="_blank" rel="noopener noreferrer">github.com/BimanshuKumar23</a></div>
                <div className="contact-item"><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/bimanshukumar/" target="_blank" rel="noopener noreferrer">linkedin.com/in/bimanshukumar</a></div>
              </div>
            </div>
          ) : (
            <div id="contact-section" className="portfolio-card locked">
              <LockIcon />
              <div>
                <h3>Contact Details</h3>
                <p>Place 1 valid queen to unlock contact info.</p>
              </div>
            </div>
          )}

          {/* EXPERIENCE (2 Queens) */}
          {validQueensCount >= 2 ? (
            <div id="experience-section" className={`portfolio-card unlocked fade-in ${activeSection === 'experience-section' ? 'section-active' : ''}`}>
              <h2>💼 Professional Experience</h2>
              <div className="experience-item" style={{ marginBottom: '1.5rem' }}>
                <div className="experience-header">
                  <span>Java Full Stack Web Developer</span>
                  <span>Apr 2026 – Present</span>
                </div>
                <div className="experience-company">Tap Academy — Bengaluru, India</div>
                <ul className="bullet-list">
                  <li>Developing full-stack web applications using Java, Spring Boot, React, JSP, JDBC, and MySQL.</li>
                  <li>Building RESTful APIs, implementing authentication mechanisms, and integrating relational databases.</li>
                  <li>Collaborating on real-world projects while following software development best practices and version control workflows.</li>
                </ul>
              </div>
              <hr className="section-divider" style={{ margin: '1.25rem 0' }} />
              <div className="experience-item">
                <div className="experience-header">
                  <span>AI & ML Intern</span>
                  <span>Aug 2023 – Sep 2023</span>
                </div>
                <div className="experience-company">AI Robosoft — Bengaluru, India</div>
                <ul className="bullet-list">
                  <li>Collected, cleaned, and preprocessed datasets containing 50,000+ records using Python and SQL, improving data quality and model readiness.</li>
                  <li>Performed Exploratory Data Analysis (EDA) using NumPy, Pandas, Matplotlib, and Seaborn to identify trends and anomalies.</li>
                  <li>Automated repetitive preprocessing workflows through Python scripting, reducing manual effort by approximately 40%.</li>
                  <li>Prepared EDA reports and shared findings with senior engineers to support feature-selection decisions.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div id="experience-section" className="portfolio-card locked">
              <LockIcon />
              <div>
                <h3>Professional Experience</h3>
                <p>Place 2 valid queens to unlock work history.</p>
              </div>
            </div>
          )}

          {/* PROJECTS (3 Queens) */}
          {validQueensCount >= 3 ? (
            <div id="projects-section" className={`portfolio-card unlocked fade-in ${activeSection === 'projects-section' ? 'section-active' : ''}`}>
              <h2>🚀 Projects</h2>
              <div className="projects-grid">
                {PROJECTS.map((project) => (
                  <a
                    key={project.name}
                    className="project-card"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="project-card-image-wrapper">
                      <img src={project.image} alt={project.name} className="project-card-image" loading="lazy" />
                    </div>
                    <div className="project-card-body">
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <div className="project-tech-badges">
                        {project.tech.map((t) => (
                          <span key={t} className="tech-badge">{t}</span>
                        ))}
                      </div>
                      <div className="project-card-link-hint">
                        <ExternalLinkIcon />
                        <span>View on GitHub</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div id="projects-section" className="portfolio-card locked">
              <LockIcon />
              <div>
                <h3>Projects</h3>
                <p>Place 3 valid queens to unlock portfolio projects.</p>
              </div>
            </div>
          )}

          {/* SKILLS (4 Queens) */}
          {validQueensCount >= 4 ? (
            <div id="skills-section" className={`portfolio-card unlocked fade-in ${activeSection === 'skills-section' ? 'section-active' : ''}`}>
              <h2>🛠️ Technical Skills</h2>
              <div className="skills-grid-container">
                {SKILLS.map(({ category, items }, catIdx) => {
                  const iconsMap = {
                    'Programming': <CodeIcon />,
                    'Backend': <ServerIcon />,
                    'Frontend': <MonitorIcon />,
                    'Database': <DatabaseIcon />,
                    'Core Concepts': <CompassIcon />
                  };
                  return (
                    <div key={category} className="skills-category">
                      <div>
                        <div className="skills-category-title">{category}</div>
                        <div className="skills-boxes">
                          {items.map((skill, skillIdx) => {
                            const delay = (catIdx * 0.15) + (skillIdx * 0.05);
                            return (
                              <div
                                key={skill}
                                className="skill-box"
                                style={{ animationDelay: `${delay.toFixed(2)}s` }}
                              >
                                {skill}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="skills-category-icon" style={{ alignSelf: 'flex-end', marginTop: '1rem', color: 'var(--color-studio-ink)' }}>
                        {iconsMap[category]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div id="skills-section" className="portfolio-card locked">
              <LockIcon />
              <div>
                <h3>Technical Skills</h3>
                <p>Place 4 valid queens to unlock skills inventory.</p>
              </div>
            </div>
          )}

          {/* EDUCATION (5 Queens) */}
          {validQueensCount >= 5 ? (
            <div id="education-section" className={`portfolio-card unlocked fade-in ${activeSection === 'education-section' ? 'section-active' : ''}`}>
              <h2>🎓 Education & Achievements</h2>
              <div className="education-item card-atria">
                <div className="education-header">
                  <span>Bachelor of Engineering (CSE)</span>
                  <span>2020 – 2024</span>
                </div>
                <div className="education-institution">Atria Institute of Technology — Bengaluru</div>
                <div className="education-score">CGPA: 8.59 / 10</div>
              </div>
              <div className="education-item card-school">
                <div className="education-header">
                  <span>Higher Secondary (12th Grade)</span>
                  <span>2018 – 2020</span>
                </div>
                <div className="education-institution">Himalayan Public School — Patna</div>
                <div className="education-score">Percentage: 92%</div>
              </div>
              <div className="achievements-item card-achievements">
                <h3>🏆 Key Achievements</h3>
                <ul className="bullet-list" style={{ marginTop: '0.5rem' }}>
                  <li>Successfully developed and deployed multiple academic and full-stack projects using Java, Spring Boot, React, and Unity.</li>
                  <li>Achieved a strong academic record with a CGPA of 8.59 in Computer Science Engineering.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div id="education-section" className="portfolio-card locked">
              <LockIcon />
              <div>
                <h3>Education & Certifications</h3>
                <p>Place 5 valid queens to unlock education & degree details.</p>
              </div>
            </div>
          )}
        </div>

        {/* ─── FOOTER ─── */}
        <footer className="portfolio-footer">
          <div className="footer-social">
            <a href="https://github.com/BimanshuKumar23" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href="https://www.linkedin.com/in/bimanshukumar/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href="mailto:kumarbimanshu99@gmail.com" className="footer-social-link" aria-label="Email">
              <EmailIcon />
            </a>
          </div>
          <p className="footer-text">
            Built with ♟️ by <span>Bimanshu Kumar</span> — N-Queens meets Portfolio
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
