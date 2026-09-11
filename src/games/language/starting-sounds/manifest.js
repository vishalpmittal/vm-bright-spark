import { makeQuizGame } from '../../shared/quiz.js';
import { bigEmoji } from '../../shared/emoji.js';
import { STARTING_SOUNDS } from '../data/starting-sounds.js';

export default {
  id: 'lang-starting-sounds',
  title: 'Starting Sounds',
  stream: 'Language',
  category: 'Letters & Sounds',
  icon: '🔤',
  description: 'What sound to start?',
  mount: makeQuizGame({
    title: 'Starting Sounds',
    icon: '🔤',
    data: STARTING_SOUNDS,
    prompt: (s) => `What letter does ${s.word} start with?`,
    answer: (s) => s.letter,
    promptNode: (s) => bigEmoji(s.emoji),
  }),
};
