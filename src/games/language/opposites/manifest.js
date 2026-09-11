import { makeQuizGame } from '../../shared/quiz.js';
import { bigEmoji, emojiForWord, STREAM_EMOJI } from '../../shared/emoji.js';
import { OPPOSITES } from '../data/opposites.js';

export default {
  id: 'lang-opposites',
  title: 'Opposites',
  stream: 'Language',
  category: 'Word Play',
  icon: '↔️',
  description: 'Find the opposite!',
  mount: makeQuizGame({
    title: 'Opposites',
    icon: '↔️',
    data: OPPOSITES,
    prompt: (o) => `What is the opposite of "${o.word}"?`,
    answer: (o) => o.opposite,
    promptNode: (o) => bigEmoji(emojiForWord(o.word, STREAM_EMOJI.language)),
  }),
};
