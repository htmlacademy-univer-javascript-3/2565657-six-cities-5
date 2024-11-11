import {Offer} from './offer.ts';
import {Host} from './host.ts';

export interface DetailedOffer extends Offer {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}
