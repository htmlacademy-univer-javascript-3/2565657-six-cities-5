import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer.ts';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, State} from './state.ts';

export const store = configureStore({reducer});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
