import { makeQuizGame } from '../../shared/quiz.js';
import { SCHWA } from '../data/schwa.js';

export default {
  id: 'lang-schwa',
  title: 'Schwa Detective',
  stream: 'Language',
  category: 'Spelling',
  icon: '🕵️',
  description: 'Hear the hidden vowel!',
  mount: makeQuizGame({
    title: 'Schwa Detective',
    icon: '🕵️',
    data: SCHWA,
    prompt: (m) => m.q,
    answer: (m) => m.a,
  }),
};
