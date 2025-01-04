import {Offer} from '../../interfaces/offer.ts';
import {createReducer} from '@reduxjs/toolkit';
import {
  changeOffer,
  clearFavorites,
  loadFavorites,
} from '../actions/app-actions.ts';

type InitialState = {
  favorites: Offer[];
}

const initialState: InitialState = {
  favorites: []
};

export const favoritePageDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(clearFavorites, (state) => {
      state.favorites = [];
    })
    .addCase(changeOffer, (state, action) => {
      if (action.payload.isFavorite) {
        state.favorites = [...state.favorites, action.payload];
      } else {
        state.favorites = state.favorites.slice().filter((offer) => offer.id !== action.payload.id);
      }
    });
});
