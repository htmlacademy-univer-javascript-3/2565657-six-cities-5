import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from './state.ts';
import {AxiosInstance} from 'axios';
import {Offer} from '../interfaces/offer.ts';
import {ActionRouter} from './action-router.ts';
import {ApiRouter} from '../api/api-router.ts';
import {loadOffers, redirectToRoute, requireAuthorization, setError, setOffersDataLoadingStatus} from './actions.ts';
import {AuthorizationStatus} from '../react/pages/favorites-page/authorization-status.ts';
import {dropToken, saveToken} from '../api/token.ts';
import {AuthData} from './auth-data.ts';
import {UserData} from './user-data.ts';
import {store} from './index.ts';
import {TIMEOUT_SHOW_ERROR} from '../api/api.ts';
import {AppRouter} from '../react/app-router.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  ActionRouter.LoadOffers,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(ApiRouter.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  ActionRouter.RequireAuthorization,
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(ApiRouter.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  ActionRouter.Login,
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(ApiRouter.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRouter.Main));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  ActionRouter.Logout,
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRouter.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const clearError = createAsyncThunk(
  ActionRouter.ClearError,
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  }
);
