import { makeQuizGame } from '../../shared/quiz.js';
import { SYLLABLE_DIVISION } from '../data/syllable-division.js';

export default {
  id: 'lang-syllable-division',
  title: 'Syllable Split',
  stream: 'Language',
  category: 'Spelling',
  icon: '✂️',
  description: 'Break long words apart!',
  mount: makeQuizGame({
    title: 'Syllable Split',
    icon: '✂️',
    data: SYLLABLE_DIVISION,
    prompt: (m) => m.q,
    answer: (m) => m.a,
  }),
};
