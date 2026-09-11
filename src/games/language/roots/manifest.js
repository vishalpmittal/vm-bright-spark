import { makeQuizGame } from '../../shared/quiz.js';
import { ROOTS } from '../data/roots.js';

export default {
  id: 'lang-roots',
  title: 'Word Roots',
  stream: 'Language',
  category: 'Word Building',
  icon: '🌱',
  description: 'What word roots mean!',
  mount: makeQuizGame({
    title: 'Word Roots',
    icon: '🌱',
    data: ROOTS,
    prompt: (m) => m.q,
    answer: (m) => m.a,
  }),
};
