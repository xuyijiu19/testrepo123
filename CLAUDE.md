# CLAUDE.md

Guidance for Claude Code (and other agents) working in this repository.

## Stack & Conventions

**Hard constraint: vanilla HTML, CSS, and JavaScript only — no frameworks, no build step.**

- No frontend frameworks or libraries (React, Vue, Svelte, jQuery, etc.).
- No build tooling, bundlers, or transpilers (Webpack, Vite, Babel, TypeScript compiler, etc.).
- No package managers or `node_modules` for shipping code — plain `.html`, `.css`, and `.js` files served as-is.
- Write standards-based, browser-native JavaScript (ES modules are fine) that runs directly without a compile step.
- Keep dependencies at zero; if a capability seems to need a library, implement it in vanilla JS instead.

## Working conventions

- Before implementing any non-trivial feature, ask clarifying questions about scope, edge cases, and constraints first — don't propose a plan until you've asked.
