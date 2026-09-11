import { makeQuizGame } from '../../shared/quiz.js';
import { SPELLING_RULES } from '../data/spelling-rules.js';

export default {
  id: 'lang-spelling-rules',
  title: 'Spelling Rules',
  stream: 'Language',
  category: 'Spelling',
  icon: '📏',
  description: 'The why behind spelling!',
  mount: makeQuizGame({
    title: 'Spelling Rules',
    icon: '📏',
    data: SPELLING_RULES,
    prompt: (m) => m.q,
    answer: (m) => m.a,
  }),
};
