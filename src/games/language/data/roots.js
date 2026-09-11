// Word Roots — Greek & Latin building blocks and what they mean.
// Teaches "derivative source": most long English words are built from a small
// set of roots. Each question names two real words that contain the root, so the
// child deduces the meaning from examples (the guideline's deduction-first idea).
//
// Answers are single-word meanings. The shared quiz engine builds the wrong
// choices from OTHER items' meanings, so each meaning must be a distinct idea
// (two roots may share an identical meaning string — e.g. graph/script = write —
// which is fine and makes a nice teaching point).

export const ROOTS = [
  // --- Greek ---
  { q: "The root 'graph' is in photograph and autograph. What does it mean?", a: 'write' },
  { q: "The root 'phon' is in telephone and phonics. What does it mean?", a: 'sound' },
  { q: "The root 'photo' is in photo and photograph. What does it mean?", a: 'light' },
  { q: "The root 'tele' is in telephone and television. What does it mean?", a: 'far' },
  { q: "The root 'micro' is in microscope and microphone. What does it mean?", a: 'small' },
  { q: "The root 'mega' is in megaphone and megabyte. What does it mean?", a: 'big' },
  { q: "The root 'bio' is in biology and biography. What does it mean?", a: 'life' },
  { q: "The root 'geo' is in geography and geology. What does it mean?", a: 'earth' },
  { q: "The root 'hydro' is in hydrant and hydrogen. What does it mean?", a: 'water' },
  { q: "The root 'therm' is in thermometer and thermos. What does it mean?", a: 'heat' },
  { q: "The root 'astro' is in astronaut and astronomy. What does it mean?", a: 'star' },
  { q: "The root 'auto' is in automobile and automatic. What does it mean?", a: 'self' },
  { q: "The root 'chrono' is in chronology and chronic. What does it mean?", a: 'time' },
  { q: "The root 'morph' is in metamorphosis. What does it mean?", a: 'shape' },
  { q: "The root 'psych' is in psychology. What does it mean?", a: 'mind' },

  // --- Latin ---
  { q: "The root 'dict' is in dictionary and predict. What does it mean?", a: 'speak' },
  { q: "The root 'port' is in transport and airport. What does it mean?", a: 'carry' },
  { q: "The root 'script' is in describe and manuscript. What does it mean?", a: 'write' },
  { q: "The root 'spect' is in inspect and spectator. What does it mean?", a: 'see' },
  { q: "The root 'tract' is in tractor and attract. What does it mean?", a: 'pull' },
  { q: "The root 'rupt' is in erupt and interrupt. What does it mean?", a: 'break' },
  { q: "The root 'struct' is in construct and structure. What does it mean?", a: 'build' },
  { q: "The root 'manu' is in manual and manufacture. What does it mean?", a: 'hand' },
  { q: "The root 'ped' is in pedal and pedestrian. What does it mean?", a: 'foot' },
  { q: "The root 'aud' is in audio and audience. What does it mean?", a: 'hear' },
  { q: "The root 'sol' is in solar and parasol. What does it mean?", a: 'sun' },
  { q: "The root 'luna' is in lunar. What does it mean?", a: 'moon' },
  { q: "The root 'flor' is in floral and florist. What does it mean?", a: 'flower' },
  { q: "The root 'aqua' is in aquarium and aquatic. What does it mean?", a: 'water' },

  // --- More Greek combining forms (from the root lexicon) ---
  { q: "The root 'derm' is in dermatologist (a skin doctor). What does it mean?", a: 'skin' },
  { q: "The root 'path' is in sympathy and telepathy. What does it mean?", a: 'feeling' },
  { q: "The root 'phil' is in bibliophile (a book lover). What does it mean?", a: 'love' },
  { q: "The root 'crypt' is in cryptic and cryptography. What does it mean?", a: 'hidden' },
  { q: "The root 'lith' is in monolith and lithograph. What does it mean?", a: 'stone' },
  { q: "The root 'pyr' is in pyre and pyrotechnics. What does it mean?", a: 'fire' },
  { q: "The root 'xeno' is in xenophobia (fear of strangers). What does it mean?", a: 'foreign' },
  { q: "The root 'xylo' is in xylophone. What does it mean?", a: 'wood' },
  { q: "The root 'rhino' is in rhinoceros. What does it mean?", a: 'nose' },
  { q: "The root 'arachn' is in arachnid (a spider). What does it mean?", a: 'spider' },
  { q: "The root 'ortho' is in orthodontist. What does it mean?", a: 'straight' },
  { q: "The root 'chrom' is in chromatic and monochrome. What does it mean?", a: 'color' },
  { q: "The root 'dactyl' is in pterodactyl. What does it mean?", a: 'finger' },
  { q: "The root 'odont' is in orthodontist. What does it mean?", a: 'tooth' },

  // --- More Latin roots (relatable through -vore, dinosaurs, everyday words) ---
  { q: "The root 'dent' is in dentist and dental. What does it mean?", a: 'tooth' },
  { q: "The root 'vac' is in vacuum and vacant. What does it mean?", a: 'empty' },
  { q: "The root 'cent' is in century and centipede. What does it mean?", a: 'hundred' },
  { q: "The root 'ann' is in annual and anniversary. What does it mean?", a: 'year' },
  { q: "The root 'omni' is in omnivore. What does it mean?", a: 'all' },
  { q: "The root 'carn' is in carnivore. What does it mean?", a: 'meat' },
  { q: "The root 'herb' is in herbivore. What does it mean?", a: 'plant' },
  { q: "The root 'vor' is in carnivore and herbivore. What does it mean?", a: 'eat' },
];
