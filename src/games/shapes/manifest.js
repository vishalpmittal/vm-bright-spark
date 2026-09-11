import { makeQuizGame } from '../shared/quiz.js';
import { bigEmoji } from '../shared/emoji.js';
import { SHAPES } from './shapes.js';

export default {
  id: 'shapes',
  title: 'Shapes',
  stream: 'Math',
  category: 'Shapes & Patterns',
  icon: '🔷',
  description: 'Name the shape!',
  mount: makeQuizGame({
    title: 'Shapes',
    icon: '🔷',
    data: SHAPES,
    prompt: () => 'What shape is this?',
    answer: (s) => s.name,
    promptNode: (s) => bigEmoji(s.emoji),
  }),
};
