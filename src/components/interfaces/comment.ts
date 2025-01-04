import {Host} from './host.ts';

export interface Comment {
  id: string;
  date: string;
  user: Host;
  comment: string;
  rating: number;
}
