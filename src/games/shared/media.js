// Shared media-panel builders for the quiz engine's `mediaNode` hook.
// Each returns a DOM node that the engine drops into the .quiz-media panel
// (beside the question on desktop, above it on mobile).

import { WORLD_MAP_INNER } from '../../assets/geography/world-map.js';

/**
 * Self-contained world map with a pin at the given coordinates. The map is an
 * inline SVG in equirectangular coordinates (viewBox 0 0 360 180), so the pin
 * is plotted with plain linear math and always aligns with the drawn land.
 *
 * The SVG is built as a string and assigned to an HTML <div>'s innerHTML — the
 * HTML parser then handles the `<svg>` in foreign-content mode and creates the
 * children in the correct SVG namespace (setting innerHTML directly on an SVG
 * element does not do this reliably).
 * @param {{lat:number, lon:number}} [coords] omit/undefined -> map with no pin.
 * @returns {HTMLElement}
 */
export function worldMapPin(coords) {
  const wrap = document.createElement('div');
  wrap.className = 'map-wrap';

  let pin = '';
  if (coords && Number.isFinite(coords.lat) && Number.isFinite(coords.lon)) {
    const cx = coords.lon + 180; // x = lon + 180
    const cy = 90 - coords.lat;  // y = 90 - lat
    pin = `<circle class="map-pin" cx="${cx}" cy="${cy}" r="4.5"/>`;
  }

  wrap.innerHTML =
    '<svg viewBox="0 0 360 180" class="world-map" role="img" aria-label="World map">' +
    WORLD_MAP_INNER + pin +
    '</svg>';
  return wrap;
}

/**
 * An image panel (astronomy, etc.) with an always-visible fallback: until the
 * real image loads it shows a large emoji on a themed background, so a graphic
 * is present even before the image asset has been added (or if it 404s).
 * @param {string} src            resolved image URL
 * @param {string} alt
 * @param {string} [fallbackEmoji] emoji shown when the image is unavailable
 * @param {string} [theme]         CSS class for the fallback background
 * @returns {HTMLElement}
 */
export function imagePanel(src, alt = '', fallbackEmoji = '🖼️', theme = 'space') {
  const wrap = document.createElement('div');
  wrap.className = 'media-img';

  const fallback = document.createElement('div');
  fallback.className = `media-fallback ${theme}`;
  fallback.textContent = fallbackEmoji;
  wrap.append(fallback);

  if (src) {
    const img = new Image();
    img.alt = alt;
    img.loading = 'lazy';
    img.onload = () => { fallback.remove(); wrap.append(img); };
    img.onerror = () => { /* keep the emoji fallback */ };
    img.src = src;
  }
  return wrap;
}
