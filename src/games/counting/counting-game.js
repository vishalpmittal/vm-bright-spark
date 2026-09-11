// Count It! — show a bunch of emoji, tap the number that matches. Great for
// ages 4–6 practising counting to 10. Progress is saved per player.

import { pickItemSet } from './items.js';

const ROUNDS = 8;
const MAX_CAP = 20; // hardest: count all the way up to 20

// Map an age (3–10) to the starting maximum number shown.
function ageToStartMax(age) {
  const map = { 3: 3, 4: 4, 5: 5, 6: 6, 7: 8, 8: 10, 9: 12, 10: 15 };
  const a = Math.min(10, Math.max(3, Math.round(Number(age) || 5)));
  return map[a];
}

const MOTIVATION = {
  3: ['You are a counting champion! 🏆', 'Perfect counting! 🌟', 'Numbers love you! 🚀'],
  2: ['Great counting! 🎉', 'So close to perfect! 💪', 'You are really good at this! ✋'],
  1: ['Good try! Counting is fun! 🌱', 'Keep counting, you are learning! 😊', 'You did it! 🐣'],
};

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); }

export function mount(host, ctx) {
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
      hEl('h1', 'game-title', '🔢 Count It!'),
      pEl('game-sub', `Hi ${ctx.player}! Count the things and tap the right number.`),
    );

    if (t.sessions) {
      const stats = div('stat-row');
      stats.append(
        stat(t.correct || 0, 'right answers'),
        stat(best.scoreInSession || 0, 'best score'),
      );
      card.append(stats);
    }

    const row = div('row-btns');
    const start = btn('big-btn', '▶️ Start Counting');
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

    // Starts from the child's age; grows by 1 after each correct answer.
    let currentMax = ageToStartMax(ctx.age);
    const startMax = currentMax;
    let maxShown = currentMax; // highest number actually shown in a round
    const seen = new Set(); // counts already asked this session

    host.innerHTML = '';
    const card = div('card');
    const progress = pEl('game-sub', '');
    const question = hEl('h2', 'count-q', '');
    const stage = div('count-stage');
    const pad = div('count-pad');
    const feedback = pEl('count-feedback', '');
    card.append(progress, question, stage, pad, feedback);
    host.append(card);

    let answer = 0;
    let locked = false;
    let firstTry = true;

    function newRound() {
      locked = false;
      firstTry = true;
      feedback.textContent = '';
      feedback.className = 'count-feedback';
      maxShown = currentMax;
      const set = pickItemSet();
      // Avoid asking the same count twice in a session (bounded retry; if the
      // range is smaller than the rounds left, a repeat is unavoidable).
      let n = randInt(1, currentMax), guard = 0;
      while (seen.has(n) && guard++ < 30) n = randInt(1, currentMax);
      seen.add(n);
      answer = n;
      progress.innerHTML = `Round ${round + 1} of ${ROUNDS}` +
        ` &nbsp;•&nbsp; <span class="level-chip">up to ${currentMax}</span>`;
      question.textContent = `How many ${set.name}?`;

      stage.innerHTML = '';
      for (let i = 0; i < answer; i++) {
        const item = document.createElement('span');
        item.className = 'count-item';
        item.textContent = set.emoji;
        item.style.animationDelay = `${i * 0.05}s`;
        stage.append(item);
      }

      pad.innerHTML = '';
      for (let n = 1; n <= currentMax; n++) {
        const b = btn('num-btn', String(n));
        b.onclick = () => choose(n, b);
        pad.append(b);
      }
    }

    function choose(n, buttonEl) {
      if (locked) return;
      attempts += 1;
      if (n === answer) {
        locked = true;
        if (firstTry) {
          correct += 1;
          currentMax = Math.min(MAX_CAP, currentMax + 1); // ramp up after a right answer
        }
        buttonEl.classList.add('right');
        feedback.textContent = '✅ Yes! ' + answer;
        feedback.className = 'count-feedback good';
        setTimeout(() => {
          if (disposed) return;
          round += 1;
          if (round >= ROUNDS) finishSession();
          else newRound();
        }, 700);
      } else {
        firstTry = false;
        buttonEl.classList.add('wrong');
        feedback.textContent = '🤔 Try again! Count slowly.';
        feedback.className = 'count-feedback bad';
        setTimeout(() => buttonEl.classList.remove('wrong'), 500);
      }
    }

    function finishSession() {
      const durationSec = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
      showResults({ correct, attempts, rounds: ROUNDS, durationSec, startMax, maxReached: maxShown });
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
      if (session.correct > (data.best.scoreInSession || 0)) {
        data.best.scoreInSession = session.correct;
      }
      await ctx.save(data);
    } catch (err) {
      console.error('Could not save counting progress', err);
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
    stats.append(
      stat(session.correct, 'right answers'),
      stat(session.rounds, 'rounds played'),
    );
    card.append(stats);

    if (session.maxReached != null) {
      const levelNote = session.maxReached > session.startMax
        ? `Counted up to ${session.startMax} → ${session.maxReached} 📈`
        : `Counted up to ${session.startMax}`;
      card.append(pEl('game-sub', levelNote));
    }

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
}

// ---- tiny DOM helpers ----
function div(cls) { const d = document.createElement('div'); if (cls) d.className = cls; return d; }
function hEl(tag, cls, text) { const n = document.createElement(tag); n.className = cls; n.textContent = text; return n; }
function pEl(cls, text) { const n = document.createElement('p'); n.className = cls; n.textContent = text; return n; }
function btn(cls, text) { const b = document.createElement('button'); b.className = cls; b.textContent = text; return b; }
function stat(num, label) {
  const s = div('stat');
  s.append(hEl('div', 'num', String(num)), hEl('div', 'label', label));
  return s;
}
