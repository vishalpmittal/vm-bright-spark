import { makeQuizGame } from '../../shared/quiz.js';
import { worldMapPin } from '../../shared/media.js';
import { COUNTRIES } from '../data/countries.js';
import { COUNTRY_COORDS } from '../data/country-coords.js';

export default {
  id: 'geo-countries',
  title: 'Countries & Capitals',
  stream: 'Geography',
  category: 'The World',
  icon: '🏳️',
  description: 'Name the capital!',
  mount: makeQuizGame({
    title: 'Countries & Capitals',
    icon: '🏳️',
    data: COUNTRIES,
    prompt: (c) => `What is the capital of ${c.name}?`,
    answer: (c) => c.capital,
    // Pin the asked country on the world map (the answer is its capital, so
    // the pin is a learning aid rather than a spoiler).
    mediaNode: (c) => worldMapPin(COUNTRY_COORDS[c.name]),
  }),
};
