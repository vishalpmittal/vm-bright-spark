import { makeQuizGame } from '../../shared/quiz.js';
import { ORIGINS } from '../data/origins.js';

export default {
  id: 'lang-origins',
  title: 'Word Origins',
  stream: 'Language',
  category: 'Word Building',
  icon: '🌍',
  description: 'Where words come from!',
  mount: makeQuizGame({
    title: 'Word Origins',
    icon: '🌍',
    data: ORIGINS,
    prompt: (m) => m.q,
    answer: (m) => m.a,
  }),
};
