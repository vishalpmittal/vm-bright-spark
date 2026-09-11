// Typing Fun — type simple sentences; at the end see letters typed, words
// typed, a star rating and a motivational message. Progress is saved per player.

import { ageToStartLevel, sentenceForLevel, clampLevel, MAX_LEVEL } from './sentences.js';
import { bigEmoji } from '../shared/emoji.js';

const SENTENCES_PER_SESSION = 5;

const MOTIVATION = {
  3: [
    'You are a typing SUPERSTAR! 🌟',
    'Wow! Fast and careful! 🚀',
    'Amazing work! Your fingers are magic! ✨',
  ],
  2: [
    'Great job! Keep it up! 🎉',
    'You are getting so good at this! 💪',
    'Nice typing! High five! ✋',
  ],
  1: [
    'Well done for finishing! 🌱',
    'Every letter makes you better! 😊',
    'You did it! Try again to grow! 🐣',
  ],
};

/** Count alphabetic letters in a string. */
function countLetters(str) {
  const m = str.match(/[a-z]/gi);
  return m ? m.length : 0;
}
function countWords(str) {
  const t = str.trim();
  return t ? t.split(/\s+/).length : 0;
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function mount(host, ctx) {
  let disposed = false;
  const cleanups = [];
  const onCleanup = (fn) => cleanups.push(fn);

  showStart();

  async function showStart() {
    const data = await ctx.load();
    if (disposed) return;
    const t = data.totals || {};
    const best = data.best || {};

    host.innerHTML = '';
    const wrap = div('card');
    wrap.append(
      hEl('h1', 'game-title', '⌨️ Typing Fun'),
      pEl('game-sub', `Hi ${ctx.player}! Type each sentence. Let’s see how many letters and words you can type!`),
    );

    if (t.sessions) {
      const stats = div('stat-row');
      stats.append(
        stat(t.letters || 0, 'letters so far'),
        stat(t.words || 0, 'words so far'),
        stat(best.wordsInSession || 0, 'best words in one game'),
      );
      wrap.append(stats);
    }

    const row = div('row-btns');
    const start = btn('big-btn', '▶️ Start Typing');
    start.onclick = () => playSession();
    row.append(start);
    wrap.append(row);
    host.append(wrap);
  }

  function playSession() {
    const startedAt = Date.now();
    let round = 0;                              // sentences finished or skipped
    let letters = 0;
    let words = 0;
    let totalKeystrokes = 0;
    let mistakes = 0;

    // Difficulty starts from the child's age and ramps up on every correct answer.
    let level = clampLevel(ageToStartLevel(ctx.age));
    const startLevel = level;
    let currentSentence = sentenceForLevel(level);
    let lastSentence = currentSentence;
    const seen = new Set([currentSentence]); // sentences already shown this session

    host.innerHTML = '';
    const card = div('card');

    const progress = pEl('game-sub', '');
    const keyboardArt = bigEmoji('⌨️');
    const sentenceBox = div('type-target');
    const input = document.createElement('input');
    input.className = 'type-input';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('aria-label', 'Type the sentence here');

    const hint = pEl('type-hint', 'Type the words above. 🐢 Take your time!');

    const controls = div('row-btns');
    const skip = btn('big-btn secondary', 'Skip ➡️');
    const finish = btn('link-btn', 'Finish now');
    controls.append(skip, finish);

    card.append(progress, keyboardArt, sentenceBox, input, hint, controls);
    host.append(card);

    function renderTarget() {
      const target = currentSentence;
      const typed = input.value;
      progress.innerHTML = `Sentence ${round + 1} of ${SENTENCES_PER_SESSION}` +
        ` &nbsp;•&nbsp; <span class="level-chip">Level ${level}</span>`;
      sentenceBox.innerHTML = '';
      for (let i = 0; i < target.length; i++) {
        const span = document.createElement('span');
        const ch = target[i];
        span.textContent = ch === ' ' ? ' ' : ch;
        if (i < typed.length) {
          span.className = typed[i] === ch ? 'ch ok' : 'ch bad';
        } else if (i === typed.length) {
          span.className = 'ch cur';
        } else {
          span.className = 'ch';
        }
        sentenceBox.append(span);
      }
    }

    // Move to the next sentence. `leveledUp` is true after a correct answer.
    function advance(leveledUp) {
      round += 1;
      input.value = '';
      if (round >= SENTENCES_PER_SESSION) return finishSession();
      if (leveledUp) level = clampLevel(level + 1); // harder after each right answer
      let guard = 0;
      do { currentSentence = sentenceForLevel(level, lastSentence); guard += 1; }
      while (seen.has(currentSentence) && guard < 30);
      seen.add(currentSentence);
      lastSentence = currentSentence;
      renderTarget();
      input.focus();
    }

    function onCorrect() {
      letters += countLetters(currentSentence);
      words += countWords(currentSentence);
      advance(true);
    }

    function finishSession() {
      const durationSec = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
      const accuracy = totalKeystrokes ? (totalKeystrokes - mistakes) / totalKeystrokes : 1;
      showResults({
        letters, words, sentences: round, accuracy, durationSec,
        startLevel, endLevel: level,
      });
    }

    const onKeydown = (e) => {
      if (e.key === 'Backspace' || e.key.length !== 1) return;
      const expected = currentSentence[input.value.length];
      totalKeystrokes += 1;
      if (expected === undefined || e.key !== expected) mistakes += 1;
    };
    const onInput = () => {
      renderTarget();
      if (input.value === currentSentence) {
        sentenceBox.classList.add('done'); // brief success flash before advancing
        setTimeout(() => {
          if (!disposed) { sentenceBox.classList.remove('done'); onCorrect(); }
        }, 350);
      }
    };

    input.addEventListener('keydown', onKeydown);
    input.addEventListener('input', onInput);
    onCleanup(() => {
      input.removeEventListener('keydown', onKeydown);
      input.removeEventListener('input', onInput);
    });

    skip.onclick = () => advance(false); // skipping does not raise the level
    finish.onclick = () => finishSession();

    renderTarget();
    input.focus();
  }

  async function showResults(session) {
    const stars = session.accuracy >= 0.95 ? 3 : session.accuracy >= 0.8 ? 2 : 1;
    const record = {
      date: new Date().toISOString(),
      letters: session.letters,
      words: session.words,
      sentences: session.sentences,
      accuracy: Math.round(session.accuracy * 100) / 100,
      durationSec: session.durationSec,
    };

    // Persist: append session + roll up totals, then update "best".
    let data;
    try {
      data = await ctx.recordSession(record);
      data.best = data.best || {};
      if ((session.words || 0) > (data.best.wordsInSession || 0)) {
        data.best.wordsInSession = session.words;
      }
      if ((session.letters || 0) > (data.best.lettersInSession || 0)) {
        data.best.lettersInSession = session.letters;
      }
      await ctx.save(data);
    } catch (err) {
      console.error('Could not save typing progress', err);
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
      stat(session.letters, 'letters typed'),
      stat(session.words, 'words typed'),
      stat(session.sentences, 'sentences done'),
    );
    card.append(stats);

    const levelNote = session.endLevel > session.startLevel
      ? `  •  Level ${session.startLevel} → ${session.endLevel} 📈`
      : `  •  Level ${session.startLevel}`;
    card.append(pEl('game-sub', `Accuracy: ${Math.round(session.accuracy * 100)}%  •  Time: ${session.durationSec}s${levelNote}`));

    const row = div('row-btns');
    const again = btn('big-btn', '🔁 Play Again');
    again.onclick = () => playSession();
    const home = btn('big-btn secondary', '🏠 Menu');
    home.onclick = () => showStart();
    row.append(again, home);
    card.append(row);

    host.append(card);
  }

  // unmount
  return () => {
    disposed = true;
    for (const fn of cleanups) { try { fn(); } catch { /* ignore */ } }
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
