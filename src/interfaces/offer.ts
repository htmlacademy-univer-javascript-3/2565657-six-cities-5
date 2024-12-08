import {City} from './city.ts';
import {Location} from './location.ts';
import {Point} from './point.ts';

export interface Offer {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  point: Point;
}
