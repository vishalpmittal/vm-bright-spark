// Small shared UI helpers.

export const AGE_MIN = 3;
export const AGE_MAX = 10;

function clampAge(age) {
  age = Number(age);
  if (!Number.isFinite(age)) return 5;
  return Math.min(AGE_MAX, Math.max(AGE_MIN, Math.round(age)));
}

/**
 * A big, kid-friendly age slider (3–10).
 * Returns { el, value } where `value` reads the current number.
 */
export function makeAgeSlider(initial = 5) {
  const wrap = document.createElement('div');
  wrap.className = 'age-slider';

  const label = document.createElement('div');
  label.className = 'age-label';

  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(AGE_MIN);
  input.max = String(AGE_MAX);
  input.step = '1';
  input.value = String(clampAge(initial));
  input.setAttribute('aria-label', "Child's age");

  const scale = document.createElement('div');
  scale.className = 'age-scale';
  for (let a = AGE_MIN; a <= AGE_MAX; a++) {
    const tick = document.createElement('span');
    tick.textContent = String(a);
    scale.append(tick);
  }

  const render = () => { label.textContent = `🎂 Age: ${input.value}`; };
  input.addEventListener('input', render);
  render();

  wrap.append(label, input, scale);
  return {
    el: wrap,
    input,
    get value() { return clampAge(input.value); },
  };
}

export { clampAge };
