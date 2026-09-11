import { makeQuizGame } from '../../shared/quiz.js';
import { SYLLABLES } from '../data/syllables.js';

export default {
  id: 'lang-syllables',
  title: 'Syllable Types',
  stream: 'Language',
  category: 'Spelling',
  icon: '🧱',
  description: 'The six syllable types!',
  mount: makeQuizGame({
    title: 'Syllable Types',
    icon: '🧱',
    data: SYLLABLES,
    prompt: (m) => m.q,
    answer: (m) => m.a,
  }),
};
