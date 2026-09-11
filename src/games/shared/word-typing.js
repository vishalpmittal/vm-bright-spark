// Shared "type the word" engine, used by Spelling Bee and Sight Words.
//
//   makeWordTypingGame({ title, icon, words, flash }) -> mount(host, ctx)
//
// - flash = true  (Spelling Bee): the word is shown briefly, then hidden, and
//   the child types it from memory (a "Peek" button re-shows it).
// - flash = false (Sight Words): the word stays visible while they type it.
//
// Difficulty: word length starts from the child's age and grows by one after
// each correct word. Reuses the typing game's CSS classes for the target/input.

import { bigEmoji, emojiForWord, STREAM_EMOJI } from './emoji.js';

const WORDS_PER_SESSION = 6;
const CAP_LEN = 16; // ceiling for how long a word can get after a correct streak
const FLASH_MS = 2500;
const PEEK_MS = 1000;

const MOTIVATION = {
  3: ['Spelling superstar! 🌟', 'Wow, great memory! 🧠', 'Amazing words! 🚀'],
  2: ['Great job! Keep going! 🎉', 'You are a super speller! 💪', 'Nice work! ✋'],
  1: ['Good try! Practice helps! 🌱', 'Every word makes you better! 😊', 'You did it! 🐣'],
};

function ageToMaxLen(age) {
  // Starting word length by age; it then grows by one after each correct word
  // (up to CAP_LEN), so older/advancing kids reach the harder curriculum tiers.
  const map = { 3: 3, 4: 4, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 };
  const a = Math.min(12, Math.max(3, Math.round(Number(age) || 5)));
  return map[a];
}
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function makeWordTypingGame(config) {
  const { title, icon = '🔤', words, flash = false } = config;

  return function mount(host, ctx) {
    let disposed = false;
    const timers = new Set();
    const later = (fn, ms) => { const id = setTimeout(() => { timers.delete(id); if (!disposed) fn(); }, ms); timers.add(id); return id; };

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
        pEl('game-sub', flash
          ? `Hi ${ctx.player}! Look at the word, remember it, then type it!`
          : `Hi ${ctx.player}! Type each word you see.`),
      );

      if (t.sessions) {
        const stats = div('stat-row');
        stats.append(
          stat(t.words || 0, 'words typed'),
          stat(best.wordsInSession || 0, 'best in one game'),
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
      const startedAt = Date.now();
      let round = 0;
      let letters = 0;
      let wordsDone = 0;
      let totalKeystrokes = 0;
      let mistakes = 0;
      let maxLen = ageToMaxLen(ctx.age);
      const startMax = maxLen;

      let currentWord = '';
      let lastWord = '';
      let revealWord = true; // whether the letters are visible right now
      const used = new Set(); // words already used this session

      host.innerHTML = '';
      const card = div('card');
      const progress = pEl('game-sub', '');
      const clue = div('type-clue'); // picture clue for the current word
      const targetBox = div('type-target');
      const input = document.createElement('input');
      input.className = 'type-input';
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('autocorrect', 'off');
      input.setAttribute('autocapitalize', 'off');
      input.setAttribute('spellcheck', 'false');
      input.setAttribute('aria-label', 'Type the word here');
      const hint = pEl('type-hint', '');

      const controls = div('row-btns');
      const peek = btn('big-btn secondary', '👀 Peek');
      const skip = btn('big-btn secondary', 'Skip ➡️');
      const finish = btn('link-btn', 'Finish now');
      if (flash) controls.append(peek);
      controls.append(skip, finish);

      card.append(progress, clue, targetBox, input, hint, controls);
      host.append(card);

      function chooseWord() {
        const byLen = words.filter((w) => w.length <= maxLen);
        const base = byLen.length ? byLen : words;
        // Prefer words not yet used this session; only repeat once all are used.
        let pool = base.filter((w) => !used.has(w));
        if (pool.length === 0) pool = base;
        let w = pick(pool);
        let guard = 0;
        while (w === lastWord && pool.length > 1 && guard++ < 8) w = pick(pool);
        used.add(w);
        return w;
      }

      function renderTarget() {
        const typed = input.value;
        targetBox.innerHTML = '';
        if (revealWord) {
          for (let i = 0; i < currentWord.length; i++) {
            const span = document.createElement('span');
            span.textContent = currentWord[i];
            if (!flash && i < typed.length) span.className = typed[i] === currentWord[i] ? 'ch ok' : 'ch bad';
            else if (!flash && i === typed.length) span.className = 'ch cur';
            else span.className = 'ch';
            targetBox.append(span);
          }
        } else {
          // hidden: show one dot per letter, filled up to how many typed
          for (let i = 0; i < currentWord.length; i++) {
            const span = document.createElement('span');
            span.className = 'dot' + (i < typed.length ? ' filled' : '');
            span.textContent = '•';
            targetBox.append(span);
          }
        }
      }

      function newRound() {
        currentWord = chooseWord();
        lastWord = currentWord;
        clue.innerHTML = '';
        clue.append(bigEmoji(emojiForWord(currentWord, STREAM_EMOJI.language)));
        input.value = '';
        progress.innerHTML = `Word ${round + 1} of ${WORDS_PER_SESSION}` +
          ` &nbsp;•&nbsp; <span class="level-chip">up to ${maxLen} letters</span>`;

        if (flash) {
          // show the word, disable typing, then hide and let them type
          revealWord = true;
          renderTarget();
          input.disabled = true;
          peek.disabled = true;
          hint.textContent = '👀 Look and remember...';
          later(() => {
            revealWord = false;
            renderTarget();
            input.disabled = false;
            peek.disabled = false;
            hint.textContent = 'Now type the word!';
            input.focus();
          }, FLASH_MS);
        } else {
          revealWord = true;
          renderTarget();
          hint.textContent = 'Type the word above. 🐢 Take your time!';
          input.focus();
        }
      }

      function doPeek() {
        if (!flash || revealWord) return;
        revealWord = true;
        renderTarget();
        later(() => { revealWord = false; renderTarget(); }, PEEK_MS);
      }

      function advance(completed) {
        round += 1;
        if (completed) {
          letters += currentWord.length;
          wordsDone += 1;
          maxLen = Math.min(CAP_LEN, maxLen + 1); // harder after each correct word
        }
        input.value = '';
        if (round >= WORDS_PER_SESSION) return finishSession();
        newRound();
      }

      function finishSession() {
        const durationSec = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
        const accuracy = totalKeystrokes ? (totalKeystrokes - mistakes) / totalKeystrokes : 1;
        showResults({ letters, words: wordsDone, accuracy, durationSec, startMax, endMax: maxLen });
      }

      const onKeydown = (e) => {
        if (input.disabled) return;
        if (e.key === 'Backspace' || e.key.length !== 1) return;
        const expected = currentWord[input.value.length];
        totalKeystrokes += 1;
        if (expected === undefined || e.key !== expected) mistakes += 1;
      };
      const onInput = () => {
        renderTarget();
        if (input.value === currentWord) {
          targetBox.classList.add('done');
          revealWord = true;
          renderTarget();
          later(() => { targetBox.classList.remove('done'); advance(true); }, 450);
        }
      };
      input.addEventListener('keydown', onKeydown);
      input.addEventListener('input', onInput);

      peek.onclick = doPeek;
      skip.onclick = () => advance(false);
      finish.onclick = () => finishSession();

      newRound();
    }

    async function showResults(session) {
      const stars = session.accuracy >= 0.95 ? 3 : session.accuracy >= 0.8 ? 2 : 1;
      const record = {
        date: new Date().toISOString(),
        letters: session.letters,
        words: session.words,
        accuracy: Math.round(session.accuracy * 100) / 100,
        durationSec: session.durationSec,
      };

      let data;
      try {
        data = await ctx.recordSession(record);
        data.best = data.best || {};
        if ((session.words || 0) > (data.best.wordsInSession || 0)) data.best.wordsInSession = session.words;
        await ctx.save(data);
      } catch (err) {
        console.error('Could not save progress', err);
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
        stat(session.words, 'words typed'),
        stat(session.letters, 'letters typed'),
      );
      card.append(stats);
      card.append(pEl('game-sub', `Accuracy: ${Math.round(session.accuracy * 100)}%  •  Time: ${session.durationSec}s`));

      const row = div('row-btns');
      const again = btn('big-btn', '🔁 Play Again');
      again.onclick = () => playSession();
      const home = btn('big-btn secondary', '🏠 Menu');
      home.onclick = () => showStart();
      row.append(again, home);
      card.append(row);
      host.append(card);
    }

    return () => {
      disposed = true;
      for (const id of timers) clearTimeout(id);
      timers.clear();
    };
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
