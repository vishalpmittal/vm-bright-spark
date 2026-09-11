import { makeQuizGame } from '../../shared/quiz.js';
import { bigEmoji } from '../../shared/emoji.js';
import { MANNERS } from './data.js';

export default {
  id: 'manners',
  title: 'Good Manners',
  stream: 'Life Skills',
  category: 'Manners',
  icon: '🙏',
  description: 'The polite thing to do!',
  mount: makeQuizGame({
    title: 'Good Manners',
    icon: '🙏',
    data: MANNERS,
    prompt: (m) => m.q,
    answer: (m) => m.a,
    promptNode: (m) => bigEmoji(m.emoji),
  }),
};
