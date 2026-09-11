import { makeSequenceGame } from '../shared/sequence.js';

export default {
  id: 'skip-counting',
  title: 'Skip Counting',
  stream: 'Math',
  category: 'Numbers',
  icon: '🔢',
  description: 'What number is next?',
  mount: makeSequenceGame({ title: 'Skip Counting', icon: '🔢', mode: 'number' }),
};
