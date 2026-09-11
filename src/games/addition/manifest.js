import { makeArithmeticGame } from '../shared/arithmetic.js';

export default {
  id: 'addition',
  title: 'Add It Up',
  stream: 'Math',
  category: 'Arithmetic',
  icon: '➕',
  description: 'Practice adding!',
  mount: makeArithmeticGame({ op: 'add', symbol: '+', emoji: '🟢', title: 'Add It Up' }),
};
