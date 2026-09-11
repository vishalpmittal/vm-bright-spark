import { makeQuizGame } from '../../shared/quiz.js';
import { imagePanel } from '../../shared/media.js';
import { SUN } from '../data/sun.js';

const IMG = new URL('../../../assets/astronomy/sun.webp', import.meta.url).href;

export default {
  id: 'astro-sun',
  title: 'The Sun',
  stream: 'Astronomy',
  category: 'Solar System',
  icon: '☀️',
  description: 'All about our star',
  mount: makeQuizGame({
    title: 'The Sun',
    icon: '☀️',
    data: SUN,
    prompt: (s) => s.q,
    answer: (s) => s.a,
    mediaNode: () => imagePanel(IMG, 'The Sun', '☀️'),
  }),
};
