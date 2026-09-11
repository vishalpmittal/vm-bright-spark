// Shared multiple-choice quiz engine, used by all Geography subsections
// (continents, country capitals, US state capitals, India state capitals) and
// reusable for any future "prompt -> pick the right answer" game.
//
//   makeQuizGame({ id, title, icon, data, prompt, answer }) -> mount(host, ctx)
//
// - `data`     : array of items
// - `prompt`   : (item) => question string shown to the child
// - `answer`   : (item) => the correct answer string (also used to build the
//                distractor pool from all items)
//
// Difficulty: the number of answer choices starts from the child's age and
// grows by one after every correct answer (harder), capped at 6 (or the pool
// size). Progress is saved per player, one file per game.

const ROUNDS = 10;
const CHOICE_CAP = 6;

const MOTIVATION = {
  3: ['Geography genius! 🌍', 'Wow, you know the world! 🗺️', 'Amazing! You are an explorer! 🧭'],
  2: ['Great job! Keep exploring! 🎉', 'You are learning so much! 💪', 'Nice work, traveler! ✈️'],
  1: ['Good try! The world is big! 🌱', 'Every answer helps you learn! 😊', 'You did it! 🐣'],
};

/** How many answer choices to start with, based on age. */
function ageToChoices(age) {
  const a = Math.min(10, Math.max(3, Math.round(Number(age) || 5)));
  if (a <= 4) return 2;
  if (a <= 6) return 3;
  return 4;
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/** Sample up to `n` unique items from `pool`. */
function sample(pool, n) {
  return shuffle(pool).slice(0, n);
}

export function makeQuizGame(config) {
  const { title, icon = '🌍' } = config;
  const promptOf = config.prompt;
  const answerOf = config.answer;
  const data = config.data;
  const pool = [...new Set(data.map(answerOf))]; // all possible answers, unique
  const maxChoices = Math.min(CHOICE_CAP, pool.length);
  // Never ask more questions than there are unique items, so a session can't
  // repeat a question (e.g. Shapes has 7 items, Sun has 8).
  const rounds = Math.max(1, Math.min(ROUNDS, data.length));

  return function mount(host, ctx) {
    let disposed = false;

    showStart();

    async function showStart() {
      const saved = await ctx.load();
      if (disposed) return;
      const t = saved.totals || {};
      const best = saved.best || {};

      host.innerHTML = '';
      const card = div('card');
      card.append(
        hEl('h1', 'game-title', `${icon} ${title}`),
        pEl('game-sub', `Hi ${ctx.player}! Read the question and tap the right answer.`),
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

      // Optional "back" link (used when this quiz is launched from a picker).
      if (typeof config.onBack === 'function') {
        const back = btn('link-btn', config.backLabel || '⬅ Back');
        back.onclick = () => config.onBack();
        card.append(back);
      }

      host.append(card);
    }

    function playSession() {
      let round = 0;
      let correct = 0;
      let attempts = 0;
      const startedAt = Date.now();

      let choicesCount = Math.min(maxChoices, ageToChoices(ctx.age));
      const startChoices = choicesCount;
      let lastItem = null;
      let currentAnswer = null;
      let locked = false;
      let firstTry = true;

      // Draw questions without replacement: shuffle the whole dataset into a
      // "deck" and deal from it, reshuffling only once every item has been shown.
      // This keeps a session from repeating questions while the deck lasts.
      let deck = [];
      function nextItem() {
        if (deck.length === 0) {
          deck = shuffle(data);
          if (deck.length > 1 && deck[0] === lastItem) deck.push(deck.shift());
        }
        return deck.shift();
      }

      host.innerHTML = '';
      const card = div('card');
      const progress = pEl('game-sub', '');
      const prompt = hEl('div', 'quiz-prompt', '');
      const choices = div('quiz-choices');
      const feedback = pEl('count-feedback', '');

      // Optional media panel (world map, image, …) beside the question on desktop,
      // stacked above it on mobile. Games opt in with config.mediaNode(item).
      const hasMedia = typeof config.mediaNode === 'function';
      let media = null;
      if (hasMedia) {
        card.classList.add('has-media');
        media = div('quiz-media');
        const main = div('quiz-main');
        main.append(progress, prompt, choices, feedback);
        card.append(media, main);
      } else {
        card.append(progress, prompt, choices, feedback);
      }
      host.append(card);

      function newRound() {
        locked = false;
        firstTry = true;
        feedback.textContent = '';
        feedback.className = 'count-feedback';

        // Deal the next question from the no-repeat deck.
        const item = nextItem();
        lastItem = item;
        currentAnswer = answerOf(item);

        const distractors = sample(pool.filter((x) => x !== currentAnswer), choicesCount - 1);
        const options = shuffle([currentAnswer, ...distractors]);

        progress.innerHTML = `Question ${round + 1} of ${rounds}` +
          ` &nbsp;•&nbsp; <span class="level-chip">${choicesCount} choices</span>`;

        if (media) {
          media.innerHTML = '';
          const node = config.mediaNode(item);
          if (node) media.append(node);
        }

        prompt.innerHTML = '';
        if (typeof config.promptNode === 'function') {
          const node = config.promptNode(item);
          if (node) prompt.append(node);
        }
        const qline = document.createElement('div');
        qline.className = 'quiz-q';
        qline.textContent = promptOf(item);
        prompt.append(qline);

        choices.innerHTML = '';
        for (const opt of options) {
          const b = btn('choice-btn', opt);
          b.onclick = () => choose(opt, b);
          choices.append(b);
        }
      }

      function choose(opt, buttonEl) {
        if (locked) return;
        attempts += 1;
        if (opt === currentAnswer) {
          locked = true;
          if (firstTry) {
            correct += 1;
            choicesCount = Math.min(maxChoices, choicesCount + 1); // harder next time
          }
          buttonEl.classList.add('right');
          feedback.textContent = '✅ Yes! ' + currentAnswer;
          feedback.className = 'count-feedback good';
          setTimeout(() => {
            if (disposed) return;
            round += 1;
            if (round >= rounds) finishSession();
            else newRound();
          }, 900);
        } else {
          firstTry = false;
          buttonEl.classList.add('wrong');
          buttonEl.disabled = true;
          feedback.textContent = '🤔 Try again!';
          feedback.className = 'count-feedback bad';
        }
      }

      function finishSession() {
        const durationSec = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
        showResults({ correct, attempts, rounds, durationSec, startChoices, endChoices: choicesCount });
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

      let saved;
      try {
        saved = await ctx.recordSession(record);
        saved.best = saved.best || {};
        if (session.correct > (saved.best.scoreInSession || 0)) {
          saved.best.scoreInSession = session.correct;
        }
        await ctx.save(saved);
      } catch (err) {
        console.error('Could not save quiz progress', err);
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
        stat(session.rounds, 'questions'),
      );
      card.append(stats);

      if (session.endChoices > session.startChoices) {
        card.append(pEl('game-sub', `Choices: ${session.startChoices} → ${session.endChoices} 📈`));
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
function stat(num, label) {
  const s = div('stat');
  s.append(hEl('div', 'num', String(num)), hEl('div', 'label', label));
  return s;
}
