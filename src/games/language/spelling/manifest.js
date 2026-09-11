import { makeWordTypingGame } from '../../shared/word-typing.js';
import { SPELLING_WORDS } from '../data/spelling-words.js';

export default {
  id: 'lang-spelling',
  title: 'Spelling Bee',
  stream: 'Language',
  category: 'Spelling',
  icon: '🐝',
  description: 'Remember & spell!',
  mount: makeWordTypingGame({
    title: 'Spelling Bee',
    icon: '🐝',
    words: SPELLING_WORDS,
    flash: true,
  }),
};
