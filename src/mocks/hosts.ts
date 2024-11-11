import {Host} from '../interfaces/host.ts';
import {Image} from './enums/image.ts';

export const hosts: Host[] = [
  {
    name: 'Angelina',
    avatarUrl: Image.AvatarAngelina,
    isPro: true,
  },
  {
    name: 'Max',
    avatarUrl: Image.AvatarMax,
    isPro: false,
  }
];
