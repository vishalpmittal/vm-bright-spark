// File System Access API wrapper.
// Everything the app persists lives inside a single user-chosen "data folder":
//   <dataFolder>/<player>/<gameId>.json
//
// The root directory handle is kept in memory for the session and also stashed
// in IndexedDB so we can offer to reuse the same folder on the next visit.

import { idbGet, idbSet, idbDel } from './idb.js';

const HANDLE_KEY = 'dataFolderHandle';

/** True only in browsers that support the File System Access API (Chrome/Edge). */
export function isSupported() {
  return typeof window !== 'undefined' && 'showDirectoryPicker' in window;
}

/** Prompt the user to choose a data folder, then remember it for next time. */
export async function pickDataFolder() {
  const handle = await window.showDirectoryPicker({
    id: 'learning-games-data',
    mode: 'readwrite',
  });
  await idbSet(HANDLE_KEY, handle);
  return handle;
}

/**
 * Try to reuse the previously chosen folder.
 * Returns the handle if we still have read/write permission (without prompting),
 * otherwise null. Re-prompting for permission must happen from a click, so that
 * is handled separately via ensurePermission().
 */
export async function restoreDataFolder() {
  const handle = await idbGet(HANDLE_KEY);
  if (!handle) return null;
  try {
    const perm = await handle.queryPermission({ mode: 'readwrite' });
    if (perm === 'granted') return handle;
    // 'prompt' -> we have a handle but need a user gesture to re-grant.
    return handle;
  } catch {
    return null;
  }
}

/** Ensure read/write permission on a handle. Must be called from a user gesture. */
export async function ensurePermission(handle) {
  if ((await handle.queryPermission({ mode: 'readwrite' })) === 'granted') return true;
  return (await handle.requestPermission({ mode: 'readwrite' })) === 'granted';
}

/** Forget the remembered folder (used by "Change folder"). */
export async function forgetDataFolder() {
  await idbDel(HANDLE_KEY);
}

/** Turn a display name into a safe directory name. */
export function sanitizeName(name) {
  return name
    .trim()
    .replace(/[^a-zA-Z0-9 _-]/g, '')
    .replace(/\s+/g, ' ')
    .slice(0, 40)
    .trim();
}

/** List existing player folders (directory entries) inside the data folder. */
export async function listPlayers(root) {
  const names = [];
  for await (const [name, entry] of root.entries()) {
    if (entry.kind === 'directory') names.push(name);
  }
  names.sort((a, b) => a.localeCompare(b));
  return names;
}

/** Create (or get) a player's folder. Returns the sanitized folder name. */
export async function createPlayer(root, name) {
  const safe = sanitizeName(name);
  if (!safe) throw new Error('Please enter a name using letters or numbers.');
  await root.getDirectoryHandle(safe, { create: true });
  return safe;
}

/** Read a player's profile (age, etc.), or null if not set yet. */
export async function readProfile(root, player) {
  return readGame(root, player, 'profile');
}

/** Write a player's profile. */
export async function writeProfile(root, player, profile) {
  return writeGame(root, player, 'profile', profile);
}

/** Read and parse <player>/<gameId>.json, or null if it doesn't exist yet. */
export async function readGame(root, player, gameId) {
  try {
    const dir = await root.getDirectoryHandle(player, { create: true });
    const fileHandle = await dir.getFileHandle(`${gameId}.json`, { create: false });
    const file = await fileHandle.getFile();
    const text = await file.text();
    return text ? JSON.parse(text) : null;
  } catch (err) {
    if (err && err.name === 'NotFoundError') return null;
    throw err;
  }
}

/** Write <player>/<gameId>.json (pretty-printed). */
export async function writeGame(root, player, gameId, data) {
  const dir = await root.getDirectoryHandle(player, { create: true });
  const fileHandle = await dir.getFileHandle(`${gameId}.json`, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(JSON.stringify(data, null, 2));
  await writable.close();
}
