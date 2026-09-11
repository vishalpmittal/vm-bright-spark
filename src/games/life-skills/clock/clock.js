// What's the Time? — read an analog clock and pick the matching time.
// Difficulty grows from o'clock only -> half hours -> quarters -> 5-minutes,
// starting from the child's age and ramping up after each correct answer.

const ROUNDS = 8;
const LEVEL_CAP = 4;
const SVG_NS = 'http://www.w3.org/2000/svg';

const MOTIVATION = {
  3: ['Time master! 🌟', 'You can read the clock! 🧠', 'Amazing! 🚀'],
  2: ['Great job! 🎉', 'Getting good at time! 💪', 'Nice work! ✋'],
  1: ['Good try! Clocks take practice! 🌱', 'Keep going! 😊', 'You did it! 🐣'],
};

// Allowed minute values per level.
const MINUTES = {
  1: [0],
  2: [0, 30],
  3: [0, 15, 30, 45],
  4: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
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
function fmt(h, m) { return `${h}:${String(m).padStart(2, '0')}`; }

function drawClock(h, m) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 200 200');
  svg.setAttribute('class', 'clock-svg');
  const cx = 100, cy = 100, r = 92;

  const face = document.createElementNS(SVG_NS, 'circle');
  face.setAttribute('cx', cx); face.setAttribute('cy', cy); face.setAttribute('r', r);
  face.setAttribute('class', 'clock-face');
  svg.append(face);

  // hour numbers 1..12
  for (let n = 1; n <= 12; n++) {
    const ang = (n / 12) * 2 * Math.PI;
    const tx = cx + Math.sin(ang) * (r - 18);
    const ty = cy - Math.cos(ang) * (r - 18);
    const t = document.createElementNS(SVG_NS, 'text');
    t.setAttribute('x', tx); t.setAttribute('y', ty + 6);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('class', 'clock-num');
    t.textContent = String(n);
    svg.append(t);
  }

  const hand = (lenFrac, angleDeg, cls) => {
    const a = (angleDeg * Math.PI) / 180;
    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', cx); line.setAttribute('y1', cy);
    line.setAttribute('x2', cx + Math.sin(a) * r * lenFrac);
    line.setAttribute('y2', cy - Math.cos(a) * r * lenFrac);
    line.setAttribute('class', cls);
    return line;
  };
  svg.append(hand(0.5, (h % 12) * 30 + m * 0.5, 'clock-hour'));
  svg.append(hand(0.8, m * 6, 'clock-minute'));

  const dot = document.createElementNS(SVG_NS, 'circle');
  dot.setAttribute('cx', cx); dot.setAttribute('cy', cy); dot.setAttribute('r', 5);
  dot.setAttribute('class', 'clock-dot');
  svg.append(dot);
  return svg;
}

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
      hEl('h1', 'game-title', "🕐 What's the Time?"),
      pEl('game-sub', `Hi ${ctx.player}! Look at the clock and pick the time.`),
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
    const seen = new Set(); // times already asked this session

    host.innerHTML = '';
    const card = div('card');
    const progress = pEl('game-sub', '');
    const clockWrap = div('clock-wrap');
    const choices = div('arith-choices');
    const feedback = pEl('count-feedback', '');
    card.append(progress, clockWrap, choices, feedback);
    host.append(card);

    let answer = '';
    let locked = false;
    let firstTry = true;

    function newRound() {
      locked = false;
      firstTry = true;
      feedback.textContent = '';
      feedback.className = 'count-feedback';

      const mins = MINUTES[Math.min(LEVEL_CAP, level)];
      // Avoid repeating a time already asked this session (bounded retry).
      let h, m, tries = 0;
      do { h = randInt(1, 12); m = pick(mins); tries += 1; }
      while (seen.has(fmt(h, m)) && tries < 40);
      seen.add(fmt(h, m));
      answer = fmt(h, m);

      progress.innerHTML = `Round ${round + 1} of ${ROUNDS}` +
        ` &nbsp;•&nbsp; <span class="level-chip">level ${level}</span>`;
      clockWrap.innerHTML = '';
      clockWrap.append(drawClock(h, m));

      // distractors
      const set = new Set([answer]);
      let guard = 0;
      while (set.size < 4 && guard++ < 50) {
        const dh = ((h - 1 + randInt(-2, 2) + 12) % 12) + 1;
        const dm = pick(mins);
        set.add(fmt(dh, dm));
      }
      let extra = 1;
      while (set.size < 4) set.add(fmt(((h + extra - 1) % 12) + 1, pick(mins))), extra++;

      choices.innerHTML = '';
      for (const c of shuffle([...set])) {
        const b = btn('choice-btn', c);
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
        feedback.textContent = '✅ Yes! ' + answer;
        feedback.className = 'count-feedback good';
        setTimeout(() => {
          if (disposed) return;
          round += 1;
          if (round >= ROUNDS) finishSession();
          else newRound();
        }, 900);
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
      console.error('Could not save clock progress', err);
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
}

// ---- tiny DOM helpers ----
function div(cls) { const d = document.createElement('div'); if (cls) d.className = cls; return d; }
function hEl(tag, cls, text) { const n = document.createElement(tag); n.className = cls; n.textContent = text; return n; }
function pEl(cls, text) { const n = document.createElement('p'); n.className = cls; n.textContent = text; return n; }
function btn(cls, text) { const b = document.createElement('button'); b.className = cls; b.textContent = text; return b; }
function stat(num, label) { const s = div('stat'); s.append(hEl('div', 'num', String(num)), hEl('div', 'label', label)); return s; }
