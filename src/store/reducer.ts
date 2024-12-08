import {createReducer} from '@reduxjs/toolkit';
import {cities} from '../mocks/cities.ts';
import {changeCity, fillCityOffersList, fillSortedOffersList} from './action.ts';
import {City} from '../interfaces/city.ts';
import {Offer} from '../interfaces/offer.ts';
import {offers} from '../mocks/offers.ts';

type InitialState = {
  city: City;
  selectedOffers: Offer[];
  sortedOffers: Offer[];
}

const initialOffers = offers.filter((offer) => offer.city.name === cities[0].name);

const initialState: InitialState = {
  city: cities[0],
  selectedOffers: initialOffers,
  sortedOffers: initialOffers
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillCityOffersList, (state, action) => {
      state.selectedOffers = action.payload;
    })
    .addCase(fillSortedOffersList, (state, action) => {
      state.sortedOffers = action.payload;
    });
});
