import {createAction} from '@reduxjs/toolkit';
import {ActionRouter} from './action-router.ts';
import {City} from '../interfaces/city.ts';
import {Offer} from '../interfaces/offer.ts';

export const changeCity = createAction(
  ActionRouter.ChangeCityAction,
  (newCity: City) => ({
    payload: newCity
  }));

export const fillCityOffersList = createAction(
  ActionRouter.FillCityOffersListAction,
  (selectedOffers: Offer[]) => ({
    payload: selectedOffers
  }));

export const fillSortedOffersList = createAction(
  ActionRouter.FillSortedOffersListAction,
  (sortedOffers: Offer[]) => ({
    payload: sortedOffers
  }));


