// State Capitals — a single game covering multiple countries' state/province
// capitals. At the start the child picks a country, then the shared quiz engine
// runs for that country's data.
//
// To add another country later: create a data file (array of {name, capital})
// under ../data/, import it, and add one entry to COUNTRIES below. Nothing else
// changes.

import { makeQuizGame } from '../../shared/quiz.js';
import { bigEmoji } from '../../shared/emoji.js';
import { US_STATES } from '../data/us-states.js';
import { INDIA_STATES } from '../data/india-states.js';
import { CANADA_PROVINCES } from '../data/canada-provinces.js';

const COUNTRIES = [
  { id: 'usa', label: 'USA', icon: '🇺🇸', data: US_STATES, term: 'state' },
  { id: 'india', label: 'India', icon: '🇮🇳', data: INDIA_STATES, term: 'state' },
  { id: 'canada', label: 'Canada', icon: '🇨🇦', data: CANADA_PROVINCES, term: 'province', plural: 'provinces & territories' },
];

export function mount(host, ctx) {
  let disposed = false;
  let cleanup = null;

  showCountryPicker();

  function disposeCurrent() {
    if (cleanup) { try { cleanup(); } catch { /* ignore */ } cleanup = null; }
  }

  function showCountryPicker() {
    disposeCurrent();
    host.innerHTML = '';
    const card = div('card');
    card.append(
      hEl('h1', 'game-title', '🗺️ State Capitals'),
      pEl('game-sub', `Hi ${ctx.player}! Pick a country, then name the capital of each state.`),
    );

    const grid = div('player-grid');
    for (const c of COUNTRIES) {
      const b = btn('player-card');
      b.append(
        span('avatar', c.icon),
        document.createTextNode(c.label),
        span('sub', `${c.data.length} ${c.plural || c.term + 's'}`),
      );
      b.onclick = () => startCountry(c);
      grid.append(b);
    }
    card.append(grid);
    host.append(card);
  }

  function startCountry(country) {
    disposeCurrent();
    if (disposed) return;
    const quizMount = makeQuizGame({
      title: `${country.label} State Capitals`,
      icon: country.icon,
      data: country.data,
      prompt: (s) => `What is the capital of ${s.name}?`,
      answer: (s) => s.capital,
      promptNode: () => bigEmoji(country.icon),
      onBack: () => { disposeCurrent(); showCountryPicker(); },
      backLabel: '⬅ Pick another country',
    });
    cleanup = quizMount(host, ctx) || null;
  }

  return () => { disposed = true; disposeCurrent(); };
}

// ---- tiny DOM helpers ----
function div(cls) { const d = document.createElement('div'); if (cls) d.className = cls; return d; }
function hEl(tag, cls, text) { const n = document.createElement(tag); n.className = cls; n.textContent = text; return n; }
function pEl(cls, text) { const n = document.createElement('p'); n.className = cls; n.textContent = text; return n; }
function btn(cls, text) { const b = document.createElement('button'); b.className = cls; if (text != null) b.textContent = text; return b; }
function span(cls, text) { const s = document.createElement('span'); s.className = cls; s.textContent = text; return s; }
