import { makeArithmeticGame } from '../shared/arithmetic.js';

export default {
  id: 'subtraction',
  title: 'Take Away',
  stream: 'Math',
  category: 'Arithmetic',
  icon: '➖',
  description: 'Practice subtracting!',
  mount: makeArithmeticGame({ op: 'sub', symbol: '−', emoji: '🍪', title: 'Take Away' }),
};
