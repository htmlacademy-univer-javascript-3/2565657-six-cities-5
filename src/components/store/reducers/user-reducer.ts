import {AuthorizationStatus} from '../../enums/authorization-status.ts';
import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorization, setError} from '../actions/app-actions.ts';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
