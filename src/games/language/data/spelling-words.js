// Spelling Bee word bank — flash the word, then type it from memory.
//
// This is a deduction-first, curriculum-graded list built from the spelling-bee
// guidelines (Anglo-Saxon foundations → morphology → etymology → schwa →
// championship words). The game does not use the groupings directly: it picks
// words whose LENGTH is <= a cap that starts from the child's age and grows by
// one after every correct word. Word length is therefore the difficulty lever,
// and the tiers below are ordered so that longer = harder = later. The comments
// map each group back to the rule it teaches so the bank stays easy to extend.
//
// Everything is lowercase on purpose: the child types letters, not capitals, and
// the engine matches case-sensitively.

export const SPELLING_WORDS = [
  // ===================================================================
  // TIER 1 — Anglo-Saxon foundations (phonics & orthographic laws)
  // ===================================================================

  // Closed syllable: short vowel + consonant(s) — CVC and CVCC.
  'cat', 'dog', 'sun', 'hat', 'bed', 'cup', 'box', 'pig', 'bus', 'red',
  'hen', 'fox', 'jam', 'log', 'mud', 'net', 'pot', 'rug', 'van', 'web',
  'zip', 'ant', 'fan', 'jet', 'kid', 'lip', 'mop', 'nut', 'pen', 'top',
  'hand', 'jump', 'lamp', 'nest', 'ring', 'tent', 'vest', 'wind', 'gift', 'desk',
  'drum', 'flag', 'sled', 'clap', 'grin', 'spot', 'twin', 'frog', 'step', 'swim',
  'trip', 'best', 'milk', 'plan',

  // FLOSS rule: one-syllable, one short vowel → double final f, l, s, z
  // (plus the everyday doublers egg, add, off).
  'cliff', 'bell', 'doll', 'tell', 'well', 'will', 'hill', 'kiss', 'mess', 'moss',
  'boss', 'less', 'buzz', 'fizz', 'jazz', 'fluff', 'glass', 'grass', 'class', 'dress',
  'press', 'spell', 'small', 'still', 'smell', 'shell', 'spill', 'stuff', 'cross',
  'egg', 'add', 'off',

  // Protective digraphs that buffer a short vowel at word end:
  // /k/→-ck, /ch/→-tch, /j/→-dge.
  'duck', 'back', 'rock', 'neck', 'lock', 'kick', 'pack', 'sick', 'luck', 'truck',
  'black', 'brick', 'clock', 'stick', 'snack', 'trick', 'quick', 'track',
  'catch', 'match', 'watch', 'witch', 'patch', 'pitch', 'ditch', 'sketch', 'stitch', 'scratch',
  'edge', 'badge', 'fudge', 'judge', 'ledge', 'hedge', 'dodge', 'ridge', 'bridge', 'wedge',

  // Open syllable: syllable ends in a vowel → long vowel sound.
  'go', 'he', 'me', 'so', 'hi', 'no', 'we',
  'tiger', 'paper', 'robot', 'music', 'zebra', 'apron', 'basic', 'pilot', 'tulip', 'hotel',
  'human', 'begin', 'final', 'moment', 'open', 'over', 'even', 'baby', 'lady', 'tiny',
  'pony', 'motor', 'lion', 'quiet', 'spider',

  // Vowel-Consonant-e (VCe): silent e makes the vowel long.
  'cake', 'name', 'game', 'gate', 'cave', 'wave', 'lake', 'plane', 'grape', 'snake',
  'shake', 'brave', 'flame', 'shape', 'space', 'place', 'whale', 'escape', 'plate', 'skate',
  'bike', 'kite', 'pine', 'five', 'ride', 'time', 'line', 'smile', 'shine', 'slide',
  'prize', 'white', 'mile', 'drive', 'alive', 'invite',
  'home', 'nose', 'rope', 'bone', 'hole', 'note', 'stone', 'globe', 'close', 'smoke',
  'throne', 'explode', 'cube', 'cute', 'mule', 'tune', 'flute', 'rule', 'huge', 'costume',

  // Vowel teams / digraphs (adjacent vowels that work together).
  'rain', 'wait', 'sail', 'train', 'paint', 'brain', 'chain', 'snail', 'afraid', 'today',
  'away', 'play', 'stay', 'spray',
  'boat', 'road', 'soap', 'coat', 'toast', 'float', 'coast',
  'tree', 'seed', 'feet', 'deep', 'sheep', 'green', 'sweet', 'three', 'cheese', 'sleep',
  'agree', 'between',
  'team', 'leaf', 'beach', 'peach', 'dream', 'clean', 'teacher', 'eagle', 'please', 'repeat',
  'moon', 'spoon', 'bloom', 'room', 'tooth', 'balloon', 'cartoon', 'afternoon',
  'coin', 'join', 'point', 'voice', 'noise', 'boil', 'soil', 'enjoy', 'royal',
  'cloud', 'house', 'mouse', 'mouth', 'about', 'round', 'sound', 'count', 'ground', 'proud',
  'flower', 'tower', 'crown', 'brown', 'town', 'power', 'shower',
  'cookie', 'book', 'foot', 'wood', 'hook', 'good', 'look',
  'rainbow', 'yellow', 'pillow', 'window', 'snow', 'grow', 'throw', 'arrow', 'shadow', 'follow',

  // R-controlled vowels (ar, er, ir, or, ur) — the r bends the vowel.
  'car', 'star', 'farm', 'barn', 'dark', 'park', 'yard', 'shark', 'sharp', 'party',
  'garden', 'market', 'artist', 'alarm',
  'her', 'herd', 'fern', 'clerk', 'verb', 'person', 'perfect', 'dessert', 'expert',
  'bird', 'girl', 'dirt', 'shirt', 'first', 'third', 'birth', 'thirty', 'thirsty', 'birthday',
  'fork', 'corn', 'born', 'horn', 'storm', 'short', 'sport', 'north', 'morning', 'forest',
  'story', 'corner', 'torch',
  'turn', 'burn', 'hurt', 'surf', 'curl', 'church', 'nurse', 'purse', 'return', 'curtain',
  'horse', 'water', 'sister', 'doctor', 'winter', 'summer', 'dollar', 'sugar', 'mother',
  'father', 'brother', 'number', 'finger', 'letter', 'dinner', 'butter', 'silver', 'river',
  'under', 'thunder', 'wonder', 'hammer',

  // Consonant-le: final consonant + le forms a soft syllable.
  'table', 'apple', 'little', 'candle', 'bottle', 'middle', 'cattle', 'gentle', 'simple', 'uncle',
  'ankle', 'jungle', 'puzzle', 'bubble', 'needle', 'pickle', 'giggle', 'wiggle', 'marble', 'sparkle',
  'twinkle', 'whistle', 'castle', 'title', 'maple', 'cable', 'people', 'saddle', 'riddle', 'battle',
  'single', 'purple', 'turtle',

  // ===================================================================
  // TIER 2 — Morphology (suffixes & prefixes)
  // ===================================================================

  // 1-1-1 doubling rule: double the final consonant before a vowel suffix.
  'hopped', 'running', 'swimming', 'sitting', 'stopped', 'shopping', 'planned', 'jogging',
  'clapped', 'bigger', 'hotter', 'spotted', 'dropped', 'grabbed', 'winner', 'funny', 'sunny', 'muddy',

  // Silent-e drop: drop the e before a vowel suffix (make → making).
  'making', 'hoping', 'baking', 'riding', 'smiling', 'using', 'hiking', 'taking', 'writing',
  'dancing', 'driving', 'having', 'coming', 'giving', 'sharing', 'closing',

  // Y-to-I shift: consonant + y → i before a suffix (baby → babies).
  'babies', 'cried', 'happier', 'ponies', 'cities', 'tried', 'flies', 'puppies', 'candies',
  'funniest', 'families', 'stories', 'berries', 'cherries', 'easier',

  // Common prefixes (un-, re-, pre-, dis-, mis-, out-, in-).
  'unhappy', 'redo', 'preview', 'rewind', 'unlock', 'undo', 'replay', 'mistake', 'misread',
  'disagree', 'outside', 'inside', 'unfair', 'retell', 'dislike', 'unable', 'review', 'repaint',
  'disappear', 'uncover',

  // Common suffixes (-ful, -less, -ly, -ness).
  'helpful', 'careful', 'thankful', 'colorful', 'hopeless', 'careless', 'quickly', 'slowly',
  'kindness', 'darkness', 'happiness', 'friendly', 'lovely', 'sadness', 'wonderful',

  // -tion / -sion / -cian disambiguation.
  'action', 'nation', 'station', 'motion', 'vacation', 'question', 'mention', 'section',
  'mission', 'session', 'vision', 'decision', 'division', 'television', 'magician', 'musician',
  'electrician',

  // -able (complete base word) vs -ible (bound root).
  'readable', 'lovable', 'enjoyable', 'comfortable', 'valuable', 'visible', 'possible',
  'terrible', 'sensible', 'horrible', 'invisible', 'incredible',

  // -ous adjective suffix.
  'famous', 'nervous', 'dangerous', 'enormous', 'curious', 'jealous', 'generous', 'marvelous',
  'furious', 'serious', 'poisonous', 'mysterious',

  // ===================================================================
  // TIER 3 — Etymology (spellings inherited from other languages)
  // ===================================================================

  // Greek: /f/ spelled ph.
  'phone', 'photo', 'graph', 'dolphin', 'elephant', 'alphabet', 'trophy', 'phantom', 'telephone',
  'photograph', 'paragraph', 'geography', 'orphan', 'nephew', 'phrase', 'physical', 'pharmacy',
  'symphony', 'microphone', 'autograph',

  // Greek: /k/ spelled ch.
  'chorus', 'echo', 'ache', 'anchor', 'stomach', 'chemist', 'character', 'orchestra', 'mechanic',
  'chaos', 'chemical', 'scholar', 'monarch', 'architect', 'chord',

  // Greek: /i/ spelled with a medial y, and the silent initial clusters ps-, pn-, pt-.
  'gym', 'myth', 'crystal', 'rhythm', 'mystery', 'system', 'symbol', 'oxygen', 'pyramid',
  'syllable', 'typical', 'python', 'cycle', 'cylinder', 'symptom', 'hymn',
  'psychology', 'pneumonia', 'pterodactyl',

  // Greek combining forms (science & measurement roots).
  'telescope', 'microscope', 'astronaut', 'dinosaur', 'asteroid', 'meteor', 'biology', 'dialogue',
  'museum', 'marathon', 'cyclone', 'hydrogen', 'thermometer', 'democracy', 'planet', 'comet', 'galaxy',

  // Latin roots (dict, port, struct, tract, spect, ject, duc …).
  'describe', 'transport', 'inspect', 'predict', 'export', 'import', 'contradict', 'dictionary',
  'structure', 'construct', 'current', 'factory', 'fracture', 'spectator', 'victory', 'attract',
  'subtract', 'project', 'protect', 'inject', 'eject', 'reject', 'transfer', 'conductor',
  'product', 'respect', 'suspect',

  // French (culinary, arts, court) — silent finals & special vowel teams.
  'ballet', 'beret', 'buffet', 'valet', 'chef', 'chalet', 'brochure', 'machine', 'parachute',
  'crayon', 'garage', 'mirage', 'unique', 'antique', 'boutique', 'croissant', 'restaurant',
  'bouquet', 'gourmet', 'souvenir', 'silhouette', 'chandelier', 'menu', 'genre',

  // German & Yiddish.
  'kindergarten', 'pretzel', 'hamburger', 'waltz', 'poodle', 'noodle', 'dachshund', 'hamster', 'nickel',

  // Italian & Spanish (double consonants, ll, hard/soft c & g).
  'pizza', 'spaghetti', 'zucchini', 'broccoli', 'piano', 'cello', 'volcano', 'tornado', 'mosquito',
  'tortilla', 'taco', 'burrito', 'llama', 'fiesta', 'cafeteria', 'umbrella', 'confetti', 'gondola',
  'macaroni', 'studio', 'opera',

  // ===================================================================
  // TIER 4 — Schwa, silent letters & championship words
  // ===================================================================

  // Schwa (/ə/) in an unstressed syllable — the classic misspelling trap.
  'separate', 'category', 'chocolate', 'family', 'camera', 'banana', 'pajamas', 'president',
  'different', 'animal', 'general', 'memory', 'several', 'average', 'interesting', 'vegetable',
  'favorite', 'definite',

  // Silent letters (kn-, wr-, mb, silent t/g/h/w …).
  'island', 'muscle', 'listen', 'fasten', 'calf', 'half', 'palm', 'thumb', 'comb', 'doubt',
  'honest', 'hour', 'ghost', 'rhyme', 'wrestle', 'knee', 'knife', 'know', 'knock', 'knot',
  'wrist', 'write', 'wrong', 'lamb', 'climb', 'crumb', 'sign', 'design', 'gnome', 'calm',
  'walk', 'talk', 'could', 'would', 'should', 'answer', 'scissors', 'sword',

  // Championship words — reachable only after a long correct streak.
  'beautiful', 'february', 'wednesday', 'necessary', 'definitely', 'government', 'temperature',
  'environment', 'celebrate', 'imagine', 'adventure', 'knowledge', 'science', 'ancient', 'courage',
  'pronunciation', 'extraordinary', 'championship', 'caterpillar', 'xylophone', 'chlorophyll',
  'metamorphosis', 'onomatopoeia', 'bibliography', 'photosynthesis', 'mischievous', 'vacuum',
  'calendar', 'business', 'embarrass', 'guarantee', 'occasion', 'hippopotamus', 'rhinoceros',
  'encyclopedia', 'refrigerator',
];
