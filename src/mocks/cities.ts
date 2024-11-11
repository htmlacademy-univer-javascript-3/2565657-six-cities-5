import {City} from '../interfaces/city.ts';
import {locations} from './locations.ts';

export const cities: City[] = [
  {
    name: 'Москва',
    location: locations[0]
  },
  {
    name: 'Екатеринбург',
    location: locations[1]
  },
  {
    name: 'Санкт-Петербург',
    location: locations[2]
  },
  {
    name: 'Екатеринбург',
    location: locations[3]
  }
];
