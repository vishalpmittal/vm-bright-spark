# 🎈 Learning Games

A local, browser-based collection of learning games for a 4–6 year old kid.
Progress is saved to a **data folder you choose** on your own computer — one
subfolder per player, one JSON file per game. No accounts, no internet, no server
uploads.

## Requirements

- **Google Chrome or Microsoft Edge.** The app uses the browser's
  [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)
  to read and write your data folder. Firefox and Safari do **not** support this,
  and the app will tell you so.
- Python 3 (already installed on macOS) — used only to serve the files locally.

## How to run

The File System Access API only works over `http://localhost` (not by
double-clicking the HTML file), so start a tiny local server:

```bash
cd vm-toddler-learning-games
python3 -m http.server 8000
```

Then open **http://localhost:8000** in Chrome or Edge.

> Any static server works. Alternatives: `npx serve`, `php -S localhost:8000`, etc.

## First run

1. Click **Choose Data Folder** and pick (or make) an empty folder, e.g. `MyKidsData`.
2. Add a player (e.g. `Emma`). A subfolder is created for them.
3. Pick a game from the left **stream** bar, then the game bar next to it.
4. Play! Progress is written to `MyKidsData/Emma/<game>.json`.

On later runs the app remembers your folder and just asks you to re-confirm access.

## Data layout

```
MyKidsData/
  Emma/
    typing.json
    counting.json
  Liam/
    typing.json
```

## Adding a new game (for developers)

Games are self-contained and registered in one place.

1. Create `src/games/<id>/manifest.js` with a default export:

   ```js
   export default {
     id: 'spelling',
     title: 'Spelling Bee',
     stream: 'Language',      // left nav bar
     category: 'Words',       // second nav bar grouping
     icon: '🐝',
     description: 'Spell the word you hear!',
     mount(container, ctx) {
       // render your game into `container`
       // use ctx.player, ctx.load(), ctx.save(data), ctx.recordSession(session)
       return () => { /* cleanup when leaving the game */ };
     }
   };
   ```

2. Import it and register it in `src/main.js`:

   ```js
   import spelling from './games/spelling/manifest.js';
   registry.register(spelling);
   ```

The navigation bars and routing update automatically — nothing else to wire up.
