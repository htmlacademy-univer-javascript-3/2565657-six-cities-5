import {createReducer} from '@reduxjs/toolkit';
import {cities} from '../mocks/cities.ts';
import {changeCity, fillOffersList} from './action.ts';
import {City} from '../interfaces/city.ts';
import {Offer} from '../interfaces/offer.ts';
import {offers} from '../mocks/offers.ts';

type InitialState = {
  city: City;
  offers: Offer[];
}

const initialState: InitialState = {
  city: cities[0],
  offers: offers.filter((offer) => offer.city.name === cities[0].name)
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload;
    });
});
