// Shared arithmetic game engine used by both the Addition and Subtraction
// games. Configure it with an operator; everything else (age-based difficulty,
// ramp-on-correct, multiple-choice answers, emoji visuals, scoring, saving) is
// identical to the other Math games so the app stays consistent.
//
//   makeArithmeticGame({ op, symbol, emoji, icon, cap, startMax }) -> mount(host, ctx)
//   op: 'add' | 'sub' | 'mul' | 'div'  (× and ÷ show numbers only, no emoji helper)

const ROUNDS = 8;
const MAX_CAP = 20;         // hardest: operands up to 20
const VISUAL_LIMIT = 10;    // hide add/sub emoji helper when numbers get big
const GROUP_LIMIT = 30;     // max emoji to draw for × and ÷ before falling back

const MOTIVATION = {
  3: ['You are a math star! 🌟', 'Perfect! Your brain is super strong! 🧠', 'Amazing math! 🚀'],
  2: ['Great work! Keep it up! 🎉', 'You are getting really good! 💪', 'Nice math! High five! ✋'],
  1: ['Good try! Math takes practice! 🌱', 'Every try makes you smarter! 😊', 'You did it! 🐣'],
};

/** Map an age (3–10) to the starting maximum operand. */
function ageToStartMax(age) {
  const map = { 3: 3, 4: 4, 5: 5, 6: 6, 7: 8, 8: 10, 9: 12, 10: 15 };
  const a = Math.min(10, Math.max(3, Math.round(Number(age) || 5)));
  return map[a];
}

function randInt(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function makeArithmeticGame(config) {
  const { op, symbol, emoji, icon = '🔢', cap = MAX_CAP, startMax: startMaxFn = ageToStartMax } = config;

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
        hEl('h1', 'game-title', `${icon} ${config.title || 'Math'}`),
        pEl('game-sub', `Hi ${ctx.player}! Pick the right answer. Tap a number to choose.`),
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

      // Difficulty starts from the child's age and grows after each right answer.
      let currentMax = startMaxFn(ctx.age);
      const startMax = currentMax;
      let maxShown = currentMax;
      const seen = new Set(); // problems already asked this session (avoid repeats)

      host.innerHTML = '';
      const card = div('card');
      const progress = pEl('game-sub', '');
      const equation = hEl('h2', 'arith-eq', '');
      const visual = div('arith-visual');
      const choices = div('arith-choices');
      const feedback = pEl('count-feedback', '');
      card.append(progress, equation, visual, choices, feedback);
      host.append(card);

      let answer = 0;
      let locked = false;
      let firstTry = true;

      function makeProblem(max) {
        let a, b;
        if (op === 'add') {
          a = randInt(0, max);
          b = randInt(0, max);
          return { a, b, answer: a + b };
        }
        if (op === 'sub') {
          // keep the result zero or positive
          a = randInt(0, max);
          b = randInt(0, a);
          return { a, b, answer: a - b };
        }
        if (op === 'mul') {
          a = randInt(0, max);
          b = randInt(0, max);
          return { a, b, answer: a * b };
        }
        // division: whole-number result only (a = b * quotient)
        b = randInt(1, max);
        const q = randInt(0, max);
        return { a: b * q, b, answer: q };
      }

      function makeChoices(correctAnswer) {
        const set = new Set([correctAnswer]);
        let guard = 0;
        while (set.size < 4 && guard++ < 50) {
          const delta = randInt(1, 3) * (Math.random() < 0.5 ? -1 : 1);
          const c = correctAnswer + delta;
          if (c >= 0) set.add(c);
        }
        // pad upward if we somehow could not fill 4 (e.g. answer 0)
        let n = correctAnswer + 1;
        while (set.size < 4) set.add(n++);
        const arr = [...set];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      }

      function buildVisual(a, b) {
        visual.innerHTML = '';
        const dot = emoji || '🔵'; // × and ÷ don't set `emoji`; use a neutral token
        if (op === 'add') {
          if (a > VISUAL_LIMIT || b > VISUAL_LIMIT) { visual.append(fallbackVisual()); return; }
          visual.append(emojiGroup(a, dot), signEl(symbol), emojiGroup(b, dot));
        } else if (op === 'sub') {
          if (a > VISUAL_LIMIT || b > VISUAL_LIMIT) { visual.append(fallbackVisual()); return; }
          // show `a` items, cross out the last `b` (the ones taken away)
          const g = div('arith-group');
          for (let i = 0; i < a; i++) {
            const s = spanCls('arith-emoji');
            s.textContent = dot;
            if (i >= a - b) s.classList.add('gone');
            g.append(s);
          }
          visual.append(g);
        } else if (op === 'mul') {
          // `a` groups of `b` items (a × b)
          if (a === 0 || b === 0 || a * b > GROUP_LIMIT) { visual.append(fallbackVisual()); return; }
          for (let i = 0; i < a; i++) visual.append(emojiGroup(b, dot));
        } else {
          // division: `a` items shared into `b` equal groups (a ÷ b)
          if (a === 0 || b === 0 || a > GROUP_LIMIT) { visual.append(fallbackVisual()); return; }
          const q = a / b;
          for (let i = 0; i < b; i++) visual.append(emojiGroup(q, dot));
        }
      }

      // When the numbers are too big to draw, still show a themed graphic.
      function fallbackVisual() {
        const f = div('arith-fallback');
        f.textContent = emoji || icon;
        return f;
      }

      function newRound() {
        locked = false;
        firstTry = true;
        feedback.textContent = '';
        feedback.className = 'count-feedback';
        maxShown = currentMax;

        // Avoid repeating a problem already asked this session (bounded retry;
        // if the number range is too small to find a new one, allow a repeat).
        let a, b, ans, guard = 0;
        do {
          ({ a, b, answer: ans } = makeProblem(currentMax));
          guard += 1;
        } while (seen.has(`${a}|${b}`) && guard < 30);
        seen.add(`${a}|${b}`);
        answer = ans;
        progress.innerHTML = `Round ${round + 1} of ${ROUNDS}` +
          ` &nbsp;•&nbsp; <span class="level-chip">up to ${currentMax}</span>`;
        equation.textContent = `${a} ${symbol} ${b} = ?`;
        buildVisual(a, b);

        choices.innerHTML = '';
        for (const c of makeChoices(answer)) {
          const b2 = btn('choice-btn', String(c));
          b2.onclick = () => choose(c, b2);
          choices.append(b2);
        }
      }

      function choose(n, buttonEl) {
        if (locked) return;
        attempts += 1;
        if (n === answer) {
          locked = true;
          if (firstTry) {
            correct += 1;
            currentMax = Math.min(cap, currentMax + 1); // ramp up after a right answer
          }
          buttonEl.classList.add('right');
          feedback.textContent = '✅ Yes! ' + answer;
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
        if (session.correct > (data.best.scoreInSession || 0)) {
          data.best.scoreInSession = session.correct;
        }
        await ctx.save(data);
      } catch (err) {
        console.error('Could not save math progress', err);
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
        const note = session.maxReached > session.startMax
          ? `Numbers up to ${session.startMax} → ${session.maxReached} 📈`
          : `Numbers up to ${session.startMax}`;
        card.append(pEl('game-sub', note));
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
  };
}

// ---- tiny DOM helpers ----
function div(cls) { const d = document.createElement('div'); if (cls) d.className = cls; return d; }
function hEl(tag, cls, text) { const n = document.createElement(tag); n.className = cls; n.textContent = text; return n; }
function pEl(cls, text) { const n = document.createElement('p'); n.className = cls; n.textContent = text; return n; }
function btn(cls, text) { const b = document.createElement('button'); b.className = cls; b.textContent = text; return b; }
function spanCls(cls) { const s = document.createElement('span'); s.className = cls; return s; }
function stat(num, label) {
  const s = div('stat');
  s.append(hEl('div', 'num', String(num)), hEl('div', 'label', label));
  return s;
}
function emojiGroup(n, em) {
  const g = div('arith-group');
  for (let i = 0; i < n; i++) {
    const s = spanCls('arith-emoji');
    s.textContent = em;
    g.append(s);
  }
  if (n === 0) { const z = spanCls('arith-zero'); z.textContent = '0'; g.append(z); }
  return g;
}
function signEl(symbol) { const s = spanCls('arith-sign'); s.textContent = symbol; return s; }
