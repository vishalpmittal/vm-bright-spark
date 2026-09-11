// Thin player layer over storage. Adds "remember the last player" convenience
// on top of the raw folder operations in storage.js.

import { listPlayers, createPlayer } from './storage.js';
import { idbGet, idbSet } from './idb.js';

const LAST_PLAYER_KEY = 'lastPlayer';

export async function getPlayers(root) {
  return listPlayers(root);
}

export async function addPlayer(root, name) {
  return createPlayer(root, name); // returns sanitized folder name
}

export async function rememberPlayer(name) {
  await idbSet(LAST_PLAYER_KEY, name);
}

export async function getLastPlayer() {
  return idbGet(LAST_PLAYER_KEY);
}
