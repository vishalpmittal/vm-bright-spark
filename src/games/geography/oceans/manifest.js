import { makeQuizGame } from '../../shared/quiz.js';
import { bigEmoji } from '../../shared/emoji.js';
import { OCEANS } from '../data/oceans.js';

export default {
  id: 'geo-oceans',
  title: 'Oceans',
  stream: 'Geography',
  category: 'The World',
  icon: '🌊',
  description: 'The five oceans',
  mount: makeQuizGame({
    title: 'Oceans',
    icon: '🌊',
    data: OCEANS,
    prompt: (o) => o.q,
    answer: (o) => o.a,
    promptNode: () => bigEmoji('🌊'),
  }),
};
