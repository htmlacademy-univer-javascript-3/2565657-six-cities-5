import {Host} from './host.ts';

export interface Review {
  id: string;
  date: string;
  user: Host;
  comment: string;
  rating: number;
}
