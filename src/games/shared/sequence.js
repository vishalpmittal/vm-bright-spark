// Shared "what comes next?" engine for Skip Counting (numbers) and Patterns
// (emoji). Shows a sequence with a "?" at the end; the child picks the next item.
// Difficulty starts from the child's age and ramps up after each correct answer.
//
//   makeSequenceGame({ title, icon, mode }) -> mount(host, ctx)
//   mode: 'number' (skip counting) | 'pattern' (repeating emoji patterns)

import { bigEmoji } from './emoji.js';

const ROUNDS = 8;
const LEVEL_CAP = 5;
const EMOJIS = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⭐', '❤️'];

const MOTIVATION = {
  3: ['Pattern pro! 🌟', 'You see the pattern! 🧠', 'Amazing! 🚀'],
  2: ['Great job! 🎉', 'You are getting good! 💪', 'Nice work! ✋'],
  1: ['Good try! Keep looking! 🌱', 'Patterns take practice! 😊', 'You did it! 🐣'],
};

function ageToStartLevel(age) {
  const a = Math.min(10, Math.max(3, Math.round(Number(age) || 5)));
  return { 3: 1, 4: 1, 5: 1, 6: 2, 7: 2, 8: 3, 9: 3, 10: 4 }[a];
}
function randInt(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function genNumber(level) {
  const pool = [1, 2];
  if (level >= 2) pool.push(5);
  if (level >= 3) pool.push(10);
  if (level >= 4) pool.push(3);
  const step = pick(pool);
  const start = randInt(0, 3 + level);
  const shown = 4;
  const display = [];
  for (let i = 0; i < shown; i++) display.push(String(start + i * step));
  const answer = start + shown * step;

  const set = new Set([answer]);
  for (const c of [answer + step, answer - step, answer + 1, answer - 1, answer + 2]) {
    if (set.size >= 4) break;
    if (c >= 0) set.add(c);
  }
  let n = answer + 3;
  while (set.size < 4) set.add(n++);
  return { display, answer: String(answer), choices: shuffle([...set].map(String)) };
}

function genPattern(level) {
  const unitsByLevel = {
    1: [[0, 1]],
    2: [[0, 1], [0, 1, 2]],
    3: [[0, 0, 1, 1], [0, 1, 1]],
    4: [[0, 1, 2], [0, 0, 1], [0, 1, 1, 2]],
    5: [[0, 1, 2, 1], [0, 0, 1, 2]],
  };
  const lvl = Math.min(LEVEL_CAP, Math.max(1, level));
  const unit = pick(unitsByLevel[lvl]);
  const distinct = Math.max(...unit) + 1;
  const em = shuffle(EMOJIS).slice(0, distinct);
  const shown = Math.max(unit.length * 2, 4);
  const display = [];
  for (let i = 0; i < shown; i++) display.push(em[unit[i % unit.length]]);
  const answer = em[unit[shown % unit.length]];

  const choiceSet = new Set(em);
  for (const e of EMOJIS) { if (choiceSet.size >= Math.min(4, distinct + 1)) break; choiceSet.add(e); }
  return { display, answer, choices: shuffle([...choiceSet]), emoji: true };
}

export function makeSequenceGame(config) {
  const { title, icon = '🔢', mode = 'number' } = config;
  const gen = mode === 'pattern' ? genPattern : genNumber;

  return function mount(host, ctx) {
    let disposed = false;
    showStart();

    async function showStart() {
      const data = await ctx.load();
      if (disposed) return;
      const t = data.totals || {};
      const best = data.best || {};
      host.innerHTML = '';
      const card = div('card');
      card.append(
        hEl('h1', 'game-title', `${icon} ${title}`),
        pEl('game-sub', `Hi ${ctx.player}! What comes next? Tap the answer.`),
      );
      if (t.sessions) {
        const stats = div('stat-row');
        stats.append(stat(t.correct || 0, 'right answers'), stat(best.scoreInSession || 0, 'best score'));
        card.append(stats);
      }
      const row = div('row-btns');
      const start = btn('big-btn', '▶️ Start');
      start.onclick = () => playSession();
      row.append(start);
      card.append(row);
      host.append(card);
    }

    function playSession() {
      let round = 0;
      let correct = 0;
      let attempts = 0;
      const startedAt = Date.now();
      let level = ageToStartLevel(ctx.age);
      const startLevel = level;
      const seen = new Set(); // sequences already shown this session

      host.innerHTML = '';
      const card = div('card');
      const progress = pEl('game-sub', '');
      const seqRow = div('seq-row');
      const choices = div('arith-choices');
      const feedback = pEl('count-feedback', '');
      card.append(progress, seqRow, choices, feedback);
      // Skip Counting is numbers only; give it a themed graphic. (Pattern mode
      // already shows emoji in the sequence itself.)
      if (mode === 'number') card.insertBefore(bigEmoji('🔢'), seqRow);
      host.append(card);

      let answer = null;
      let locked = false;
      let firstTry = true;

      function newRound() {
        locked = false;
        firstTry = true;
        feedback.textContent = '';
        feedback.className = 'count-feedback';

        // Avoid repeating a sequence already shown this session (bounded retry).
        let r, guard = 0;
        do { r = gen(level); guard += 1; }
        while (seen.has(`${r.display.join(',')}=>${r.answer}`) && guard < 30);
        seen.add(`${r.display.join(',')}=>${r.answer}`);
        answer = r.answer;
        progress.innerHTML = `Round ${round + 1} of ${ROUNDS}` +
          ` &nbsp;•&nbsp; <span class="level-chip">level ${level}</span>`;

        seqRow.innerHTML = '';
        for (const item of r.display) seqRow.append(hEl('span', 'seq-item', item));
        seqRow.append(hEl('span', 'seq-item seq-q', '?'));

        choices.innerHTML = '';
        for (const c of r.choices) {
          const b = btn('choice-btn' + (r.emoji ? ' emoji' : ''), c);
          b.onclick = () => choose(c, b);
          choices.append(b);
        }
      }

      function choose(val, buttonEl) {
        if (locked) return;
        attempts += 1;
        if (val === answer) {
          locked = true;
          if (firstTry) {
            correct += 1;
            level = Math.min(LEVEL_CAP, level + 1);
          }
          buttonEl.classList.add('right');
          feedback.textContent = '✅ Yes!';
          feedback.className = 'count-feedback good';
          setTimeout(() => {
            if (disposed) return;
            round += 1;
            if (round >= ROUNDS) finishSession();
            else newRound();
          }, 800);
        } else {
          firstTry = false;
          buttonEl.classList.add('wrong');
          feedback.textContent = '🤔 Try again!';
          feedback.className = 'count-feedback bad';
          setTimeout(() => buttonEl.classList.remove('wrong'), 500);
        }
      }

      function finishSession() {
        const durationSec = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
        showResults({ correct, attempts, rounds: ROUNDS, durationSec, startLevel, endLevel: level });
      }

      newRound();
    }

    async function showResults(session) {
      const ratio = session.correct / session.rounds;
      const efficiency = session.attempts ? session.correct / session.attempts : 1;
      const stars = ratio >= 1 && efficiency >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1;

      const record = {
        date: new Date().toISOString(),
        correct: session.correct,
        attempts: session.attempts,
        rounds: session.rounds,
        durationSec: session.durationSec,
      };
      let data;
      try {
        data = await ctx.recordSession(record);
        data.best = data.best || {};
        if (session.correct > (data.best.scoreInSession || 0)) data.best.scoreInSession = session.correct;
        await ctx.save(data);
      } catch (err) {
        console.error('Could not save sequence progress', err);
      }
      if (disposed) return;

      host.innerHTML = '';
      const card = div('card result');
      card.append(hEl('h1', 'game-title', 'All done! 🎊'));
      const starEl = div('stars');
      for (let i = 1; i <= 3; i++) {
        const s = document.createElement('span');
        s.textContent = '⭐';
        s.className = i <= stars ? 'star-on' : 'star-off';
        starEl.append(s);
      }
      card.append(starEl);
      card.append(pEl('motivation', pick(MOTIVATION[stars])));
      const stats = div('stat-row');
      stats.append(stat(session.correct, 'right answers'), stat(session.rounds, 'rounds played'));
      card.append(stats);

      const row = div('row-btns');
      const again = btn('big-btn', '🔁 Play Again');
      again.onclick = () => playSession();
      const home = btn('big-btn secondary', '🏠 Menu');
      home.onclick = () => showStart();
      row.append(again, home);
      card.append(row);
      host.append(card);
    }

    return () => { disposed = true; };
  };
}

// ---- tiny DOM helpers ----
function div(cls) { const d = document.createElement('div'); if (cls) d.className = cls; return d; }
function hEl(tag, cls, text) { const n = document.createElement(tag); n.className = cls; n.textContent = text; return n; }
function pEl(cls, text) { const n = document.createElement('p'); n.className = cls; n.textContent = text; return n; }
function btn(cls, text) { const b = document.createElement('button'); b.className = cls; b.textContent = text; return b; }
function stat(num, label) { const s = div('stat'); s.append(hEl('div', 'num', String(num)), hEl('div', 'label', label)); return s; }
