// Stylized SVG illustrations of US coins and bills — drawn in code so the app
// stays fully offline with no image files and no copyright concerns. These are
// friendly, kid-recognizable illustrations, not exact reproductions.

const NS = 'http://www.w3.org/2000/svg';

const COINS = {
  '1¢':  { face: '#c48a5a', ring: '#a86f3f', name: 'PENNY' },
  '5¢':  { face: '#b9bdc4', ring: '#9aa0a6', name: 'NICKEL' },
  '10¢': { face: '#c8ccd2', ring: '#a6acb3', name: 'DIME' },
  '25¢': { face: '#bfc3ca', ring: '#9aa0a6', name: 'QUARTER' },
  '50¢': { face: '#c6cad0', ring: '#a2a8af', name: 'HALF' },
};

const BILLS = {
  '$1':   { bg: '#cdeccf', num: '1',   word: 'ONE' },
  '$5':   { bg: '#bfe6c8', num: '5',   word: 'FIVE' },
  '$10':  { bg: '#a9dcc0', num: '10',  word: 'TEN' },
  '$20':  { bg: '#8fd0b0', num: '20',  word: 'TWENTY' },
  '$100': { bg: '#7cc6a6', num: '100', word: 'HUNDRED' },
};

function el(tag, attrs) {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
}
function txt(x, y, cls, content) {
  const t = el('text', { x, y, 'text-anchor': 'middle', class: cls });
  t.textContent = content;
  return t;
}

function coinArt(label) {
  const c = COINS[label] || COINS['25¢'];
  const svg = el('svg', { viewBox: '0 0 100 100', class: 'coin-art', role: 'img', 'aria-label': `${c.name} ${label}` });
  svg.append(
    el('circle', { cx: 50, cy: 50, r: 47, fill: c.ring }),
    el('circle', { cx: 50, cy: 50, r: 40, fill: c.face }),
    el('circle', { cx: 50, cy: 50, r: 40, fill: 'none', stroke: 'rgba(0,0,0,0.12)', 'stroke-width': 2 }),
    txt(50, 54, 'coin-value', label),
    txt(50, 74, 'coin-name', c.name),
  );
  return svg;
}

function billArt(label) {
  const b = BILLS[label] || BILLS['$1'];
  const svg = el('svg', { viewBox: '0 0 160 84', class: 'bill-art', role: 'img', 'aria-label': `${b.word} dollar bill` });
  svg.append(
    el('rect', { x: 2, y: 2, width: 156, height: 80, rx: 8, fill: b.bg, stroke: '#0a3d1f', 'stroke-width': 2 }),
    el('rect', { x: 8, y: 8, width: 144, height: 68, rx: 6, fill: 'none', stroke: 'rgba(10,61,31,0.4)', 'stroke-width': 1.5 }),
    // corner numerals
    txt(24, 26, 'bill-num-sm', b.num),
    txt(136, 66, 'bill-num-sm', b.num),
    // portrait oval with a simple face
    el('ellipse', { cx: 48, cy: 44, rx: 16, ry: 22, fill: 'rgba(10,61,31,0.10)', stroke: 'rgba(10,61,31,0.35)' }),
    el('circle', { cx: 43, cy: 40, r: 2, fill: '#0a3d1f' }),
    el('circle', { cx: 53, cy: 40, r: 2, fill: '#0a3d1f' }),
    el('path', { d: 'M43 50 q5 5 10 0', fill: 'none', stroke: '#0a3d1f', 'stroke-width': 2, 'stroke-linecap': 'round' }),
    // big denomination + word
    txt(108, 46, 'bill-num', '$' + b.num),
    txt(108, 66, 'bill-word', b.word),
  );
  return svg;
}

/** Return an SVG element for a coin or bill given its label ("25¢", "$20"). */
export function moneyArt(kind, label) {
  return kind === 'bill' ? billArt(label) : coinArt(label);
}

/** Convenience: pick art from a value label alone (¢ -> coin, $ -> bill). */
export function moneyArtFromValue(label) {
  return label.trim().endsWith('¢') ? coinArt(label) : billArt(label);
}
