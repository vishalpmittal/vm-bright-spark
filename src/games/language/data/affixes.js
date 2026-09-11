// Prefixes & Suffixes — the little word-parts that change a word's meaning.
// Teaches morphology rules: a prefix goes on the front and changes meaning; a
// suffix goes on the end and changes meaning or job. Each question shows two real
// examples so the child deduces the meaning.
//
// Answers are distinct meanings/effects so the auto-built wrong choices are all
// genuinely wrong for the current question.

export const AFFIXES = [
  // --- Prefixes (front of the word) ---
  { q: "The prefix 'un-' is in unhappy and unlock. What does it mean?", a: 'not' },
  { q: "The prefix 're-' is in redo and rewind. What does it mean?", a: 'again' },
  { q: "The prefix 'pre-' is in preview and preschool. What does it mean?", a: 'before' },
  { q: "The prefix 'mis-' is in mistake and misread. What does it mean?", a: 'wrongly' },
  { q: "The prefix 'tri-' is in tricycle and triangle. What does it mean?", a: 'three' },
  { q: "The prefix 'bi-' is in bicycle and bilingual. What does it mean?", a: 'two' },
  { q: "The prefix 'uni-' is in unicorn and unicycle. What does it mean?", a: 'one' },
  { q: "The prefix 'sub-' is in submarine and subway. What does it mean?", a: 'under' },
  { q: "The prefix 'super-' is in superman and supermarket. What does it mean?", a: 'above' },
  { q: "The prefix 'trans-' is in transport and translate. What does it mean?", a: 'across' },
  { q: "The prefix 'multi-' is in multicolored and multiply. What does it mean?", a: 'many' },
  { q: "The prefix 'semi-' is in semicircle. What does it mean?", a: 'half' },

  // --- Suffixes (end of the word) ---
  { q: "The suffix '-less' is in helpless and fearless. What does it mean?", a: 'without' },
  { q: "The suffix '-ful' is in helpful and joyful. What does it mean?", a: 'full of' },
  { q: "The suffix '-er' in teacher and baker means a person who?", a: 'does it' },
  { q: "The suffix '-able' is in readable and washable. What does it mean?", a: 'can be' },
  { q: "The suffix '-est' is in biggest and fastest. What does it mean?", a: 'the most' },
  { q: "Adding '-ed' to jumped and played tells you it happened?", a: 'in the past' },
  { q: "A word ending in '-ing', like running, tells you it is?", a: 'happening now' },
  { q: "Adding '-s' to cats and dogs usually means there is?", a: 'more than one' },
  { q: "Adding '-ly' to slowly and quietly tells you?", a: 'how you do it' },
];
