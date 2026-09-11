import { makeQuizGame } from '../../shared/quiz.js';
import { SUFFIX_CHOICE } from '../data/suffix-choice.js';

export default {
  id: 'lang-suffix-choice',
  title: 'Suffix Choice',
  stream: 'Language',
  category: 'Spelling',
  icon: '🔚',
  description: '-tion, -sion or -able?',
  mount: makeQuizGame({
    title: 'Suffix Choice',
    icon: '🔚',
    data: SUFFIX_CHOICE,
    prompt: (m) => m.q,
    answer: (m) => m.a,
  }),
};
