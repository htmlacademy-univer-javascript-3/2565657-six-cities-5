import {createAction} from '@reduxjs/toolkit';
import {ActionRouter} from './action-router.ts';
import {Offer} from '../interfaces/offer.ts';
import {AuthorizationStatus} from '../react/pages/favorites-page/authorization-status.ts';
import {AppRouter} from '../react/app-router.ts';

export const changeCity = createAction(
  ActionRouter.ChangeCityAction,
  (newCity: string) => ({
    payload: newCity
  }));

export const loadOffers = createAction<Offer[]>(ActionRouter.LoadOffers);

export const requireAuthorization = createAction<AuthorizationStatus>(ActionRouter.RequireAuthorization);

export const setError = createAction<string | null>(ActionRouter.SetError);

export const setOffersDataLoadingStatus = createAction<boolean>(ActionRouter.SetOffersDataLoadingStatus);

export const redirectToRoute = createAction<AppRouter>(ActionRouter.RedirectToRoute);
