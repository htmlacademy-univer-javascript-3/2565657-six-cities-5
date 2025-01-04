import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, State} from './state.ts';
import {createAPI} from '../api/api.ts';
import {redirect} from './redirect.ts';
import {userReducer} from './reducers/user-reducer.ts';
import {mainPageDataReducer} from './reducers/main-page-data-reducer.ts';
import {favoritePageDataReducer} from './reducers/favorites-page-data-reducer.ts';
import {offerPageDataReducer} from './reducers/offer-page-data-reducer.ts';


export const api = createAPI();

export const combinedReducer = combineReducers({
  mainPageData: mainPageDataReducer,
  favoritesPageData: favoritePageDataReducer,
  offerPageData: offerPageDataReducer,
  user: userReducer
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
