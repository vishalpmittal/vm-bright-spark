// App shell: header + nav bar 1 (streams) + nav bar 2 (games) + game host.
// Builds the per-game `ctx` (player + scoped load/save/recordSession helpers).

import * as registry from './registry.js';
import { readGame, writeGame, writeProfile } from './storage.js';
import { makeAgeSlider, clampAge } from './ui.js';
import { renderDashboard } from './dashboard.js';

/**
 * Mount the running app into `mountEl`.
 * @param {Object} opts
 * @param {FileSystemDirectoryHandle} opts.root  chosen data folder
 * @param {string} opts.player                   current player (folder name)
 * @param {() => void} opts.onSwitchPlayer
 * @param {() => void} opts.onChangeFolder
 */
export function startApp(mountEl, { root, player, age = 5, onSwitchPlayer, onChangeFolder }) {
  const streams = registry.getStreams();
  let activeStream = streams[0] || null;
  let activeGameId = null;
  let currentUnmount = null;
  let currentAge = clampAge(age);
  let atHome = true;

  mountEl.innerHTML = '';

  const shell = el('div', 'shell');

  // ---- Top bar ----
  const topbar = el('div', 'topbar');
  const brand = el('div', 'brand', '🎈 Learning Games');
  const who = el('div', 'who');
  const ageChip = el('button', 'age-chip', `🎂 Age ${currentAge}`);
  ageChip.title = 'Change age (sets difficulty)';
  ageChip.onclick = () => openAgeEditor();
  who.append(
    el('span', 'name', `👤 ${player}`),
    ageChip,
    linkBtn('Switch player', onSwitchPlayer),
    linkBtn('Change folder', onChangeFolder),
  );
  topbar.append(brand, who);

  // ---- Body: two nav bars + host ----
  const body = el('div', 'body');
  const streamNav = el('nav', 'nav streams');
  const gameNav = el('nav', 'nav games');
  const host = el('div', 'game-host');
  body.append(streamNav, gameNav, host);

  shell.append(topbar, body);
  mountEl.append(shell);

  function renderStreamNav() {
    streamNav.innerHTML = '';
    const home = el('button', 'nav-btn home-btn' + (atHome ? ' active' : ''));
    home.append(el('span', 'ico', '🏠'), document.createTextNode('Home'));
    home.onclick = () => { if (!atHome) showHome(); };
    streamNav.append(home);

    streamNav.append(el('h2', null, 'Streams'));
    for (const stream of streams) {
      const btn = el('button', 'nav-btn' + (!atHome && stream === activeStream ? ' active' : ''));
      btn.append(el('span', 'ico', streamIcon(stream)), document.createTextNode(stream));
      btn.onclick = () => {
        if (!atHome && activeStream === stream) return;
        atHome = false;
        activeStream = stream;
        activeGameId = null;
        renderStreamNav();
        renderGameNav();
        autoSelectFirstGame();
      };
      streamNav.append(btn);
    }
  }

  function renderGameNav() {
    gameNav.innerHTML = '';
    if (!activeStream) return;
    gameNav.append(el('h2', null, activeStream));
    const games = registry.getGames(activeStream);

    // Group by category for the second-level labels.
    const byCat = new Map();
    for (const g of games) {
      if (!byCat.has(g.category)) byCat.set(g.category, []);
      byCat.get(g.category).push(g);
    }
    for (const [cat, list] of byCat) {
      gameNav.append(el('div', 'cat-label', cat));
      for (const g of list) {
        const btn = el('button', 'nav-btn' + (g.id === activeGameId ? ' active' : ''));
        btn.append(el('span', 'ico', g.icon));
        const text = el('span');
        text.append(document.createTextNode(g.title), el('span', 'desc', g.description));
        btn.append(text);
        btn.onclick = () => selectGame(g.id);
        gameNav.append(btn);
      }
    }
  }

  function autoSelectFirstGame() {
    const games = registry.getGames(activeStream);
    if (games.length) selectGame(games[0].id);
    else host.innerHTML = '';
  }

  function selectGame(gameId) {
    if (!atHome && gameId === activeGameId) return;
    atHome = false;
    activeGameId = gameId;
    renderStreamNav();
    renderGameNav();
    mountGame(gameId);
  }

  function showHome() {
    atHome = true;
    if (currentUnmount) { try { currentUnmount(); } catch { /* ignore */ } currentUnmount = null; }
    activeGameId = null;
    renderStreamNav();
    renderGameNav();
    renderDashboard(host, { root, player, onPlayGame: playGame });
  }

  function playGame(gameId) {
    const g = registry.getGame(gameId);
    if (!g) return;
    activeStream = g.stream;
    activeGameId = null;
    selectGame(gameId);
  }

  function mountGame(gameId) {
    // Tear down the previous game.
    if (currentUnmount) {
      try { currentUnmount(); } catch { /* ignore */ }
      currentUnmount = null;
    }
    host.innerHTML = '';

    const game = registry.getGame(gameId);
    if (!game) return;

    const ctx = makeCtx(root, player, game.id, currentAge);
    const result = game.mount(host, ctx);
    currentUnmount = typeof result === 'function' ? result : null;
  }

  function remountCurrent() {
    if (activeGameId) mountGame(activeGameId);
  }

  function openAgeEditor() {
    const overlay = el('div', 'overlay');
    const box = el('div', 'overlay-box');
    box.append(el('h2', 'overlay-title', 'How old is the player?'));
    const slider = makeAgeSlider(currentAge);
    box.append(slider.el);
    box.append(el('p', 'overlay-hint', 'This sets how hard the games start.'));
    const row = el('div', 'row-btns');
    const save = el('button', 'big-btn', 'Save');
    const cancel = el('button', 'big-btn secondary', 'Cancel');
    row.append(save, cancel);
    box.append(row);
    overlay.append(box);
    document.body.append(overlay);

    const close = () => overlay.remove();
    cancel.onclick = close;
    overlay.onclick = (e) => { if (e.target === overlay) close(); };
    save.onclick = async () => {
      currentAge = slider.value;
      ageChip.textContent = `🎂 Age ${currentAge}`;
      try { await writeProfile(root, player, { age: currentAge }); }
      catch (err) { console.error('Could not save age', err); }
      close();
      remountCurrent(); // restart current game so new difficulty applies
    };
  }

  renderStreamNav();
  renderGameNav();
  showHome();
}

/** Build the sandboxed context object handed to each game. */
function makeCtx(root, player, gameId, age) {
  const defaults = () => ({
    gameId,
    player,
    totals: {},
    best: {},
    lastPlayed: null,
    sessions: [],
  });

  return {
    player,
    gameId,
    age,

    async load() {
      const data = await readGame(root, player, gameId);
      return data || defaults();
    },

    async save(data) {
      await writeGame(root, player, gameId, data);
    },

    /**
     * Append a session, roll up numeric fields into `totals`, bump the session
     * count, set lastPlayed, and persist. Returns the updated record.
     */
    async recordSession(session) {
      const data = (await readGame(root, player, gameId)) || defaults();
      data.sessions = data.sessions || [];
      data.totals = data.totals || {};
      data.sessions.push(session);

      for (const [key, val] of Object.entries(session)) {
        if (typeof val === 'number') {
          data.totals[key] = (data.totals[key] || 0) + val;
        }
      }
      data.totals.sessions = data.sessions.length;
      data.lastPlayed = session.date || new Date().toISOString();

      await writeGame(root, player, gameId, data);
      return data;
    },
  };
}

// ---------------- small DOM helpers ----------------
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function linkBtn(label, onClick) {
  const b = el('button', 'link-btn', label);
  b.onclick = onClick;
  return b;
}

function streamIcon(stream) {
  const map = { Language: '🔤', Math: '🔢', Geography: '🌍', 'Life Skills': '🧠', Astronomy: '🔭', Logic: '🧩', Science: '🔬' };
  return map[stream] || '⭐';
}
