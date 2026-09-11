// Compare It! — show two numbers and pick >, < or =.
// Number size starts from the child's age and grows after each correct answer.
// Reuses the arithmetic games' CSS (.arith-eq, .arith-choices, .choice-btn).

const ROUNDS = 8;
const CAP = 20;

const SIGNS = [
  { sign: '>', label: '>  bigger' },
  { sign: '<', label: '<  smaller' },
  { sign: '=', label: '=  same' },
];

const MOTIVATION = {
  3: ['Number master! 🌟', 'Perfect comparing! 🧠', 'Amazing! 🚀'],
  2: ['Great job! 🎉', 'You are getting good! 💪', 'Nice work! ✋'],
  1: ['Good try! Keep going! 🌱', 'Practice makes perfect! 😊', 'You did it! 🐣'],
};

function ageToStartMax(age) {
  const a = Math.min(10, Math.max(3, Math.round(Number(age) || 5)));
  return { 3: 5, 4: 6, 5: 8, 6: 10, 7: 12, 8: 15, 9: 18, 10: 20 }[a];
}
function randInt(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

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
      hEl('h1', 'game-title', '⚖️ Compare It!'),
      pEl('game-sub', `Hi ${ctx.player}! Which number is bigger? Pick the right sign.`),
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
    let currentMax = ageToStartMax(ctx.age);
    const startMax = currentMax;
    let maxShown = currentMax;
    const seen = new Set(); // number pairs already asked this session

    host.innerHTML = '';
    const card = div('card');
    const progress = pEl('game-sub', '');
    const equation = hEl('h2', 'arith-eq', '');
    const visual = div('arith-visual');
    const choices = div('arith-choices');
    const feedback = pEl('count-feedback', '');
    card.append(progress, equation, visual, choices, feedback);
    host.append(card);

    let answer = '=';
    let locked = false;
    let firstTry = true;

    function newRound() {
      locked = false;
      firstTry = true;
      feedback.textContent = '';
      feedback.className = 'count-feedback';
      maxShown = currentMax;

      // Pick a pair not already asked this session (bounded retry).
      let a, b, guard = 0;
      do {
        a = randInt(0, currentMax);
        // ~25% of the time make them equal so "=" shows up regularly
        b = Math.random() < 0.25 ? a : randInt(0, currentMax);
        guard += 1;
      } while (seen.has(`${a}|${b}`) && guard < 30);
      seen.add(`${a}|${b}`);
      answer = a > b ? '>' : a < b ? '<' : '=';

      progress.innerHTML = `Round ${round + 1} of ${ROUNDS}` +
        ` &nbsp;•&nbsp; <span class="level-chip">up to ${currentMax}</span>`;
      equation.textContent = `${a}   ?   ${b}`;

      // Show the two amounts as emoji so the comparison is concrete.
      visual.innerHTML = '';
      visual.append(numGroup(a, '🔵'), signEl('?'), numGroup(b, '🟠'));

      choices.innerHTML = '';
      for (const c of SIGNS) {
        const b2 = btn('choice-btn', c.label);
        b2.onclick = () => choose(c.sign, b2);
        choices.append(b2);
      }
    }

    function choose(sign, buttonEl) {
      if (locked) return;
      attempts += 1;
      if (sign === answer) {
        locked = true;
        if (firstTry) {
          correct += 1;
          currentMax = Math.min(CAP, currentMax + 1);
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
      if (session.correct > (data.best.scoreInSession || 0)) data.best.scoreInSession = session.correct;
      await ctx.save(data);
    } catch (err) {
      console.error('Could not save compare progress', err);
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
function signEl(text) { const s = document.createElement('span'); s.className = 'arith-sign'; s.textContent = text; return s; }
function numGroup(n, em) {
  const g = div('arith-group');
  if (n === 0) { g.append(hEl('span', 'arith-zero', '0')); return g; }
  for (let i = 0; i < n; i++) g.append(hEl('span', 'arith-emoji', em));
  return g;
}
