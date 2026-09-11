// Data for the Money game's three modes.

// --- Know Your Money: what each coin/bill is worth ---
export const KNOW_MONEY = [
  { name: 'penny', value: '1¢' },
  { name: 'nickel', value: '5¢' },
  { name: 'dime', value: '10¢' },
  { name: 'quarter', value: '25¢' },
  { name: 'half dollar', value: '50¢' },
  { name: 'one-dollar bill', value: '$1' },
  { name: 'five-dollar bill', value: '$5' },
  { name: 'ten-dollar bill', value: '$10' },
  { name: 'twenty-dollar bill', value: '$20' },
  { name: 'hundred-dollar bill', value: '$100' },
];

// --- Big Money: names for large amounts. Answers stay within one small set
// {Hundred, Thousand, Million, Billion, Trillion} so the choices look consistent. ---
export const BIG_MONEY = [
  { q: '$100 is one ___ dollars.', a: 'Hundred' },
  { q: '$1,000 is one ___ dollars.', a: 'Thousand' },
  { q: '$1,000,000 is one ___ dollars.', a: 'Million' },
  { q: '$10,000,000 is ten ___ dollars.', a: 'Million' },
  { q: '$100,000,000 is one hundred ___ dollars.', a: 'Million' },
  { q: '$1,000,000,000 is one ___ dollars.', a: 'Billion' },
  { q: '$10,000,000,000 is ten ___ dollars.', a: 'Billion' },
  { q: '$1,000,000,000,000 is one ___ dollars.', a: 'Trillion' },
  { q: 'One thousand thousands make one ___.', a: 'Million' },
  { q: 'One thousand millions make one ___.', a: 'Billion' },
];

// --- Add It Up: bills and coins to combine into a total. Values are in cents.
// `minLevel` decides when a denomination appears as difficulty ramps up. ---
export const ADD_DENOMS = [
  { cents: 1, label: '1¢', kind: 'coin', cls: 'c1', minLevel: 1 },
  { cents: 5, label: '5¢', kind: 'coin', cls: 'c5', minLevel: 1 },
  { cents: 10, label: '10¢', kind: 'coin', cls: 'c10', minLevel: 1 },
  { cents: 25, label: '25¢', kind: 'coin', cls: 'c25', minLevel: 1 },
  { cents: 50, label: '50¢', kind: 'coin', cls: 'c50', minLevel: 2 },
  { cents: 100, label: '$1', kind: 'bill', cls: 'b1', minLevel: 2 },
  { cents: 500, label: '$5', kind: 'bill', cls: 'b5', minLevel: 3 },
  { cents: 1000, label: '$10', kind: 'bill', cls: 'b10', minLevel: 4 },
  { cents: 2000, label: '$20', kind: 'bill', cls: 'b20', minLevel: 4 },
];

/** Format a number of cents as $X.YY / $X / N¢. */
export function fmtMoney(cents) {
  const d = Math.floor(cents / 100);
  const c = cents % 100;
  if (d === 0) return `${c}¢`;
  if (c === 0) return `$${d}`;
  return `$${d}.${String(c).padStart(2, '0')}`;
}
