// Syllable Division — the guideline's syllabication principles, which tell you
// WHERE to split a word so you can read and spell long words:
//   VC/CV  -> split between two consonants (nap-kin)
//   V/CV   -> split before one consonant, making an open/long first vowel (ti-ger)
//   VC/V   -> split after the consonant, making a closed/short first vowel (rob-in)
//   V/V    -> split between two vowels that are not a team (di-et)
//   C-le   -> the consonant + le take their own syllable (ta-ble)
// Each question shows the split; the child names the rule that was used.

export const SYLLABLE_DIVISION = [
  // Between two consonants (VC/CV).
  { q: "'napkin' splits into nap-kin. Where did we divide it?", a: 'Between two consonants' },
  { q: "'rabbit' splits into rab-bit. Where did we divide it?", a: 'Between two consonants' },
  { q: "'basket' splits into bas-ket. Where did we divide it?", a: 'Between two consonants' },
  { q: "'dentist' splits into den-tist. Where did we divide it?", a: 'Between two consonants' },

  // Before one consonant -> open, long first vowel (V/CV).
  { q: "'tiger' splits into ti-ger. Where did we divide it?", a: 'Before the consonant' },
  { q: "'paper' splits into pa-per. Where did we divide it?", a: 'Before the consonant' },
  { q: "'robot' splits into ro-bot. Where did we divide it?", a: 'Before the consonant' },
  { q: "'music' splits into mu-sic. Where did we divide it?", a: 'Before the consonant' },

  // After the consonant -> closed, short first vowel (VC/V).
  { q: "'robin' splits into rob-in. Where did we divide it?", a: 'After the consonant' },
  { q: "'cabin' splits into cab-in. Where did we divide it?", a: 'After the consonant' },
  { q: "'lemon' splits into lem-on. Where did we divide it?", a: 'After the consonant' },
  { q: "'planet' splits into plan-et. Where did we divide it?", a: 'After the consonant' },

  // Between two vowels (V/V).
  { q: "'diet' splits into di-et. Where did we divide it?", a: 'Between two vowels' },
  { q: "'poet' splits into po-et. Where did we divide it?", a: 'Between two vowels' },
  { q: "'lion' splits into li-on. Where did we divide it?", a: 'Between two vowels' },
  { q: "'create' splits into cre-ate. Where did we divide it?", a: 'Between two vowels' },

  // Consonant + le.
  { q: "'table' splits into ta-ble. Where did we divide it?", a: 'Before the consonant + le' },
  { q: "'maple' splits into ma-ple. Where did we divide it?", a: 'Before the consonant + le' },
  { q: "'bugle' splits into bu-gle. Where did we divide it?", a: 'Before the consonant + le' },
  { q: "'title' splits into ti-tle. Where did we divide it?", a: 'Before the consonant + le' },

  // Morphological integrity: never split across a whole root or base word.
  { q: "'unhelpful' splits into un-help-ful, keeping 'help' whole. Which idea is this?", a: 'Keep the root whole' },
  { q: "'replaying' splits into re-play-ing, not rep-lay-ing. Why?", a: 'Keep the root whole' },
  { q: "'teacher' splits into teach-er, keeping 'teach' whole. Which idea is this?", a: 'Keep the root whole' },
];
