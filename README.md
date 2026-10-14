# TICKET: The Great Underground Help Desk

An original browser parser adventure in fictional Tamarack Lakes, Minnesota. Twelve indoor locations plus the opening mailbox scene, six interlocking support puzzles, and an evidence-based engineering handoff. No dependencies, accounts, external assets, or live AI.

## Easiest launch — no installation

Download this repository with GitHub’s **Code → Download ZIP**, extract the ZIP, then double-click **PLAY.html**. It contains the entire game and opens directly in your browser. No terminal, Python, Node, internet connection, or accounts are needed to play. Keep PLAY.html in the same location for consistent browser saves.

## Run with Node.js

1. Install Node.js 24 LTS from https://nodejs.org/.
2. Download and extract the repository ZIP.
3. Open a terminal in the extracted folder (the one containing package.json).
4. Run `npm start`.
5. On your own computer, open `http://localhost:8000` in your browser. Keep the terminal open while playing. Press Ctrl+C to stop.

There are no packages to install and Python is not required. Node 22 or newer is supported. `npm run dev` automatically restarts the server when its source changes. `npm test` runs the engine and HTTP-server tests. The server supports a hosting provider's `PORT` environment variable and binds to `0.0.0.0`. Asset paths are resolved relative to the server file, so it can also be launched from another directory with `node /path/to/server.js`.

## Put the Node version online

GitHub stores the code; a Node-capable web host runs the server. On Render (https://render.com/):

1. Sign in and choose **New → Web Service**.
2. Connect this GitHub repository, `woodsdana-ctrl/test`, and select branch **main**.
3. Choose the Node runtime, set the build command to `npm test`, and the start command to `npm start`.
4. Choose an available plan after reviewing its price and create the service.
5. Wait for deployment to finish, then open the address Render provides. Share that address with players.

Use Node 24 (for example, set the host's `NODE_VERSION` environment variable to `24`). No secrets or database are needed. The health-check path is `/health`. This repository update does not create or deploy a hosting account. GitHub Pages can still serve the browser files, but it cannot run the Node server.

Type commands in the terminal. Enter executes; up/down recalls history. Compass directions accept N/S/E/W/U/D. HELP lists commands and HINT provides three progressive hints per puzzle. Inventory, map, objectives, and journal update automatically. The deadline and battery never count down. Required objects can be dropped and retrieved. Click map exits to travel or inventory “inspect” buttons to examine items.

Autosave resumes the last shift in this browser. SAVE creates a separate manual snapshot; LOAD restores it. Restart requires confirmation and keeps your manual save. High contrast is optional. Browser storage must be enabled for persistent saves. All saved data stays on this browser origin.

Run `npm test` for engine validation. The complete spoiler walkthrough is in `SPOILERS-WALKTHROUGH.md`.

## Files

- `server.js`: dependency-free Node HTTP server, public asset allowlist, health check and hosting port support.
- `engine.js`: deterministic state, world/items, parser, prerequisites, hints, objectives and save validation.
- `app.js`: accessible transcript, controls, history, panels and local persistence.
- `index.html` / `style.css`: responsive terminal interface.
- `tests/engine.test.js`: complete winning path, save round trips at every step, aliases, prerequisites, hints, map and recoverable items.

Workarounds remain separate from permanent outcomes. Folder and public-link causes remain unresolved at the ending; engineering receives an owner and next diagnostic action. All accounts, people, records, causes and vendor responses are invented for this game.
