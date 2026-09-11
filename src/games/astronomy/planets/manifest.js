import { makeQuizGame } from '../../shared/quiz.js';
import { imagePanel } from '../../shared/media.js';
import { PLANETS } from '../data/planets.js';

const IMG = new URL('../../../assets/astronomy/solar-system.webp', import.meta.url).href;

export default {
  id: 'astro-planets',
  title: 'Planets',
  stream: 'Astronomy',
  category: 'Solar System',
  icon: '🪐',
  description: 'Order, size & facts',
  mount: makeQuizGame({
    title: 'Planets',
    icon: '🪐',
    data: PLANETS,
    prompt: (p) => p.q,
    answer: (p) => p.a,
    // Decorative (not answer-specific), so it never gives the answer away.
    mediaNode: () => imagePanel(IMG, 'The solar system', '🪐'),
  }),
};
