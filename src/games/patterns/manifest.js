import { makeSequenceGame } from '../shared/sequence.js';

export default {
  id: 'patterns',
  title: 'Patterns',
  stream: 'Math',
  category: 'Shapes & Patterns',
  icon: '🔷',
  description: 'What comes next?',
  mount: makeSequenceGame({ title: 'Patterns', icon: '🔷', mode: 'pattern' }),
};
