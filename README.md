# TICKET: The Great Underground Help Desk

An original browser parser adventure in fictional Tamarack Lakes, Minnesota. Twelve indoor locations plus the opening mailbox scene, six interlocking support puzzles, and an evidence-based engineering handoff. No dependencies, accounts, external assets, or live AI.

## Easiest launch — no installation

Download this repository with GitHub’s **Code → Download ZIP**, extract the ZIP, then double-click **PLAY.html**. It contains the entire game and opens directly in your browser. No terminal, Python, Node, internet connection, or accounts are needed to play. Keep PLAY.html in the same location for consistent browser saves.

## Development launch

From `/workspace/test`, run `npm start` (or `python3 -m http.server 8000 --bind 0.0.0.0`). Open the served site in your browser. ES modules require serving over HTTP rather than opening index.html directly. Node 18+ runs the engine tests; Python 3 serves the app.

Type commands in the terminal. Enter executes; up/down recalls history. Compass directions accept N/S/E/W/U/D. HELP lists commands and HINT provides three progressive hints per puzzle. Inventory, map, objectives, and journal update automatically. The deadline and battery never count down. Required objects can be dropped and retrieved. Click map exits to travel or inventory “inspect” buttons to examine items.

Autosave resumes the last shift in this browser. SAVE creates a separate manual snapshot; LOAD restores it. Restart requires confirmation and keeps your manual save. High contrast is optional. Browser storage must be enabled for persistent saves. All saved data stays on this browser origin.

Run `npm test` for engine validation. The complete spoiler walkthrough is in `SPOILERS-WALKTHROUGH.md`.

## Files

- `engine.js`: deterministic state, world/items, parser, prerequisites, hints, objectives and save validation.
- `app.js`: accessible transcript, controls, history, panels and local persistence.
- `index.html` / `style.css`: responsive terminal interface.
- `tests/engine.test.js`: complete winning path, save round trips at every step, aliases, prerequisites, hints, map and recoverable items.

Workarounds remain separate from permanent outcomes. Folder and public-link causes remain unresolved at the ending; engineering receives an owner and next diagnostic action. All accounts, people, records, causes and vendor responses are invented for this game.
