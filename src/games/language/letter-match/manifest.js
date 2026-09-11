import { makeQuizGame } from '../../shared/quiz.js';
import { bigEmoji } from '../../shared/emoji.js';
import { LETTERS } from '../data/letters.js';

export default {
  id: 'lang-letter-match',
  title: 'Letter Match',
  stream: 'Language',
  category: 'Letters & Sounds',
  icon: '🔡',
  description: 'Big & small letters',
  mount: makeQuizGame({
    title: 'Letter Match',
    icon: '🔡',
    data: LETTERS,
    prompt: (l) => `What is the small letter for "${l.upper}"?`,
    answer: (l) => l.lower,
    promptNode: (l) => bigEmoji(l.upper),
  }),
};
