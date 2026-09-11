import { makeQuizGame } from '../../shared/quiz.js';
import { imagePanel } from '../../shared/media.js';
import { MOONS } from '../data/moons.js';

const IMG = new URL('../../../assets/astronomy/moon.webp', import.meta.url).href;

export default {
  id: 'astro-moons',
  title: 'Moons',
  stream: 'Astronomy',
  category: 'Solar System',
  icon: '🌙',
  description: 'Moons of the planets',
  mount: makeQuizGame({
    title: 'Moons',
    icon: '🌙',
    data: MOONS,
    prompt: (m) => m.q,
    answer: (m) => m.a,
    mediaNode: () => imagePanel(IMG, 'The Moon', '🌙'),
  }),
};
