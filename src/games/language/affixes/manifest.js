import { makeQuizGame } from '../../shared/quiz.js';
import { AFFIXES } from '../data/affixes.js';

export default {
  id: 'lang-affixes',
  title: 'Prefixes & Suffixes',
  stream: 'Language',
  category: 'Word Building',
  icon: '🧩',
  description: 'Word-part power!',
  mount: makeQuizGame({
    title: 'Prefixes & Suffixes',
    icon: '🧩',
    data: AFFIXES,
    prompt: (m) => m.q,
    answer: (m) => m.a,
  }),
};
