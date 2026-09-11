import { makeQuizGame } from '../../shared/quiz.js';
import { imagePanel } from '../../shared/media.js';
import { GALAXIES } from '../data/galaxies.js';

const IMG = new URL('../../../assets/astronomy/galaxy.webp', import.meta.url).href;

export default {
  id: 'astro-galaxies',
  title: 'Galaxies & Space',
  stream: 'Astronomy',
  category: 'Deep Space',
  icon: '🌌',
  description: 'Galaxies, comets & more',
  mount: makeQuizGame({
    title: 'Galaxies & Space',
    icon: '🌌',
    data: GALAXIES,
    prompt: (g) => g.q,
    answer: (g) => g.a,
    mediaNode: () => imagePanel(IMG, 'A galaxy', '🌌'),
  }),
};
