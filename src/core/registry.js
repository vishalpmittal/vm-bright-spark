// Game registry — the single source of truth for what games exist.
// The two navigation bars and the router are all derived from what is
// registered here, so adding a game never requires touching nav/routing code.

const games = [];

/** Register a game manifest. Order of registration is preserved for display. */
export function register(manifest) {
  const required = ['id', 'title', 'stream', 'mount'];
  for (const key of required) {
    if (!manifest[key]) throw new Error(`Game manifest missing "${key}"`);
  }
  if (games.some((g) => g.id === manifest.id)) {
    throw new Error(`Duplicate game id: ${manifest.id}`);
  }
  games.push({ category: 'Games', icon: '🎮', description: '', ...manifest });
}

/** All registered games. */
export function allGames() {
  return games.slice();
}

/** Distinct streams (nav bar 1), in first-seen order. */
export function getStreams() {
  const seen = new Set();
  const out = [];
  for (const g of games) {
    if (!seen.has(g.stream)) {
      seen.add(g.stream);
      out.push(g.stream);
    }
  }
  return out;
}

/** Games within a stream (nav bar 2), in registration order. */
export function getGames(stream) {
  return games.filter((g) => g.stream === stream);
}

/** Look up a game by id. */
export function getGame(id) {
  return games.find((g) => g.id === id) || null;
}
