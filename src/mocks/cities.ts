import {City} from '../interfaces/city.ts';
import {locations} from './locations.ts';
import {points} from './points.ts';

export const cities: City[] = [
  {
    name: 'Paris',
    location: locations[0],
    points: [points[0], points[1], points[2]]
  },
  {
    name: 'Cologne',
    location: locations[1],
    points: [points[3], points[4], points[5]]
  },
  {
    name: 'Brussels',
    location: locations[2],
    points: [points[6], points[7], points[8]]
  },
  {
    name: 'Amsterdam',
    location: locations[3],
    points: [points[9], points[10], points[11]]
  },
  {
    name: 'Hamburg',
    location: locations[4],
    points: [points[12], points[13], points[14]]
  },
  {
    name: 'Düsseldorf',
    location: locations[5],
    points: [points[15], points[16], points[17]]
  }
];
