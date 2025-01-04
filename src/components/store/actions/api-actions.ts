import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../state.ts';
import {AxiosInstance} from 'axios';
import {Offer} from '../../interfaces/offer.ts';
import {ActionRouter} from '../action-router/action-router.ts';
import {ApiRouter} from '../../api/api-router.ts';
import {
  changeOffer,
  loadComments, loadDetailedOffer,
  loadFavorites,
  loadNearbyOffers, loadNewComment,
  loadOffers,
  redirectToRoute,
  requireAuthorization,
  setError
} from './app-actions.ts';
import {AuthorizationStatus} from '../../enums/authorization-status.ts';
import {dropToken, saveToken} from '../../api/token.ts';
import {AuthData} from '../auth-data.ts';
import {UserData} from '../user-data.ts';
import {store} from '../index.ts';
import {TIMEOUT_SHOW_ERROR} from '../../api/api.ts';
import {AppRouter} from '../../app-router/app-router.ts';
import {Comment} from '../../interfaces/comment.ts';
import {DetailedOffer} from '../../interfaces/detailed-offer.ts';

interface CommentData {
  id: string;
  comment: string;
  rating: number;
}
interface ChangeFavoriteData {
  id: string;
  status: number;
}

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  ActionRouter.LoadOffers,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(ApiRouter.Offers);
    dispatch(loadOffers(data));
  }
);

export const fetchOfferPageDataAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  ActionRouter.LoadOfferPageData,
  async (id, { dispatch, extra: api }) => {
    const { data: detailedOfferData } = await api.get<DetailedOffer>(`${ApiRouter.BasePath}${ApiRouter.Offer}${id}`);
    dispatch(loadDetailedOffer(detailedOfferData));
    const { data: nearbyOffersData } = await api.get<Offer[]>(`${ApiRouter.BasePath}${ApiRouter.Offer}${id}/nearby`);
    dispatch(loadNearbyOffers(nearbyOffersData));
    const { data: commentsData } = await api.get<Comment[]>(`${ApiRouter.BasePath}${ApiRouter.Comment}${id}`);
    dispatch(loadComments(commentsData));
  }
);

export const fetchChangeFavoriteStatus = createAsyncThunk<void, ChangeFavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  ActionRouter.ChangeFavoriteStatus,
  async ({ id, status }, { dispatch, extra: api }) => {
    const { data } = await api.post<DetailedOffer>(`${ApiRouter.BasePath}${ApiRouter.ChangeFavoriteStatus}${id}/${status}`);
    dispatch(changeOffer(data));
  }
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  ActionRouter.LoadFavorites,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${ApiRouter.BasePath}${ApiRouter.Favorites}`);
    dispatch(loadFavorites(data));
  }
);

export const fetchAddCommentAction = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  ActionRouter.LoadComments,
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<Comment>(
      `${ApiRouter.BasePath}${ApiRouter.Comment}${id}`,
      { comment, rating }
    );
    dispatch(loadNewComment(data));
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
