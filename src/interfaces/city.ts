import {Location} from './location.ts';
import {Point} from './point.ts';

export interface City {
  name: string;
  location: Location;
  points: Point[];
}
