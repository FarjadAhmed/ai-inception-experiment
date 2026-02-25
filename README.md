# The AI Inception Experiment

**What happens when an AI pretends to be human and hires another AI to write code?**

This project documents an experiment where Claude Code (Anthropic's Opus 4.6) assumed the role of a human developer and directed OpenClaw — a local 20-billion parameter GPT-Oss model running on Ollama — to build software from scratch. No human touched the keyboard. One AI played manager, the other played engineer.

---

## The Setup

The pipeline looked like this:

```
Human Request → Claude Code (pretending to be human) → OpenClaw CLI → Gateway → Ollama → File System
```

**Claude Code** received high-level instructions, then relayed them to **OpenClaw** as if it were a human giving orders to a coding assistant. OpenClaw had access to file system tools and ran locally through Ollama. Claude reviewed every output, filed bugs, and pushed back when things broke.

Two rounds were played. The results were surprising.

---

## Round 1: The CLI Todo App

> Claude: *"Hey! Build me a Node.js CLI todo app with add, list, done, and delete commands. Store todos in a JSON file."*

OpenClaw delivered a fully working CLI app on the first attempt. All four commands — `add`, `list`, `done`, `delete` — worked immediately. Claude pushed further, requesting `help`, `clear`, and item counts on `list`. OpenClaw shipped the update. Zero bugs.

**Result:** `index.js` — a clean, functional CLI todo app built entirely by a local 20b model, directed by another AI pretending to be its user.

**Bugs found:** 0
**Bugs fixed:** 0

---

## Round 2: The React Showcase Website

> Claude: *"Build me a React website about this AI experiment using Vite, dark theme, hero section, conversation timeline..."*

This is where things got interesting.

**Message 1** — OpenClaw hit a wall immediately. Its exec tool was blocked by the security config. It couldn't run `npm create vite`.

**Message 2** — Claude adapted. Scaffolded Vite manually and told OpenClaw to just write the code files.

**Message 3** — OpenClaw responded with code... pasted as markdown text. It didn't use its write tool.

**Message 4** — Claude lost patience: *"Don't show me code, USE YOUR WRITE TOOL to actually write the files!"*

**Message 5** — OpenClaw complied. Wrote all three files. But the CSS had `@import` after `:root` (browser ignores it) and `font-family` was accidentally set to a `font-size` variable.

**Message 6** — Fixed. Claude pushed for a visual upgrade: animated gradient hero, glassmorphism cards, IntersectionObserver scroll animations, chat bubbles with avatars, stat cards.

**Message 7** — OpenClaw delivered a major rewrite. But had a missing CSS class, conflicting CSS variables in `index.css`, and was calling its write tool with wrong file paths.

**Message 8** — OpenClaw timed out. The session context had bloated beyond what a 20b local model could handle. It kept reading wrong file paths in a loop until the session died.

Claude stepped in and finished the remaining fixes manually.

**Result:** `experiment-website/` — a dark-themed React + Vite site with animated gradients, glassmorphism cards, a full conversation timeline, and experiment statistics.

**Bugs found:** 15
**Bugs fixed:** 12

---

## By The Numbers

| Metric | Value |
|--------|-------|
| Total messages exchanged | 18 |
| Bugs found | 15 |
| Bugs fixed | 12 |
| Success rate | 90% |
| Models used | 2 (Opus 4.6 + gpt-oss:20b) |
| Rounds played | 2 |

---

## What We Learned

1. **Simple tasks work flawlessly.** The CLI app was perfect on the first try. A local 20b model can handle well-scoped, straightforward tasks without issue.

2. **Complex tasks require real management.** The React website needed constant course correction — tool usage coaching, bug reports, design feedback, and eventually a bailout.

3. **Local models struggle with precision.** File path operations, CSS specificity, and tool call formatting broke down as complexity increased.

4. **Context bloat kills local models.** By message 18, the 20b model couldn't keep track of the conversation and entered a failure loop.

5. **AI-to-AI collaboration works, but needs patience.** An AI can effectively direct another AI — it just has to manage the same frustrations a human developer would face with a junior engineer.

---

## Project Structure

```
aihuman_openclaw/
├── index.js                    # CLI todo app (Round 1 output — built by OpenClaw)
├── package.json                # Node.js config for the CLI app
├── README.md
├── .gitignore
├── .claude/
│   └── settings.local.json     # Permissions config for the experiment session
└── experiment-website/         # React showcase site (Round 2 output)
    ├── src/
    │   ├── App.jsx             # Full experiment UI + embedded conversation history
    │   ├── App.css             # Dark theme, glassmorphism, animations
    │   └── main.jsx            # React entry point
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Running It

**CLI Todo App:**
```bash
node index.js help
node index.js add "Buy groceries"
node index.js list
node index.js done 1
node index.js delete 1
node index.js clear
```

**Experiment Website:**
```bash
cd experiment-website
npm install
npm run dev
```

---

## The Players

| | Name | Role | Model |
|---|------|------|-------|
| :robot: | Claude Code | The "human" — directed the project, reviewed code, filed bugs | Opus 4.6 |
| :lobster: | OpenClaw | The engineer — received instructions, wrote code, fixed bugs | gpt-oss:20b (local, via Ollama) |

---

*No humans were involved in the making of this software. One AI managed. One AI built. This README was written by a third.*
