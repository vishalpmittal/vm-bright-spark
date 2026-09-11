import { makeQuizGame } from '../../shared/quiz.js';
import { bigEmoji } from '../../shared/emoji.js';
import { LANDMARKS } from '../data/landmarks.js';

export default {
  id: 'geo-landmarks',
  title: 'Famous Landmarks',
  stream: 'Geography',
  category: 'Flags & Landmarks',
  icon: '🗽',
  description: 'Where is it?',
  mount: makeQuizGame({
    title: 'Famous Landmarks',
    icon: '🗽',
    data: LANDMARKS,
    prompt: (l) => `Where is the ${l.landmark}?`,
    answer: (l) => l.country,
    promptNode: (l) => bigEmoji(l.emoji),
  }),
};
