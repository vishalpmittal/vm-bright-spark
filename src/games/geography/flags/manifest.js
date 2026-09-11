import { makeQuizGame } from '../../shared/quiz.js';
import { bigEmoji } from '../../shared/emoji.js';
import { FLAGS } from '../data/flags.js';

export default {
  id: 'geo-flags',
  title: 'Flags',
  stream: 'Geography',
  category: 'Flags & Landmarks',
  icon: '🚩',
  description: 'Whose flag is it?',
  mount: makeQuizGame({
    title: 'Flags',
    icon: '🚩',
    data: FLAGS,
    prompt: () => "Which country's flag is this?",
    answer: (f) => f.country,
    promptNode: (f) => bigEmoji(f.flag),
  }),
};
