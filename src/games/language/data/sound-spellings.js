// Sound Spellings — the etymological decoders from the guideline (§3). A sound
// borrowed from another language keeps that language's spelling, so knowing the
// origin predicts the letters. Each answer is a spelling chunk; every question
// has exactly one correct chunk (the same chunk may answer more than one
// question, e.g. 'ch' spells Greek /k/ AND French /sh/ — that is fine).

export const SOUND_SPELLINGS = [
  // --- Greek ---
  { q: "In 'phone' and 'graph', the /f/ sound is spelled with which letters?", a: 'ph' },
  { q: "In 'school' and 'chorus', the /k/ sound is spelled with?", a: 'ch' },
  { q: "In 'gym', 'myth' and 'crystal', the /i/ sound is spelled with?", a: 'y' },
  { q: "'rhyme' and 'rhino' begin with the /r/ sound spelled?", a: 'rh' },
  { q: "In 'psychology', 'pneumonia' and 'pterodactyl', the first letter is?", a: 'silent' },

  // --- French ---
  { q: "In French words like 'bureau', the /oh/ sound is spelled?", a: 'eau' },
  { q: "In French words like 'croissant', the /wah/ sound is spelled?", a: 'oi' },
  { q: "In French words like 'boutique' and 'antique', the /eek/ ending is spelled?", a: 'ique' },
  { q: "In French words like 'ballet' and 'gourmet', the last letter is?", a: 'silent' },

  // --- German / Yiddish ---
  { q: "In German words like 'zeitgeist', the /eye/ sound is spelled?", a: 'ei' },
  { q: "In German words like 'diesel', the /ee/ sound is spelled?", a: 'ie' },
  { q: "In German words like 'schnauzer' and 'schnitzel', the /sh/ sound is spelled?", a: 'sch' },
  { q: "In German words like 'waltz' and 'wanderlust', the /v/ sound is spelled with?", a: 'w' },

  // --- Italian & Spanish ---
  { q: "In Italian words like 'spaghetti' and 'ghetto', the hard /g/ is spelled?", a: 'gh' },
  { q: "In Italian words like 'bruschetta', the /k/ sound is spelled with?", a: 'ch' },
  { q: "In Spanish words like 'tortilla' and 'llama', the /y/ sound is spelled?", a: 'll' },
  { q: "In Spanish words like 'fajita', the /h/ sound is spelled with?", a: 'j' },
];
