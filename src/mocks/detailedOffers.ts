import {DetailedOffer} from '../interfaces/detailed-offer.ts';
import {offers} from './offers.ts';
import {hosts} from './hosts.ts';
import {Image} from './enums/image.ts';

export const detailedOffers: DetailedOffer[] = [
  {
    ...offers[0],
    description:'This place offers stunning views of the river and is perfect for a romantic getaway.',
    bedrooms : 1 ,
    goods : ['Wi-Fi', 'Air conditioning', 'Kitchen'],
    host : hosts[0],
    images : [Image.Room],
    maxAdults : 2
  },
  {
    ...offers[1],
    description:'A cozy apartment with all the amenities you need for a comfortable stay.',
    bedrooms : 1 ,
    goods : ['Wi-Fi', 'Heating', 'TV'],
    host : hosts[1],
    images : [Image.Apartment1],
    maxAdults : 2
  },
  {
    ...offers[2],
    description:'Enjoy the modern design and convenience of this studio apartment.',
    bedrooms : 1 ,
    goods : ['Wi-Fi', 'Air conditioning', 'Balcony'],
    host : hosts[0],
    images : [Image.Apartment2],
    maxAdults : 2
  },
  {
    ...offers[3],
    description:'This apartment offers breathtaking sunsets from the comfort of your own balcony.',
    bedrooms : 2 ,
    goods : ['Wi-Fi', 'Parking', 'Washing machine'],
    host : hosts[0],
    images : [Image.Apartment2],
    maxAdults : 4
  },
  {
    ...offers[4],
    description:'A cozy nest far from the center, perfect for a quiet retreat.',
    bedrooms : 1 ,
    goods : ['Wi-Fi', 'Elevator', 'Breakfast included'],
    host : hosts[1],
    images : [Image.Apartment3],
    maxAdults : 2
  },
  {
    ...offers[5],
    description:'Charming apartment in the heart of the city, close to all attractions.',
    bedrooms : 1 ,
    goods : ['Wi-Fi', 'Kitchen', 'Heating'],
    host : hosts[0],
    images : [Image.Apartment1],
    maxAdults : 2
  },
  {
    ...offers[6],
    description:'Experience the vibrant city life just steps away from your door.',
    bedrooms : 1 ,
    goods : ['Wi-Fi', 'Elevator', 'Breakfast included'],
    host : hosts[0],
    images : [Image.Apartment1],
    maxAdults : 2
  },
  {
    ...offers[7],
    description:'A peaceful retreat, perfect for those who want to escape the city noise.',
    bedrooms : 1 ,
    goods : ['Wi-Fi', 'Garden', 'BBQ facilities'],
    host : hosts[1],
    images : [Image.Room],
    maxAdults : 2
  },
  {
    ...offers[8],
    description:'Luxurious penthouse with stunning views of the skyline.',
    bedrooms : 3 ,
    goods : ['Wi-Fi', 'Hot tub', 'Gym access'],
    host : hosts[0],
    images : [Image.Apartment2],
    maxAdults : 6
  },
  {
    ...offers[9],
    description:'A lovely apartment in the city center with easy access to public transport.',
    bedrooms : 1 ,
    goods:['Wi-Fi','Kitchen','Heating'],
    host : hosts [0] ,
    images:[Image.Apartment1] ,
    maxAdults :2
  },
  {
    ...offers[10],
    description:'Modern studio with all amenities, perfect for short stays.',
    bedrooms :1 ,
    goods:['Wi-Fi','Air conditioning','TV'] ,
    host : hosts [1] ,
    images:[Image.Room] ,
    maxAdults :2
  },
  {
    ...offers[11],
    description:'Spacious apartment with a balcony, ideal for families.',
    bedrooms :2 ,
    goods:['Wi-Fi','Kitchen','Parking'] ,
    host : hosts [0] ,
    images:[Image.Apartment3] ,
    maxAdults :4
  },
  {
    ...offers[12],
    description:'Cozy and affordable room for travelers, close to attractions.',
    bedrooms :1 ,
    goods:['Wi-Fi','Shared kitchen','Breakfast included'] ,
    host : hosts [0] ,
    images:[Image.Room] ,
    maxAdults :2
  },
  {
    ...offers[13],
    description:'Stylish apartment in a quiet neighborhood, perfect for relaxation.',
    bedrooms :1 ,
    goods:['Wi-Fi','Heating','Garden'] ,
    host : hosts [1] ,
    images:[Image.Apartment1] ,
    maxAdults :2
  },
  {
    ...offers[14],
    description:'Luxury suite with all the comforts you need for a perfect stay.',
    bedrooms :2 ,
    goods:['Wi-Fi','Air conditioning','Spa access'] ,
    host : hosts [0] ,
    images:[Image.Apartment2] ,
    maxAdults :4
  },
  {
    ...offers[15],
    description:'Beautiful beachfront villa for a relaxing getaway with family or friends.',
    bedrooms :3 , // Количество спален
    goods:['Wi-Fi','Swimming pool','Beach access'] , // Удобства
    host : hosts [0] , // Хозяин
    images:[Image.Apartment2] , // Изображения
    maxAdults :6 // Максимальное количество взрослых
  },

  {
    ...offers[16],
    description:'Charming cottage with stunning sea views, perfect for romantic getaways.',
    bedrooms :1 , // Количество спален
    goods:['Wi-Fi','Outdoor seating','BBQ facilities'] , // Удобства
    host : hosts [1] , // Хозяин
    images:[Image.Room] , // Изображения
    maxAdults :2 // Максимальное количество взрослых
  },
  {
    ...offers[17],
    description:'Modern beach house perfect for families, close to local attractions.',
    bedrooms :2 , // Количество спален
    goods:['Wi-Fi','Kitchen','Parking'] , // Удобства
    host : hosts [0] , // Хозяин
    images:[Image.Apartment1] , // Изображения
    maxAdults :4 // Максимальное количество взрослых
  }
];
