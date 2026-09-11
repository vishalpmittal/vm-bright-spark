import { makeQuizGame } from '../../shared/quiz.js';
import { bigEmoji, emojiForWord, STREAM_EMOJI } from '../../shared/emoji.js';
import { RHYMES } from '../data/rhymes.js';

export default {
  id: 'lang-rhymes',
  title: 'Rhyming Words',
  stream: 'Language',
  category: 'Word Play',
  icon: '🎵',
  description: 'Find the rhyme!',
  mount: makeQuizGame({
    title: 'Rhyming Words',
    icon: '🎵',
    data: RHYMES,
    prompt: (r) => `Which word rhymes with "${r.word}"?`,
    answer: (r) => r.rhyme,
    promptNode: (r) => bigEmoji(emojiForWord(r.word, STREAM_EMOJI.language)),
  }),
};
