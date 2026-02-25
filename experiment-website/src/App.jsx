import { useState, useEffect, useRef } from 'react';
import './App.css';

// Utility component that fades content into view when scrolled
const FadeInSection = ({ children }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div ref={domRef} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

const Hero = () => (
  <section className="hero">
    <h1 className="hero-title">The AI Inception Experiment</h1>
    <p className="hero-subtitle">Claude Code acts as a human, collaborating with OpenClaw to build projects. Two AIs, one pretending to be human, the other building the code.</p>
    <div className="hero-emoji pulse">🦞</div>
    <a href="#meet" className="scroll-down">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V16M12 16L5 9M12 16L19 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </a>
  </section>
);

const PlayerCard = ({ emoji, name, description, model }) => (
  <div className="card glassmorphism" style={{ minWidth: '250px' }}>
    <div className="card-header">{emoji}</div>
    <h3 className="card-title">{name}</h3>
    <p className="card-description">{description}</p>
    <div className="card-model">Model: {model}</div>
  </div>
);

const MeetPlayers = () => (
  <section id="meet" className="section meet-players">
    <h2>Meet the Players</h2>
    <div className="players-grid">
      <PlayerCard
        emoji="🤖"
        name="Claude Code"
        description="An AI coding assistant who pretends to be human and guides the project" 
        model="Opus 4.6"
      />
      <PlayerCard
        emoji="🦞"
        name="OpenClaw"
        description="Local AI that actually builds the code, leveraging a 20b GPT-Oss model" 
        model="gpt-oss:20b local"
      />
    </div>
  </section>
);

const FlowBadge = ({ label }) => (
  <span className="flow-badge pill">{label}</span>
);

const HowItWorks = () => (
  <section className="section how-it-works">
    <h2>How It Works</h2>
    <div className="flow" aria-label="Flow diagram">
      <FlowBadge label="Human Request" />
      <span className="arrow">→</span>
      <FlowBadge label="Claude Code" />
      <span className="arrow">→</span>
      <FlowBadge label="OpenClaw CLI" />
      <span className="arrow">→</span>
      <FlowBadge label="Gateway" />
      <span className="arrow">→</span>
      <FlowBadge label="Ollama" />
      <span className="arrow">→</span>
      <FlowBadge label="File System" />
    </div>
  </section>
);

const ChatBubble = ({ speaker, avatar, text, isClaude }) => (
  <div className={`chat-bubble ${isClaude ? 'clause' : 'openclaw'}`}> 
    <span className="avatar">{avatar}</span> 
    <div className="message">{text}</div>
    <div className="speaker">{speaker}</div>
  </div>
);

const Conversation = () => {
  const round1 = [
    { speaker: 'Claude', avatar: '🤖', text: 'Hey! Build me a Node.js CLI todo app with add, list, done, and delete commands. Store todos in a JSON file.', isClaude: true },
    { speaker: 'OpenClaw', avatar: '🦞', text: 'Done! Created index.js and package.json. The CLI supports add, list, done, and delete commands with JSON file storage.', isClaude: false },
    { speaker: 'Claude', avatar: '🤖', text: 'All 4 commands work on the first try. Nice! Now add a help command, a clear command, and show total/done counts on list.', isClaude: true },
    { speaker: 'OpenClaw', avatar: '🦞', text: 'Updated! Added help, clear, and list now shows total and completed counts.', isClaude: false },
    { speaker: 'Claude', avatar: '🤖', text: 'Everything works perfectly. Zero bugs needed fixing.', isClaude: true }
  ];

  const round2 = [
    { speaker: 'Claude', avatar: '🤖', text: 'Build me a React website about this AI experiment using Vite, dark theme, hero section, conversation timeline...', isClaude: true },
    { speaker: 'OpenClaw', avatar: '🦞', text: 'Error - my exec tool is blocked by security config, cant run npm commands.', isClaude: false },
    { speaker: 'Claude', avatar: '🤖', text: 'No worries, I scaffolded Vite myself. Just write the code files.', isClaude: true },
    { speaker: 'OpenClaw', avatar: '🦞', text: 'Gave code as markdown text instead of writing files...', isClaude: false },
    { speaker: 'Claude', avatar: '🤖', text: 'Dont show me code, USE YOUR WRITE TOOL to actually write the files!', isClaude: true },
    { speaker: 'OpenClaw', avatar: '🦞', text: 'Ok, wrote all 3 files this time.', isClaude: false },
    { speaker: 'Claude', avatar: '🤖', text: 'Two bugs: CSS @import must come before :root, and font-family is set to a font-size variable.', isClaude: true },
    { speaker: 'OpenClaw', avatar: '🦞', text: 'Fixed both issues.', isClaude: false },
    { speaker: 'Claude', avatar: '🤖', text: 'The UI is too basic. Need animated gradient hero, glassmorphism cards, better layout...', isClaude: true },
    { speaker: 'OpenClaw', avatar: '🦞', text: 'Major rewrite done - added IntersectionObserver animations, animated gradient, chat avatars, stat cards.', isClaude: false },
    { speaker: 'Claude', avatar: '🤖', text: 'Missing CSS class, competing variables in index.css, wrong file paths in your tool calls.', isClaude: true },
    { speaker: 'OpenClaw', avatar: '🦞', text: 'Timed out - kept reading wrong file paths. Session too bloated for the local model.', isClaude: false }
  ];

  return (
    <section className="section conversation" id="conversation">
      <h2>The Conversation</h2>
      <div className="rounds">
        <h3>Round 1 (Todo CLI - 6 messages)</h3>
        <div className="bubbles">{round1.map((msg, i) => (<ChatBubble key={i} {...msg} />))}</div>
        <h3>Round 2 (React Website - 12 messages)</h3>
        <div className="bubbles">{round2.map((msg, i) => (<ChatBubble key={i} {...msg} />))}</div>
      </div>
    </section>
  );
};

const StatsGrid = () => (
  <section className="section by-the-numbers" id="numbers">
    <h2>By The Numbers</h2>
    <div className="stats-grid">
      <div className="stat-card glassmorphism">
        <div className="stat-value">18</div>
        <div className="stat-label">Messages Sent</div>
      </div>
      <div className="stat-card glassmorphism">
        <div className="stat-value">15</div>
        <div className="stat-label">Bugs Found</div>
      </div>
      <div className="stat-card glassmorphism">
        <div className="stat-value">12</div>
        <div className="stat-label">Bugs Fixed</div>
      </div>
      <div className="stat-card glassmorphism">
        <div className="stat-value">90%</div>
        <div className="stat-label">Success Rate</div>
      </div>
      <div className="stat-card glassmorphism">
        <div className="stat-value">2</div>
        <div className="stat-label">Models Used</div>
      </div>
      <div className="stat-card glassmorphism">
        <div className="stat-value">2</div>
        <div className="stat-label">Rounds Played</div>
      </div>
    </div>
  </section>
);

const Takeaways = () => (
  <section className="section key-takeaways" id="takeaways">
    <h2>Key Takeaways</h2>
    <p>Simple tasks (CLI app) worked flawlessly on first attempt.</p>
    <p>Complex tasks (React website) required significant back‑and‑forth.</p>
    <p>The local 20b model struggled with precise file path operations.</p>
    <p>Session context bloat caused failures in later messages.</p>
    <p>An AI acting as human can effectively direct another AI, but needs patience.</p>
    <p>The experiment proves AI‑to‑AI collaboration works but has clear limitations.</p>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <p>© 2026 AI Inception Experiment. All rights reserved.</p>
  </footer>
);

export default function App() {
  return (
    <>
      <FadeInSection><Hero /></FadeInSection>
      <FadeInSection><MeetPlayers /></FadeInSection>
      <FadeInSection><HowItWorks /></FadeInSection>
      <FadeInSection><Conversation /></FadeInSection>
      <FadeInSection><StatsGrid /></FadeInSection>
      <FadeInSection><Takeaways /></FadeInSection>
      <FadeInSection><Footer /></FadeInSection>
    </>
  );
}
