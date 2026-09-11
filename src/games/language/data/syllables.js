// Syllable Types — the six kinds of syllable from the guideline. Knowing the type
// tells you whether a vowel is short or long, which is the key to reading and
// spelling longer words. Each answer is one of the six types.

export const SYLLABLES = [
  // Closed: short vowel, ends in a consonant.
  { q: "'cat' — a short vowel that ends in a consonant. Which syllable type?", a: 'Closed' },
  { q: "'napkin' is made of 'nap' and 'kin', both short vowels. Which type?", a: 'Closed' },
  // Open: ends in a vowel, long sound.
  { q: "'go' — it ends in a vowel and the vowel is long. Which type?", a: 'Open' },
  { q: "'hi' — ends in a vowel with a long sound. Which type?", a: 'Open' },
  // Silent-e (VCe).
  { q: "'cake' — vowel, consonant, then a silent e. Which type?", a: 'Silent-e' },
  { q: "'bike' — the silent e makes the i say its name. Which type?", a: 'Silent-e' },
  // Vowel team.
  { q: "'boat' — two vowels working together as a team. Which type?", a: 'Vowel team' },
  { q: "'rain' — the vowels ai team up for one sound. Which type?", a: 'Vowel team' },
  // R-controlled.
  { q: "'bird' — the r changes how the vowel sounds. Which type?", a: 'R-controlled' },
  { q: "'star' — the vowel is bent by the r after it. Which type?", a: 'R-controlled' },
  // Consonant-le.
  { q: "'table' — it ends in a consonant plus 'le'. Which type?", a: 'Consonant-le' },
  { q: "'candle' — ends in a consonant followed by 'le'. Which type?", a: 'Consonant-le' },
];
