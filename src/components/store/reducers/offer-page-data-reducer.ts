import {Offer} from '../../interfaces/offer.ts';
import {Comment} from '../../interfaces/comment.ts';
import {DetailedOffer} from '../../interfaces/detailed-offer.ts';
import {createReducer} from '@reduxjs/toolkit';
import {
  changeOffer,
  loadComments,
  loadDetailedOffer,
  loadNearbyOffers, loadNewComment,
} from '../actions/app-actions.ts';

type InitialState = {
  nearbyOffers: Offer[];
  comments: Comment[];
  detailedOffer: DetailedOffer | null;
}

const initialState: InitialState = {
  nearbyOffers: [],
  comments: [],
  detailedOffer: null
};

export const offerPageDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadDetailedOffer, (state, action) => {
      state.detailedOffer = action.payload;
    })
    .addCase(loadNewComment, (state, action) => {
      state.comments = [...state.comments, action.payload];
    })
    .addCase(changeOffer, (state, action) => {
      state.nearbyOffers = state.nearbyOffers.slice().map((offer) => offer.id === action.payload.id ? action.payload : offer);
      if (state.detailedOffer) {
        state.detailedOffer = state.detailedOffer.id === action.payload.id ? action.payload : state.detailedOffer;
      }
    });
});
