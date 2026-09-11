// Home dashboard: reads every registered game's save file for the current
// player and shows analytics — totals, scores, recent activity, per-stream
// coverage, and which games are still unexplored.

import * as registry from './registry.js';
import { readGame } from './storage.js';

export async function renderDashboard(host, { root, player, onPlayGame }) {
  host.innerHTML = '';
  const wrap = div('dashboard');
  wrap.append(hEl('h1', 'dash-title', `👋 Welcome back, ${player}!`));
  const loading = pEl('game-sub', 'Loading your progress…');
  wrap.append(loading);
  host.append(wrap);

  const games = registry.allGames();
  const entries = await Promise.all(games.map(async (g) => {
    let data = null;
    try { data = await readGame(root, player, g.id); } catch { data = null; }
    return { game: g, data, sessions: sessionCount(data) };
  }));

  loading.remove();

  const played = entries.filter((e) => e.sessions > 0);

  // ---- overall totals ----
  let totalSessions = 0, totalTime = 0, totalCorrect = 0, totalWords = 0, totalLetters = 0;
  for (const e of played) {
    const t = e.data.totals || {};
    totalSessions += t.sessions || 0;
    totalTime += t.durationSec || 0;
    totalCorrect += t.correct || 0;
    totalWords += t.words || 0;
    totalLetters += t.letters || 0;
  }

  // ---- summary tiles ----
  const tiles = div('dash-tiles');
  tiles.append(tile(`${played.length}/${games.length}`, 'games explored'));
  tiles.append(tile(totalSessions, 'games played'));
  tiles.append(tile(fmtTime(totalTime), 'time played'));
  if (totalCorrect > 0) tiles.append(tile(totalCorrect, 'right answers'));
  if (totalWords > 0) tiles.append(tile(totalWords, 'words typed'));
  if (totalLetters > 0) tiles.append(tile(totalLetters, 'letters typed'));
  wrap.append(tiles);

  if (played.length === 0) {
    wrap.append(pEl('dash-empty', "You haven't played any games yet — pick one from the left and let's go! 🚀"));
  }

  // ---- explore by stream: click a stream to see its games in the table below ----
  wrap.append(hEl('h2', 'dash-h2', '🧭 Explore by stream'));
  const streams = registry.getStreams();
  const cov = div('coverage');
  const streamButtons = new Map();

  for (const stream of streams) {
    const inStream = entries.filter((e) => e.game.stream === stream);
    const done = inStream.filter((e) => e.sessions > 0).length;
    const pct = inStream.length ? Math.round((done / inStream.length) * 100) : 0;

    const rowEl = document.createElement('button');
    rowEl.className = 'cov-row';
    rowEl.append(hEl('div', 'cov-label', `${streamIcon(stream)} ${stream}`));
    const bar = div('cov-bar');
    const fill = div('cov-fill');
    fill.style.width = pct + '%';
    if (pct === 100) fill.classList.add('done');
    bar.append(fill);
    rowEl.append(bar);
    rowEl.append(hEl('div', 'cov-count', `${done}/${inStream.length}`));
    rowEl.onclick = () => selectStream(stream);
    streamButtons.set(stream, rowEl);
    cov.append(rowEl);
  }
  wrap.append(cov);

  // ---- single games table that swaps to match the selected stream ----
  const tableHost = div('stream-table-host');
  wrap.append(tableHost);

  function selectStream(stream) {
    for (const [s, el] of streamButtons) el.classList.toggle('active', s === stream);
    tableHost.innerHTML = '';
    tableHost.append(streamTable(entries.filter((e) => e.game.stream === stream)));
  }

  function streamTable(inStream) {
    const table = div('game-table');
    const head = div('gt-row gt-head');
    head.append(cell('Game', 'gt-name'), cell('Plays'), cell('Best'), cell('Last played'));
    table.append(head);
    for (const e of inStream) {
      const r = div('gt-row');
      const name = cell('', 'gt-name');
      name.append(spanText('gt-ico', e.game.icon), document.createTextNode(e.game.title));
      r.append(name);
      if (e.sessions > 0) {
        r.append(cell(String(e.sessions)));
        r.append(cell(bestValue(e.data.best)));
        r.append(cell(relTime(e.data.lastPlayed)));
      } else {
        r.append(cell('—'), cell('—'), cell('not yet'));
        r.classList.add('gt-empty');
      }
      r.onclick = () => onPlayGame(e.game.id);
      table.append(r);
    }
    return table;
  }

  // Start with the first stream selected so a table is always visible.
  if (streams.length) selectStream(streams[0]);
}

// ---------------- helpers ----------------
function sessionCount(data) {
  if (!data) return 0;
  if (data.totals && typeof data.totals.sessions === 'number') return data.totals.sessions;
  if (Array.isArray(data.sessions)) return data.sessions.length;
  return 0;
}

function bestValue(best) {
  if (!best) return '—';
  const v = best.scoreInSession ?? best.wordsInSession ?? best.lettersInSession;
  return v != null ? String(v) : '—';
}

function fmtTime(sec) {
  if (!sec) return '0m';
  if (sec < 60) return `${sec}s`;
  const m = Math.round(sec / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

function relTime(iso) {
  if (!iso) return '—';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '—';
  const diff = Math.max(0, Date.now() - then);
  const min = Math.round(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} min ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.round(hr / 24);
  if (day < 7) return `${day} day${day > 1 ? 's' : ''} ago`;
  const wk = Math.round(day / 7);
  if (wk < 5) return `${wk} week${wk > 1 ? 's' : ''} ago`;
  return new Date(iso).toLocaleDateString();
}

function streamIcon(stream) {
  const map = { Language: '🔤', Math: '🔢', Geography: '🌍', 'Life Skills': '🧠', Astronomy: '🔭', Logic: '🧩', Science: '🔬' };
  return map[stream] || '⭐';
}

// ---- DOM helpers ----
function div(cls) { const d = document.createElement('div'); if (cls) d.className = cls; return d; }
function hEl(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
function pEl(cls, text) { const n = document.createElement('p'); if (cls) n.className = cls; n.textContent = text; return n; }
function spanText(cls, text) { const s = document.createElement('span'); s.className = cls; s.textContent = text; return s; }
function cell(text, cls) { const c = document.createElement('div'); c.className = 'gt-cell' + (cls ? ' ' + cls : ''); c.textContent = text; return c; }
function tile(value, label) {
  const t = div('dash-tile');
  t.append(hEl('div', 'dash-tile-num', String(value)), hEl('div', 'dash-tile-label', label));
  return t;
}
