# Learning Games — Expansion Plan

Ideas for future streams and subsections, tagged by how much work each is based on
the engines that already exist in the app.

## Effort tags

- **[quiz]** — drop-in on the existing quiz engine (`src/games/shared/quiz.js`); just add a dataset. Cheapest.
- **[math]** — drop-in on the arithmetic engine (`src/games/shared/arithmetic.js`).
- **[typing]** — drop-in on the typing engine (`src/games/typing/`).
- **[new]** — needs a new game mechanic.
- **[audio]** / **[img]** — needs sound files or images (breaks the current emoji-only, fully-offline approach).

---

## Extend existing streams

### Math
- Multiplication & Division **[math]** (great for the 7–10 end of the range)
- Greater / Less / Equal comparison **[math]**
- Skip counting (2s, 5s, 10s) **[math/new]**
- Shapes recognition, Patterns ("what comes next?") **[quiz]** / **[new]**
- Telling time / reading a clock **[new]**
- Coins & money **[quiz/new]**

### Geography (strongest stream already)
- **Flags** — flag → country, using emoji flags 🇫🇷🇯🇵 (no images needed) **[quiz]** — high value, very cheap
- Currencies (country → currency), Oceans, Famous landmarks **[quiz]** (landmarks want **[img]**)
- More countries' states/provinces in the merged State Capitals game **[quiz]** (one file each, like Canada)

---

## New streams

### Science & Nature 🔬 — lots of emoji-friendly quiz content
- Animals: baby names, habitats, what-sound, mammal/bird/fish/reptile **[quiz]**
- Human body parts, Five senses, Plant life cycle, Weather, Dinosaurs, Food groups **[quiz]**

### Space 🚀
- Planets of the solar system (order, biggest, facts) **[quiz]**

### Colors & Shapes 🎨 — aimed at the youngest (3–5)
- Color recognition, Shape recognition, Sorting **[quiz]** / **[new]**

### Time & Calendar 📅
- Days of the week / Months (put in order, or type them) **[typing/new]**
- Seasons, Clock reading **[quiz]** / **[new]**

### Logic & Memory 🧩
- Memory match (flip pairs) **[new]** — very popular with kids
- Odd-one-out, Sequences, Sorting & categorizing, Simple mazes **[new]**

### Life Skills 🧠
- Emotions / feelings recognition, Community helpers (jobs), Safety signs **[quiz]**

---

## Recommended "next 5" (best value ÷ effort, good age spread)

1. **Flags of the World** [quiz] — reuses country data + emoji flags, near-zero cost, huge engagement
2. **Multiplication & Division** [math] — reuses arithmetic engine, extends the top of the age range
3. **Animals** (habitats + baby names + classification) [quiz] — rich, emoji-based, science stream starter
4. **Spelling Bee** [typing] — reuses typing engine, strong literacy value
5. **Memory Match** [new] — the one worth a new engine; kids love it and it's replayable

Everything except Memory Match is a data-only or config-only addition that slots into the
current streams-and-categories navigation automatically.
