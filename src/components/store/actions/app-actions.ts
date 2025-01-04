import {createAction} from '@reduxjs/toolkit';
import {ActionRouter} from '../action-router/action-router.ts';
import {Offer} from '../../interfaces/offer.ts';
import {AuthorizationStatus} from '../../enums/authorization-status.ts';
import {AppRouter} from '../../app-router/app-router.ts';
import {Comment} from '../../interfaces/comment.ts';
import {DetailedOffer} from '../../interfaces/detailed-offer.ts';

export const changeCity = createAction<string>(ActionRouter.ChangeCityAction);

export const loadOffers = createAction<Offer[]>(ActionRouter.LoadOffers);

export const loadFavorites = createAction<Offer[]>(ActionRouter.LoadFavorites);

export const clearFavorites = createAction<void>(ActionRouter.ClearFavorites);

export const loadNearbyOffers = createAction<Offer[]>(ActionRouter.LoadNearbyOffers);

export const loadComments = createAction<Comment[]>(ActionRouter.LoadComments);

export const loadDetailedOffer = createAction<DetailedOffer>(ActionRouter.LoadDetailedOffer);

export const loadNewComment = createAction<Comment>(ActionRouter.LoadNewComment);

export const changeOffer = createAction<DetailedOffer>(ActionRouter.ChangeOffer);

export const requireAuthorization = createAction<AuthorizationStatus>(ActionRouter.RequireAuthorization);

export const setError = createAction<string | null>(ActionRouter.SetError);

export const redirectToRoute = createAction<AppRouter>(ActionRouter.RedirectToRoute);

