// Money — a money-literacy game with three modes chosen from a start screen:
//   • Know Your Money — what each coin/bill is worth (quiz engine)
//   • Big Money        — millions / billions / trillions (quiz engine)
//   • Add It Up        — combine bills + coins into a $X.YY total (custom)

import { makeQuizGame } from '../../shared/quiz.js';
import { bigEmoji } from '../../shared/emoji.js';
import { KNOW_MONEY, BIG_MONEY, ADD_DENOMS, fmtMoney } from './data.js';
import { moneyArt, moneyArtFromValue } from './money-art.js';

const MODES = [
  { id: 'know', label: 'Know Your Money', icon: '💵', sub: 'coins & bills' },
  { id: 'big', label: 'Big Money', icon: '💰', sub: 'millions & billions' },
  { id: 'add', label: 'Add It Up', icon: '🧮', sub: 'find the total' },
];

export function mount(host, ctx) {
  let disposed = false;
  let cleanup = null;

  showPicker();

  function disposeCurrent() {
    if (cleanup) { try { cleanup(); } catch { /* ignore */ } cleanup = null; }
  }
  const back = () => { disposeCurrent(); showPicker(); };

  function showPicker() {
    disposeCurrent();
    host.innerHTML = '';
    const card = div('card');
    card.append(
      hEl('h1', 'game-title', '💵 Money'),
      pEl('game-sub', `Hi ${ctx.player}! Pick what you want to learn about money.`),
    );
    const preview = div('money-row');
    for (const [k, v] of [['coin', '25¢'], ['coin', '10¢'], ['bill', '$1'], ['bill', '$5']]) {
      preview.append(moneyArt(k, v));
    }
    card.append(preview);
    const grid = div('player-grid');
    for (const m of MODES) {
      const b = btn('player-card');
      b.append(span('avatar', m.icon), document.createTextNode(m.label), span('sub', m.sub));
      b.onclick = () => launch(m);
      grid.append(b);
    }
    card.append(grid);
    host.append(card);
  }

  function launch(mode) {
    disposeCurrent();
    if (disposed) return;
    if (mode.id === 'know') {
      const m = makeQuizGame({
        title: 'Know Your Money',
        icon: '💵',
        data: KNOW_MONEY,
        prompt: (d) => `How much is a ${d.name} worth?`,
        answer: (d) => d.value,
        promptNode: (d) => moneyArtFromValue(d.value),
        onBack: back,
        backLabel: '⬅ Pick another',
      });
      cleanup = m(host, ctx) || null;
    } else if (mode.id === 'big') {
      const m = makeQuizGame({
        title: 'Big Money',
        icon: '💰',
        data: BIG_MONEY,
        prompt: (d) => d.q,
        answer: (d) => d.a,
        promptNode: () => bigEmoji('💰'),
        onBack: back,
        backLabel: '⬅ Pick another',
      });
      cleanup = m(host, ctx) || null;
    } else {
      cleanup = mountAddUp(host, ctx, back) || null;
    }
  }

  return () => { disposed = true; disposeCurrent(); };
}

// ---------------- Add It Up (custom) ----------------
const ROUNDS = 8;
const LEVEL_CAP = 4;
const MOTIVATION = {
  3: ['Money master! 🌟', 'You can add money! 🧠', 'Amazing! 🚀'],
  2: ['Great job! 🎉', 'Getting good with money! 💪', 'Nice work! ✋'],
  1: ['Good try! Money adding is tricky! 🌱', 'Keep going! 😊', 'You did it! 🐣'],
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

function mountAddUp(host, ctx, onBack) {
  let disposed = false;
  showStart();

  async function showStart() {
    const data = await ctx.load();
    if (disposed) return;
    host.innerHTML = '';
    const card = div('card');
    card.append(
      hEl('h1', 'game-title', '🧮 Add It Up'),
      pEl('game-sub', `Add up the bills and coins, then pick the total.`),
    );
    const row = div('row-btns');
    const start = btn('big-btn', '▶️ Start');
    start.onclick = () => playSession();
    row.append(start);
    card.append(row);
    const b = btn('link-btn', '⬅ Pick another');
    b.onclick = () => onBack();
    card.append(b);
    host.append(card);
  }

  function playSession() {
    let round = 0;
    let correct = 0;
    let attempts = 0;
    const startedAt = Date.now();
    let level = ageToStartLevel(ctx.age);
    const startLevel = level;
    const seen = new Set(); // coin/bill combinations already shown this session

    host.innerHTML = '';
    const card = div('card');
    const progress = pEl('game-sub', '');
    const moneyRow = div('money-row');
    const question = pEl('game-sub', 'How much money is this in total?');
    const choices = div('arith-choices');
    const feedback = pEl('count-feedback', '');
    card.append(progress, moneyRow, question, choices, feedback);
    host.append(card);

    let answer = 0;
    let locked = false;
    let firstTry = true;

    function newRound() {
      locked = false;
      firstTry = true;
      feedback.textContent = '';
      feedback.className = 'count-feedback';

      const allowed = ADD_DENOMS.filter((d) => d.minLevel <= Math.min(LEVEL_CAP, level));
      // Build a coin/bill combination not already shown this session (bounded).
      let items, sig, guard = 0;
      do {
        const count = randInt(2, Math.min(6, 2 + level));
        items = [];
        for (let i = 0; i < count; i++) items.push(pick(allowed));
        items.sort((a, b) => b.cents - a.cents);
        sig = items.map((it) => it.cents).join(',');
        guard += 1;
      } while (seen.has(sig) && guard < 30);
      seen.add(sig);
      answer = items.reduce((s, it) => s + it.cents, 0);

      progress.innerHTML = `Round ${round + 1} of ${ROUNDS}` +
        ` &nbsp;•&nbsp; <span class="level-chip">level ${level}</span>`;

      moneyRow.innerHTML = '';
      for (const it of items) moneyRow.append(moneyArt(it.kind, it.label));

      // distractors: nudge the total by a coin/bill amount
      const set = new Set([answer]);
      for (const delta of [25, 50, 100, 10, 5, 500, 1]) {
        if (set.size >= 4) break;
        if (answer + delta > 0) set.add(answer + delta);
        if (set.size < 4 && answer - delta > 0) set.add(answer - delta);
      }
      let extra = 100;
      while (set.size < 4) { set.add(answer + extra); extra += 100; }

      choices.innerHTML = '';
      for (const cents of shuffle([...set])) {
        const b = btn('choice-btn', fmtMoney(cents));
        b.onclick = () => choose(cents, b);
        choices.append(b);
      }
    }

    function choose(cents, buttonEl) {
      if (locked) return;
      attempts += 1;
      if (cents === answer) {
        locked = true;
        if (firstTry) {
          correct += 1;
          level = Math.min(LEVEL_CAP, level + 1);
        }
        buttonEl.classList.add('right');
        feedback.textContent = `✅ Yes! ${fmtMoney(answer)}`;
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
        feedback.textContent = '🤔 Try again! Count slowly.';
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
      console.error('Could not save money progress', err);
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
    const home = btn('big-btn secondary', '⬅ Pick another');
    home.onclick = () => onBack();
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
function btn(cls, text) { const b = document.createElement('button'); b.className = cls; if (text != null) b.textContent = text; return b; }
function span(cls, text) { const s = document.createElement('span'); s.className = cls; s.textContent = text; return s; }
function stat(num, label) { const s = div('stat'); s.append(hEl('div', 'num', String(num)), hEl('div', 'label', label)); return s; }
