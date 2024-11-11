import {Offer} from '../interfaces/offer.ts';
import {Type} from './enums/type.ts';
import {Rating} from './enums/rating.ts';
import {Image} from './enums/image.ts';
import {cities} from './cities.ts';
import {locations} from './locations.ts';


export const offers: Offer[] = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'An excellent place with a view of the embankment',
    type: Type.Room,
    price: 150,
    city: cities[0],
    location: locations[0],
    isFavorite: true,
    isPremium: true,
    rating: Rating.FourStars,
    previewImage: Image.Room
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f01',
    title: 'There are amazing sunsets here',
    type: Type.Apartment,
    price: 200,
    city: cities[1],
    location: locations[1],
    isFavorite: true,
    isPremium: false,
    rating: Rating.FiveStars,
    previewImage: Image.Apartment2
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f02',
    title: 'Enjoy the hustle and bustle of the city',
    type: Type.Apartment,
    price: 160,
    city: cities[2],
    location: locations[2],
    isFavorite: true,
    isPremium: true,
    rating: Rating.FourStars,
    previewImage: Image.Apartment1
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f03',
    title: 'A cozy nest far from the center',
    type: Type.Apartment,
    price: 80,
    city: cities[3],
    location: locations[3],
    isFavorite: true,
    isPremium: false,
    rating: Rating.OneStar,
    previewImage: Image.Apartment3
  }
];
