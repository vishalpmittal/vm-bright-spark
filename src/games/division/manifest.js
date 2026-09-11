import { makeArithmeticGame } from '../shared/arithmetic.js';

// Division always has a whole-number answer. Divisor/quotient start small and
// ramp up to 10.
const startMax = (age) => {
  const a = Math.min(10, Math.max(3, Math.round(Number(age) || 5)));
  return { 3: 2, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 8, 10: 10 }[a];
};

export default {
  id: 'division',
  title: 'Divide',
  stream: 'Math',
  category: 'Arithmetic',
  icon: '➗',
  description: 'Share equally!',
  mount: makeArithmeticGame({ op: 'div', symbol: '÷', icon: '➗', title: 'Divide', cap: 10, startMax }),
};
