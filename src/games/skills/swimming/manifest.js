import { makeQuizGame } from '../../shared/quiz.js';
import { bigEmoji } from '../../shared/emoji.js';
import { SWIMMING } from './data.js';

export default {
  id: 'swimming',
  title: 'Swimming',
  stream: 'Skills',
  category: 'Swimming',
  icon: '🏊',
  description: 'Be a safe, happy swimmer!',
  mount: makeQuizGame({
    title: 'Swimming',
    icon: '🏊',
    data: SWIMMING,
    prompt: (m) => m.q,
    answer: (m) => m.a,
    promptNode: (m) => bigEmoji(m.emoji),
  }),
};
