import { makeQuizGame } from '../../shared/quiz.js';
import { CHAMELEON } from '../data/chameleon.js';

export default {
  id: 'lang-chameleon',
  title: 'Chameleon Prefixes',
  stream: 'Language',
  category: 'Word Building',
  icon: '🦎',
  description: 'in- + possible = im-!',
  mount: makeQuizGame({
    title: 'Chameleon Prefixes',
    icon: '🦎',
    data: CHAMELEON,
    prompt: (m) => m.q,
    answer: (m) => m.a,
  }),
};
