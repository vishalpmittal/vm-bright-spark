// Emoji item sets for the counting game. Each round picks one set and shows a
// random number of that item.

export const ITEM_SETS = [
  { name: 'apples', emoji: '🍎' },
  { name: 'stars', emoji: '⭐' },
  { name: 'balloons', emoji: '🎈' },
  { name: 'ducks', emoji: '🦆' },
  { name: 'flowers', emoji: '🌸' },
  { name: 'fish', emoji: '🐠' },
  { name: 'cars', emoji: '🚗' },
  { name: 'cookies', emoji: '🍪' },
  { name: 'frogs', emoji: '🐸' },
  { name: 'hearts', emoji: '❤️' },
];

export function pickItemSet() {
  return ITEM_SETS[Math.floor(Math.random() * ITEM_SETS.length)];
}
