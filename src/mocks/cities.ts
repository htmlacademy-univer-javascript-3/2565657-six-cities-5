import {City} from '../interfaces/city.ts';
import {locations} from './locations.ts';
import {points} from './points.ts';

export const cities: City[] = [
  {
    name: 'Moscow',
    location: locations[0],
    points: [points[0]]
  },
  {
    name: 'Yekaterinburg',
    location: locations[1],
    points: [points[1], points[2]]
  },
  {
    name: 'Saint-Petersburg',
    location: locations[2],
    points: [points[3]]
  }
];
