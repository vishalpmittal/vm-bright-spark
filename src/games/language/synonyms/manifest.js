import { makeQuizGame } from '../../shared/quiz.js';
import { bigEmoji, emojiForWord, STREAM_EMOJI } from '../../shared/emoji.js';
import { SYNONYMS } from '../data/synonyms.js';

export default {
  id: 'lang-synonyms',
  title: 'Synonyms',
  stream: 'Language',
  category: 'Word Play',
  icon: '🟰',
  description: 'Same meaning!',
  mount: makeQuizGame({
    title: 'Synonyms',
    icon: '🟰',
    data: SYNONYMS,
    prompt: (s) => `Which word means the same as "${s.word}"?`,
    answer: (s) => s.synonym,
    promptNode: (s) => bigEmoji(emojiForWord(s.word, STREAM_EMOJI.language)),
  }),
};
