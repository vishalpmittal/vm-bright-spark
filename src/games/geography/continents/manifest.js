import { makeQuizGame } from '../../shared/quiz.js';
import { worldMapPin } from '../../shared/media.js';
import { COUNTRIES } from '../data/countries.js';
import { COUNTRY_COORDS } from '../data/country-coords.js';

export default {
  id: 'geo-continents',
  title: 'Continents',
  stream: 'Geography',
  category: 'The World',
  icon: '🌍',
  description: 'Which continent?',
  mount: makeQuizGame({
    title: 'Continents',
    icon: '🌍',
    data: COUNTRIES,
    prompt: (c) => `Which continent is ${c.name} in?`,
    answer: (c) => c.continent,
    // The map pin shows where the country is — a learning aid for continents.
    mediaNode: (c) => worldMapPin(COUNTRY_COORDS[c.name]),
  }),
};
