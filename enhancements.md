# Learning Games — Streams & Sections

A wholesome map of the app: every **stream** (left nav bar), the **sections**
inside it (second nav bar / category), and a one-line overview of each game.
Combines what is **already built** with everything **proposed** for the future.

## Legend

- **Status** — ✅ Built (live in the app) · 🔨 Proposed (not built yet)
- **Effort** (for proposed items) — how much work, based on the engines that already exist:
  - `[quiz]` — drop-in on the multiple-choice engine (`src/games/shared/quiz.js`); just add a dataset. Cheapest.
  - `[math]` — drop-in on the arithmetic engine (`src/games/shared/arithmetic.js`).
  - `[typing]` — drop-in on the typing engine (`src/games/typing/`).
  - `[seq]` — drop-in on the sequence/ordering engine (`src/games/shared/sequence.js`).
  - `[new]` — needs a brand-new game mechanic.
  - `[img]` / `[audio]` — needs image or sound assets (breaks the emoji-only, fully-offline approach).

---

## 🔤 Language

| Section | Game | Overview | Status |
|---|---|---|---|
| Keyboard | Typing Fun | Type fun sentences to learn the keyboard. | ✅ |
| Spelling | Spelling Bee | Remember a word, then spell it from memory (curriculum-graded bank). | ✅ |
| Spelling | Spelling Rules | The why behind spelling: doubling, silent-e, y-to-i, FLOSS, ck/tch/dge. | ✅ |
| Spelling | Syllable Types | The six syllable types (closed, open, silent-e, vowel team, r-controlled, -le). | ✅ |
| Spelling | Suffix Choice | -tion vs -sion vs -cian, and -able vs -ible. | ✅ |
| Spelling | Syllable Split | Where to divide a word (VC/CV, V/CV, VC/V, V/V, C-le). | ✅ |
| Spelling | Schwa Detective | Hear a fuzzy vowel by shifting to a related word (competent → compete). | ✅ |
| Word Play | Opposites | Find the opposite of a given word. | ✅ |
| Word Play | Synonyms | Find a word that means the same thing. | ✅ |
| Word Play | Rhyming Words | Pick the word that rhymes. | ✅ |
| Word Play | What's the Word? | Read a clue, choose the word it describes. | ✅ |
| Letters & Sounds | Letter Match | Match big (uppercase) and small (lowercase) letters. | ✅ |
| Letters & Sounds | Starting Sounds | Which letter does the word start with? | ✅ |
| Word Building | Word Roots | Greek & Latin roots and what they mean (graph = write). | ✅ |
| Word Building | Prefixes & Suffixes | Word-part meanings (un- = not, -less = without). | ✅ |
| Word Building | Word Origins | Which language a word comes from (ballet → French). | ✅ |
| Word Building | Chameleon Prefixes | Prefix assimilation (in- + possible → im-, ad- + count → ac-). | ✅ |
| Word Play | Compound Words | Join two little words into one (sun + flower). | 🔨 `[quiz]` |
| Grammar | Nouns / Verbs / Adjectives | Sort words by their job in a sentence. | 🔨 `[quiz]` |
| Reading | Sight Words | Recognize the most common everyday words. | 🔨 `[quiz/typing]` |

---

## 🔢 Math

| Section | Game | Overview | Status |
|---|---|---|---|
| Numbers | Count It! | Count the things on screen. | ✅ |
| Numbers | Compare It! | Bigger, smaller, or equal? | ✅ |
| Numbers | Skip Counting | What number comes next (2s, 5s, 10s)? | ✅ |
| Arithmetic | Add It Up | Practice addition. | ✅ |
| Arithmetic | Take Away | Practice subtraction. | ✅ |
| Arithmetic | Multiply | Times tables. | ✅ |
| Arithmetic | Divide | Share equally. | ✅ |
| Shapes & Patterns | Shapes | Name the shape. | ✅ |
| Shapes & Patterns | Patterns | What comes next in the pattern? | ✅ |
| Numbers | Number Ordering | Put numbers in order, least to greatest. | 🔨 `[seq]` |
| Measurement | Measuring & Units | Longer/shorter, heavier/lighter, hot/cold. | 🔨 `[quiz]` |
| Fractions | Halves & Quarters | Simple parts of a whole (½, ¼). | 🔨 `[quiz/new]` |

---

## 🌍 Geography

| Section | Game | Overview | Status |
|---|---|---|---|
| The World | Continents | Which continent is it? | ✅ |
| The World | Countries & Capitals | Name the capital of a country. | ✅ |
| The World | Oceans | The five oceans of the world. | ✅ |
| Flags & Landmarks | Flags | Whose flag is it? (emoji flags, no images) | ✅ |
| Flags & Landmarks | Famous Landmarks | Where in the world is this landmark? | ✅ |
| States & Capitals | State Capitals | Pick a country, then name its state capitals. | ✅ |
| The World | Currencies | Which money does this country use? | 🔨 `[quiz]` |
| The World | Rivers & Mountains | Famous rivers and the world's tallest peaks. | 🔨 `[quiz]` |
| States & Capitals | More Countries | Add more countries' states/provinces. | 🔨 `[quiz]` |

---

## 🧠 Life Skills

| Section | Game | Overview | Status |
|---|---|---|---|
| Manners | Good Manners | The polite thing to do in everyday situations. | ✅ |
| Time | What's the Time? | Read the clock. | ✅ |
| Money | Count the Money | Add up the coins. | ✅ |
| Feelings | Emotions | Recognize feelings from faces and situations. | 🔨 `[quiz]` |
| Community | Community Helpers | Match jobs to what they do (doctor, firefighter). | 🔨 `[quiz]` |
| Safety | Safety Signs | Learn what common signs and signals mean. | 🔨 `[quiz]` |

---

## 🏊 Skills

Physical activities and staying-safe-while-doing-them topics — the same
activity + safety + confidence flavor as Swimming.

| Section | Game | Overview | Status |
|---|---|---|---|
| Swimming | Swimming | Be a safe, happy swimmer. | ✅ |
| Road Safety | Cross Safely | Look both ways, use crossings, traffic-light rules. | 🔨 `[quiz]` |
| Fire Safety | Fire Smarts | Stop-drop-roll, smoke alarms, get-out-and-stay-out. | 🔨 `[quiz]` |
| Bike Safety | Ride Right | Helmets, hand signals, where and how to ride. | 🔨 `[quiz]` |
| Personal Safety | Stay Safe | Trusted grown-ups, saying no, getting help when lost. | 🔨 `[quiz]` |
| Emergencies | Call for Help | Emergency numbers, what to say, when to call. | 🔨 `[quiz]` |
| First Aid | Boo-boo Basics | Wash a cut, ice a bump, tell a grown-up. | 🔨 `[quiz]` |
| Kitchen | Kitchen Helper | Safe helping, hot things, washing up. | 🔨 `[quiz]` |
| Sports | Ball Games | Basics and rules of soccer, basketball, cricket, etc. | 🔨 `[quiz]` |
| Music | Instruments | Match the sound or family to the instrument. | 🔨 `[quiz]` |
| Gardening | Little Gardener | What plants need, tools, and how seeds grow. | 🔨 `[quiz]` |

> Boundary notes: **Hygiene / healthy habits** lean "health" — better under a
> Science → *Health & Body* section. **Internet / Screen Safety** 💻 (great for
> ages 8–12) is knowledge more than physical skill; it could sit here or in Life Skills.

---

## 🔭 Astronomy

| Section | Game | Overview | Status |
|---|---|---|---|
| Solar System | Planets | Order, size, and facts about the planets. | ✅ |
| Solar System | Moons | Moons of the planets. | ✅ |
| Solar System | The Sun | All about our star. | ✅ |
| Deep Space | Galaxies & Space | Galaxies, comets, and more. | ✅ |
| Solar System | Constellations | Spot and name star patterns in the night sky. | 🔨 `[quiz]` |

---

## 🔬 Science & Nature — *proposed stream (build next)*

Rich, emoji-friendly quiz content — the highest-value new stream.

| Section | Game | Overview | Status |
|---|---|---|---|
| Animals | Animal Homes | Match each animal to its habitat. | 🔨 `[quiz]` |
| Animals | Baby Animals | What is a baby cow/dog/cat called? | 🔨 `[quiz]` |
| Animals | Animal Sounds | Which animal makes this sound? | 🔨 `[quiz]` |
| Animals | Animal Groups | Mammal, bird, fish, reptile, or insect? | 🔨 `[quiz]` |
| Human Body | Body Parts | Name the part of the body. | 🔨 `[quiz]` |
| Human Body | Five Senses | Which sense do we use for this? | 🔨 `[quiz]` |
| Plants | Plant Life Cycle | Seed → sprout → plant → flower, in order. | 🔨 `[seq]` |
| Weather | Weather & Seasons | Match the weather and the four seasons. | 🔨 `[quiz]` |
| Dinosaurs | Dinosaurs | Meet the dinosaurs and what they ate. | 🔨 `[quiz]` |
| Food | Food Groups | Sort foods into their groups. | 🔨 `[quiz]` |

---

## 🎨 Colors & Shapes — *proposed stream (youngest, ages 3–5)*

| Section | Game | Overview | Status |
|---|---|---|---|
| Colors | Color Recognition | Name the color you see. | 🔨 `[quiz]` |
| Colors | Mixing Colors | What do red + blue make? | 🔨 `[quiz]` |
| Sorting | Sort & Group | Group things by color, shape, or size. | 🔨 `[new]` |

> Note: "Shapes" already lives in the **Math → Shapes & Patterns** section.

---

## 📅 Time & Calendar — *proposed stream*

| Section | Game | Overview | Status |
|---|---|---|---|
| Calendar | Days of the Week | Put the days in order (or type them). | 🔨 `[seq/typing]` |
| Calendar | Months of the Year | Put the months in order. | 🔨 `[seq/typing]` |
| Seasons | Seasons | Which season is it? | 🔨 `[quiz]` |

> Note: clock-reading already lives in **Life Skills → Time**.

---

## 🧩 Logic & Memory — *proposed stream*

Very popular with kids and highly replayable; mostly needs new mechanics.

| Section | Game | Overview | Status |
|---|---|---|---|
| Memory | Memory Match | Flip cards to find matching pairs. | 🔨 `[new]` |
| Reasoning | Odd One Out | Which one does not belong? | 🔨 `[quiz/new]` |
| Reasoning | Sequences | What comes next in the sequence? | 🔨 `[seq]` |
| Reasoning | Sorting & Categorizing | Drag items into the right group. | 🔨 `[new]` |
| Puzzles | Simple Mazes | Guide the character from start to finish. | 🔨 `[new]` |

---

Everything tagged `[quiz]`, `[math]`, `[typing]`, or `[seq]` is a data-only or
config-only addition that slots into the streams-and-sections navigation
automatically — no nav or routing code to touch.
