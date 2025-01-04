import {Offer} from '../../interfaces/offer.ts';
import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity,
  changeOffer,
  loadOffers
} from '../actions/app-actions.ts';

type InitialState = {
  offers: Offer[];
  city: string;
}

const initialState: InitialState = {
  offers: [],
  city: 'Paris'
};

export const mainPageDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeOffer, (state, action) => {
      state.offers = state.offers.slice().map((offer) => offer.id === action.payload.id ? action.payload : offer);
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});
