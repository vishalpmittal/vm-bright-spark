// Spelling Rules — the "why" behind how words are spelled. Instead of memorizing,
// the child learns the rule that predicts the spelling (the guideline's
// morphophonemic, rules-first approach). Each answer is a rule name, so the wrong
// choices are other rules — the child picks the one that explains the example.

export const SPELLING_RULES = [
  { q: "'hop' becomes 'hopped' — we doubled the p before -ed. Which rule is that?", a: 'Doubling rule' },
  { q: "'run' becomes 'running' — we doubled the n before -ing. Which rule?", a: 'Doubling rule' },
  { q: "'make' becomes 'making' — the silent e disappeared. Which rule?", a: 'Drop the silent e' },
  { q: "'ride' becomes 'riding' — where did the e go? Which rule?", a: 'Drop the silent e' },
  { q: "'baby' becomes 'babies' — the y changed to i. Which rule?", a: 'Change y to i' },
  { q: "'cry' becomes 'cried' — the y turned into i. Which rule?", a: 'Change y to i' },
  { q: 'Words like cliff, bell, miss and buzz double their last letter. Which rule?', a: 'FLOSS rule' },
  { q: "'duck' ends in 'ck', not just 'k', after a short vowel. Which rule?", a: 'Use ck after a short vowel' },
  { q: "'catch' ends in 'tch' after a short vowel. Which rule?", a: 'Use tch after a short vowel' },
  { q: "'bridge' ends in 'dge' after a short vowel. Which rule?", a: 'Use dge after a short vowel' },
  { q: 'In city and cent, the c sounds like /s/ because e or i follows it. What is this?', a: 'Soft c rule' },
  { q: 'In gem and giant, the g sounds like /j/ because e or i follows it. What is this?', a: 'Soft g rule' },
  { q: "English words don't end in v, so we add a silent e (have, give). Which rule?", a: 'Add e after v' },
  { q: 'In phone and graph, the letters ph make the /f/ sound. This comes from which language?', a: 'Greek ph = f' },
  { q: 'In cat and cot, the c sounds like /k/ because a, o, or u follows it. What is this?', a: 'Hard c rule' },
  { q: 'In gap and got, the g sounds like /g/ because a, o, or u follows it. What is this?', a: 'Hard g rule' },
  { q: "'courage' + '-ous' keeps its e (courageous) so the g stays soft. Which rule?", a: 'Keep e after soft c or g' },
  { q: "'visit' becomes 'visiting' and does NOT double the t. Why no double?", a: 'The stress is not at the end' },
  { q: "'cry' becomes 'crying' (not 'criing') — the y stays before -ing. Which rule?", a: 'Keep y before -ing' },
];
