import { makeQuizGame } from '../../shared/quiz.js';
import { bigEmoji } from '../../shared/emoji.js';
import { DEFINITIONS } from '../data/definitions.js';

export default {
  id: 'lang-word-meanings',
  title: "What's the Word?",
  stream: 'Language',
  category: 'Word Play',
  icon: '🔍',
  description: 'Word for the clue!',
  mount: makeQuizGame({
    title: "What's the Word?",
    icon: '🔍',
    data: DEFINITIONS,
    prompt: (d) => d.definition,
    answer: (d) => d.word,
    // The answer IS the word, so a per-word emoji would spoil it — use a
    // neutral "read the clue" graphic instead.
    promptNode: () => bigEmoji('📖'),
  }),
};
