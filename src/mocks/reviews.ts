import {hosts} from './hosts.ts';
import {Review} from '../interfaces/review.ts';
export const reviews: Review[] = [
  {
    id: '1',
    date: '2023-10-01',
    user: hosts[0],
    comment: 'Great place! Highly recommend.',
    rating: 5,
  },
  {
    id: '2',
    date: '2023-10-02',
    user: hosts[1],
    comment: 'Not a bad place, but there are some minor issues.',
    rating: 3,
  },
  {
    id: '3',
    date: '2023-10-03',
    user: hosts[0],
    comment: 'The service was top-notch!',
    rating: 4,
  },
  {
    id: '4',
    date: '2023-10-04',
    user: hosts[1],
    comment: 'Did not enjoy it much, expected more.',
    rating: 2,
  },
];
