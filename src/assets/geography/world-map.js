// A self-contained, simplified world map drawn directly in equirectangular
// (plate carrée) coordinates: the SVG viewBox is `0 0 360 180`, where
//   x = longitude + 180   (0 at -180°, 360 at +180°)
//   y = 90 - latitude     (0 at +90°, 180 at -90°)
//
// Because the continents AND the quiz pin use this exact same projection, a pin
// plotted at (lon+180, 90-lat) always lands in the right place relative to the
// drawn landmasses — no map image or projection library needed. The shapes are
// deliberately rough (kid-friendly, tiny file), not survey-accurate.

// Simplified continent outlines as "x,y x,y …" polygon point lists.
const LAND = [
  // North America
  '12,25 40,20 80,20 100,30 116,40 105,50 99,65 88,75 68,66 56,50 52,36 30,30',
  // Greenland
  '130,26 135,18 160,20 145,32',
  // South America
  '105,79 145,95 145,98 132,115 123,128 110,144 107,130 100,102 99,90',
  // Africa
  '170,56 190,53 213,59 231,79 220,98 220,110 205,124 195,115 192,98 188,86 163,76',
  // Eurasia
  '170,47 200,20 240,18 340,20 340,35 302,52 288,70 284,88 258,82 250,68 232,75 215,62 208,53 195,50',
  // Australia
  '294,110 312,102 325,105 333,118 327,128 315,125 296,122',
];

// Smaller islands / regions drawn as ellipses: [cx, cy, rx, ry].
const ISLES = [
  [177, 36, 5, 4],    // British Isles
  [318, 52, 5, 7],    // Japan
  [227, 110, 3.5, 8], // Madagascar
  [352, 132, 4, 6],   // New Zealand
  [288, 92, 10, 4],   // Indonesia
  [300, 78, 4, 4],    // Philippines
];

const landPolys = LAND.map((p) => `<polygon class="wm-land" points="${p}"/>`).join('');
const islePolys = ISLES
  .map(([cx, cy, rx, ry]) => `<ellipse class="wm-land" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`)
  .join('');

/** Inner SVG markup (ocean + land), without the outer <svg> or any pin. */
export const WORLD_MAP_INNER =
  `<rect class="wm-ocean" x="0" y="0" width="360" height="180"/>${landPolys}${islePolys}`;
