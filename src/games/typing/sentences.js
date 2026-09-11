// Sentences grouped into 5 difficulty levels, from tiny lowercase phrases up to
// longer sentences with capitals, commas and question marks. The child's age
// sets the starting level; every correct sentence bumps the level up.

export const MAX_LEVEL = 5;

const LEVELS = [
  // Level 1 — 2–3 words, lowercase, no punctuation
  [
    'a big dog',
    'i can go',
    'we like fun',
    'the sun is up',
    'my red hat',
    'a fat cat',
    'we run fast',
    'i see you',
  ],
  // Level 2 — short simple sentence, lowercase, ends with a period
  [
    'the cat is fun.',
    'i like to play.',
    'the sun is hot.',
    'we can jump high.',
    'my mom is nice.',
    'the frog is green.',
    'a cow says moo.',
    'the fish can swim.',
  ],
  // Level 3 — a bit longer, lowercase, with a period
  [
    'a big red dog runs.',
    'we plant a tiny seed.',
    'the owl is awake at night.',
    'i can count to ten.',
    'a duck is by the pond.',
    'we like to read books.',
    'the bee flies to the flower.',
    'my dad can cook eggs.',
  ],
  // Level 4 — capitalized, longer sentences
  [
    'The busy bee flies to the flower.',
    'My little sister likes to sing songs.',
    'We plant seeds and water them every day.',
    'The yellow bus takes us to school.',
    'A tiny frog jumped over the log.',
    'The bright moon is high in the sky.',
    'I like to share my toys with friends.',
    'The train goes fast down the long track.',
  ],
  // Level 5 — longest, with commas, numbers and questions
  [
    'The fast, red train goes to the big city.',
    'Can you count all the way to twenty?',
    'We saw 3 ducks, 2 frogs, and 1 turtle.',
    'On sunny days, we play outside in the park.',
    'Do you like to read books before you sleep?',
    'The clever fox ran quickly through the tall grass.',
    'My friend and I built a big, tall sandcastle.',
    'After lunch, we drew pictures of our happy family.',
  ],
];

/** Map an age (3–10) to a starting level (1–5). */
export function ageToStartLevel(age) {
  const a = Number(age) || 5;
  if (a <= 4) return 1;
  if (a <= 6) return 2;
  if (a === 7) return 3;
  if (a === 8) return 4;
  return 5; // 9–10
}

/** Clamp a level into range. */
export function clampLevel(level) {
  return Math.min(MAX_LEVEL, Math.max(1, Math.round(level)));
}

/** Pick a random sentence at the given level, avoiding `avoid` if possible. */
export function sentenceForLevel(level, avoid) {
  const pool = LEVELS[clampLevel(level) - 1];
  if (pool.length === 1) return pool[0];
  let s = pool[Math.floor(Math.random() * pool.length)];
  let guard = 0;
  while (s === avoid && guard++ < 8) {
    s = pool[Math.floor(Math.random() * pool.length)];
  }
  return s;
}
