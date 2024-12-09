import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity,
  loadOffers,
  requireAuthorization,
  setError, setOffersDataLoadingStatus
} from './actions.ts';
import {Offer} from '../interfaces/offer.ts';
import {AuthorizationStatus} from '../react/pages/favorites-page/authorization-status.ts';

type InitialState = {
  city: string;
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});
