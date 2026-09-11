import { makeArithmeticGame } from '../shared/arithmetic.js';

// Multiplication uses smaller factors than add/sub (times tables), starting
// tiny for young kids and ramping up to 10.
const startMax = (age) => {
  const a = Math.min(10, Math.max(3, Math.round(Number(age) || 5)));
  return { 3: 2, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 8, 10: 10 }[a];
};

export default {
  id: 'multiplication',
  title: 'Multiply',
  stream: 'Math',
  category: 'Arithmetic',
  icon: '✖️',
  description: 'Times tables!',
  mount: makeArithmeticGame({ op: 'mul', symbol: '×', icon: '✖️', title: 'Multiply', cap: 10, startMax }),
};
