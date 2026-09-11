// Shared emoji helpers so every question can show a relevant graphic.
//
// - WORD_EMOJI: a keyword -> emoji dictionary covering the words that actually
//   appear in the game data (opposites/synonyms/rhymes given-words, spelling
//   words, common nouns) plus their answers, for good coverage.
// - emojiForWord(word, fallback): dictionary hit, else the per-section fallback.
// - bigEmoji(text): the large-emoji DOM node used above a question (the same
//   `.big-emoji` element Flags/Landmarks already use).

/** Per-stream/section fallback emoji when no specific word match exists. */
export const STREAM_EMOJI = {
  language: '🔤',
  math: '🔢',
  geography: '🗺️',
  oceans: '🌊',
  lifeSkills: '💡',
  typing: '⌨️',
  default: '✨',
};

export const WORD_EMOJI = {
  // animals
  cat: '🐱', dog: '🐶', bird: '🐦', fish: '🐠', frog: '🐸', duck: '🦆',
  bee: '🐝', bug: '🐛', pig: '🐷', bear: '🐻', snail: '🐌', snake: '🐍',
  mouse: '🐭', monkey: '🐵', rabbit: '🐰', giraffe: '🦒', elephant: '🐘',
  dinosaur: '🦕', spider: '🕷️', horse: '🐴', cow: '🐮', lion: '🦁',
  // food & drink
  apple: '🍎', banana: '🍌', orange: '🍊', cake: '🍰', cookie: '🍪',
  milk: '🥛', water: '💧', egg: '🥚', sandwich: '🥪', honey: '🍯',
  // nature & sky
  sun: '☀️', moon: '🌙', star: '⭐', tree: '🌳', flower: '🌸', rain: '🌧️',
  rainbow: '🌈', river: '🌊', ocean: '🌊', snow: '❄️', winter: '☃️',
  night: '🌙', day: '☀️', morning: '🌅', sky: '☁️', fire: '🔥',
  // objects & places
  ball: '⚽', hat: '🎩', bed: '🛏️', cup: '🥤', box: '📦', bus: '🚌',
  car: '🚗', train: '🚂', book: '📚', chair: '🪑', table: '🍽️', clock: '🕐',
  house: '🏠', school: '🏫', pencil: '✏️', flower_pot: '🪴', shoe: '👟',
  balloon: '🎈', picture: '🖼️', backpack: '🎒', crown: '👑', ring: '💍',
  key: '🔑', kitchen: '🍳', bell: '🔔', drum: '🥁',
  // people
  king: '🤴', queen: '👸', teacher: '🧑‍🏫', doctor: '🧑‍⚕️', baby: '👶',
  // colors
  red: '🔴', green: '🟢', yellow: '🟡', blue: '🔵', orange_color: '🟠',
  // feelings / adjectives
  happy: '😀', glad: '😄', sad: '😢', unhappy: '😢', angry: '😠', mad: '😡',
  tired: '😴', sleepy: '😴', scared: '😱', afraid: '😨', funny: '😂',
  silly: '🤪', smart: '🧠', clever: '🧠', pretty: '🌷', beautiful: '🌸',
  nice: '😊', kind: '😊', sick: '🤒', ill: '🤒', quiet: '🤫', silent: '🤫',
  loud: '🔊', good: '👍', bad: '👎',
  // size / measure
  big: '🐘', large: '🐘', small: '🐭', little: '🐭', tiny: '🐜',
  tall: '📏', short: '📐',
  // temperature / state
  hot: '🔥', cold: '❄️', chilly: '🥶', wet: '💧', dry: '🌵',
  clean: '🧼', dirty: '🧹', hard: '🧱', soft: '🧸', light: '💡', dark: '🌑',
  full: '🔋', empty: '🪫', old: '👴', new: '✨', easy: '✅', simple: '✅',
  // directions / position
  up: '⬆️', down: '⬇️', high: '🔝', low: '🔽', left: '⬅️', right: '➡️',
  over: '🔼', under: '🔽', in: '📥', out: '📤', on: '🔛', off: '⛔',
  first: '🥇', last: '🏁', open: '🚪', closed: '🔒', close: '🚪', shut: '🔒',
  // actions / motion
  fast: '🏃', quick: '⚡', slow: '🐢', jump: '🤸', hop: '🐇', run: '🏃',
  push: '👐', pull: '🫴', begin: '▶️', start: '▶️',
};

/**
 * Best relevant emoji for a word, or the given fallback.
 * @param {string} word
 * @param {string} [fallback]
 * @returns {string}
 */
export function emojiForWord(word, fallback = STREAM_EMOJI.default) {
  if (!word) return fallback;
  const key = String(word).trim().toLowerCase();
  return WORD_EMOJI[key] || fallback;
}

/** Large-emoji DOM node shown above a question (reuses the `.big-emoji` style). */
export function bigEmoji(text) {
  const d = document.createElement('div');
  d.className = 'big-emoji';
  d.textContent = text;
  return d;
}
