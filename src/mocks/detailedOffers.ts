import {DetailedOffer} from '../interfaces/detailed-offer.ts';
import {offers} from './offers.ts';
import {hosts} from './hosts.ts';
import {Image} from './enums/image.ts';

export const detailedOffers: DetailedOffer[] = [
  {
    ...offers[0],
    description: 'This place offers stunning views of the river and is perfect for a romantic getaway.',
    bedrooms: 1,
    goods: ['Wi-Fi', 'Air conditioning', 'Kitchen'],
    host: hosts[0],
    images: [Image.Room],
    maxAdults: 2
  },
  {
    ...offers[1],
    description: 'Enjoy breathtaking sunsets from the comfort of your own balcony.',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Parking', 'Washing machine'],
    host: hosts[1],
    images: [Image.Apartment2],
    maxAdults: 4
  },
  {
    ...offers[2],
    description: 'Experience the vibrant city life just steps away from your door.',
    bedrooms: 1,
    goods: ['Wi-Fi', 'Elevator', 'Breakfast included'],
    host: hosts[0],
    images: [Image.Apartment1],
    maxAdults: 2
  },
  {
    ...offers[3],
    description: 'A peaceful retreat, perfect for those who want to escape the city noise.',
    bedrooms: 1,
    goods: ['Wi-Fi', 'Garden', 'BBQ facilities'],
    host: hosts[1],
    images: [Image.Apartment3],
    maxAdults: 2
  }
];
