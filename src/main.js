// Bootstrap: check browser support, get the data folder, choose a player,
// then start the app. Games are registered here — the only place adding a new
// game requires an edit.

import * as registry from './core/registry.js';
import {
  isSupported,
  pickDataFolder,
  restoreDataFolder,
  ensurePermission,
  forgetDataFolder,
  readProfile,
  writeProfile,
} from './core/storage.js';
import { getPlayers, addPlayer, rememberPlayer, getLastPlayer } from './core/players.js';
import { makeAgeSlider, clampAge } from './core/ui.js';
import { startApp } from './core/app.js';

// ---- Register games (add new games with one import + one register call) ----
import typing from './games/typing/manifest.js';
import langSpelling from './games/language/spelling/manifest.js';
import langOpposites from './games/language/opposites/manifest.js';
import langSynonyms from './games/language/synonyms/manifest.js';
import langRhymes from './games/language/rhymes/manifest.js';
import langLetterMatch from './games/language/letter-match/manifest.js';
import langStartingSounds from './games/language/starting-sounds/manifest.js';
import langWordMeanings from './games/language/word-meanings/manifest.js';
import langRoots from './games/language/roots/manifest.js';
import langAffixes from './games/language/affixes/manifest.js';
import langOrigins from './games/language/word-origins/manifest.js';
import langSpellingRules from './games/language/spelling-rules/manifest.js';
import langSyllables from './games/language/syllables/manifest.js';
import langSuffixChoice from './games/language/suffix-choice/manifest.js';
import langSyllableDivision from './games/language/syllable-division/manifest.js';
import langChameleon from './games/language/chameleon/manifest.js';
import langSchwa from './games/language/schwa/manifest.js';
import counting from './games/counting/manifest.js';
import comparison from './games/comparison/manifest.js';
import skipCounting from './games/skip-counting/manifest.js';
import addition from './games/addition/manifest.js';
import subtraction from './games/subtraction/manifest.js';
import multiplication from './games/multiplication/manifest.js';
import division from './games/division/manifest.js';
import shapes from './games/shapes/manifest.js';
import patterns from './games/patterns/manifest.js';
import geoContinents from './games/geography/continents/manifest.js';
import geoCountries from './games/geography/countries/manifest.js';
import geoOceans from './games/geography/oceans/manifest.js';
import geoFlags from './games/geography/flags/manifest.js';
import geoLandmarks from './games/geography/landmarks/manifest.js';
import geoStateCapitals from './games/geography/state-capitals/manifest.js';
import clock from './games/life-skills/clock/manifest.js';
import money from './games/life-skills/money/manifest.js';
import manners from './games/life-skills/manners/manifest.js';
import swimming from './games/skills/swimming/manifest.js';
import astroPlanets from './games/astronomy/planets/manifest.js';
import astroMoons from './games/astronomy/moons/manifest.js';
import astroSun from './games/astronomy/sun/manifest.js';
import astroGalaxies from './games/astronomy/galaxies/manifest.js';

// Language stream
registry.register(typing);
registry.register(langSpelling);
registry.register(langSpellingRules);
registry.register(langSyllables);
registry.register(langSuffixChoice);
registry.register(langSyllableDivision);
registry.register(langSchwa);
registry.register(langOpposites);
registry.register(langSynonyms);
registry.register(langRhymes);
registry.register(langWordMeanings);
registry.register(langLetterMatch);
registry.register(langStartingSounds);
registry.register(langRoots);
registry.register(langAffixes);
registry.register(langOrigins);
registry.register(langChameleon);
// Math stream
registry.register(counting);
registry.register(comparison);
registry.register(skipCounting);
registry.register(addition);
registry.register(subtraction);
registry.register(multiplication);
registry.register(division);
registry.register(shapes);
registry.register(patterns);
// Geography stream
registry.register(geoContinents);
registry.register(geoCountries);
registry.register(geoOceans);
registry.register(geoFlags);
registry.register(geoLandmarks);
registry.register(geoStateCapitals);
// Life Skills stream
registry.register(manners);
registry.register(clock);
registry.register(money);
// Skills stream
registry.register(swimming);
// Astronomy stream
registry.register(astroPlanets);
registry.register(astroMoons);
registry.register(astroSun);
registry.register(astroGalaxies);

const mount = document.getElementById('app');
let root = null; // chosen data folder handle

boot();

async function boot() {
  if (!isSupported()) return renderUnsupported();

  // Try to silently reuse the last folder; if permission needs a click, the
  // setup screen's button will re-grant it.
  const restored = await restoreDataFolder();
  if (restored) {
    try {
      if ((await restored.queryPermission({ mode: 'readwrite' })) === 'granted') {
        root = restored;
        return renderPlayerSelect();
      }
    } catch { /* fall through to setup */ }
    return renderSetup(restored);
  }
  return renderSetup(null);
}

// ---------------- Screens ----------------

function renderUnsupported() {
  mount.innerHTML = '';
  const screen = div('screen');
  screen.append(
    h1('🎈 Learning Games'),
    notice(
      "This app needs to read and write a folder on your computer, which only " +
      "works in <b>Google Chrome</b> or <b>Microsoft Edge</b>.<br><br>" +
      "Please open <code>http://localhost:8000</code> in Chrome or Edge.",
      true,
    ),
  );
  mount.append(screen);
}

function renderSetup(restoredHandle) {
  mount.innerHTML = '';
  const screen = div('screen');
  const heading = restoredHandle ? 'Welcome back! 🎈' : '🎈 Learning Games';
  const lead = restoredHandle
    ? 'Click below to reopen your saved data folder.'
    : 'Pick a folder on your computer where each player’s progress will be saved.';

  const btn = button('big-btn', restoredHandle ? '📂 Reopen My Folder' : '📂 Choose Data Folder');
  btn.onclick = async () => {
    try {
      if (restoredHandle) {
        const ok = await ensurePermission(restoredHandle);
        if (!ok) { await forgetDataFolder(); return renderSetup(null); }
        root = restoredHandle;
      } else {
        root = await pickDataFolder();
        await ensurePermission(root);
      }
      renderPlayerSelect();
    } catch (err) {
      if (err && err.name === 'AbortError') return; // user cancelled the picker
      alert('Could not open that folder: ' + (err.message || err));
    }
  };

  screen.append(h1(heading), p('lead', lead), btn);
  if (restoredHandle) {
    const other = button('link-btn', 'Choose a different folder');
    other.onclick = async () => { await forgetDataFolder(); renderSetup(null); };
    screen.append(other);
  }
  mount.append(screen);
}

async function renderPlayerSelect() {
  mount.innerHTML = '';
  const screen = div('screen');
  screen.append(h1('Who is playing? 👋'));

  let players = [];
  try {
    players = await getPlayers(root);
  } catch (err) {
    alert('Could not read the data folder: ' + (err.message || err));
    return renderSetup(null);
  }

  const lastPlayer = await getLastPlayer();

  if (players.length) {
    // Load each player's age (from profile.json) to show on their card.
    const profiles = await Promise.all(
      players.map((n) => readProfile(root, n).catch(() => null)),
    );
    const grid = div('player-grid');
    players.forEach((name, i) => {
      const card = button('player-card');
      card.append(spanText('avatar', avatarFor(name)), document.createTextNode(name));
      const age = profiles[i] && profiles[i].age != null ? clampAge(profiles[i].age) : null;
      const bits = [];
      if (age != null) bits.push(`age ${age}`);
      if (name === lastPlayer) bits.push('last played');
      if (bits.length) card.append(spanText('sub', bits.join(' · ')));
      card.onclick = () => enterApp(name);
      grid.append(card);
    });
    screen.append(grid);
  } else {
    screen.append(p('lead', 'No players yet — add one to get started!'));
  }

  // Add-player box: name + age slider + button
  const addBox = div('add-box');
  addBox.append(p('add-title', 'Add a new player'));
  const input = document.createElement('input');
  input.placeholder = 'New player name';
  input.maxLength = 40;
  const slider = makeAgeSlider(5);
  const addBtn = button('big-btn secondary', '➕ Add Player');
  const submit = async () => {
    const name = input.value;
    if (!name.trim()) return input.focus();
    try {
      const safe = await addPlayer(root, name);
      await writeProfile(root, safe, { age: slider.value });
      enterApp(safe);
    } catch (err) {
      alert(err.message || String(err));
    }
  };
  addBtn.onclick = submit;
  input.onkeydown = (e) => { if (e.key === 'Enter') submit(); };
  addBox.append(input, slider.el, addBtn);
  screen.append(addBox);

  const change = button('link-btn', '📂 Change data folder');
  change.onclick = () => renderSetup(root);
  screen.append(change);

  mount.append(screen);
  input.focus();
}

async function enterApp(player) {
  await rememberPlayer(player);
  let age = 5;
  try {
    const prof = await readProfile(root, player);
    if (prof && prof.age != null) age = clampAge(prof.age);
  } catch { /* default age */ }
  startApp(mount, {
    root,
    player,
    age,
    onSwitchPlayer: () => renderPlayerSelect(),
    onChangeFolder: () => renderSetup(root),
  });
}

// ---------------- tiny DOM helpers ----------------
function div(cls) { const d = document.createElement('div'); if (cls) d.className = cls; return d; }
function h1(text) { const n = document.createElement('h1'); n.textContent = text; return n; }
function p(cls, text) { const n = document.createElement('p'); n.className = cls; n.textContent = text; return n; }
function button(cls, text) { const b = document.createElement('button'); b.className = cls; if (text != null) b.textContent = text; return b; }
function spanText(cls, text) { const s = document.createElement('span'); s.className = cls; s.textContent = text; return s; }
function notice(html, isError) {
  const n = div('notice');
  n.innerHTML = html;
  return n;
}
function avatarFor(name) {
  const avatars = ['🦊', '🐼', '🐰', '🦁', '🐸', '🐨', '🐵', '🦄', '🐙', '🐢'];
  let sum = 0;
  for (const ch of name) sum += ch.charCodeAt(0);
  return avatars[sum % avatars.length];
}
