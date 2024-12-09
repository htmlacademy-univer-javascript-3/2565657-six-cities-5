import {Middleware, PayloadAction} from '@reduxjs/toolkit';
import {ActionRouter} from './action-router.ts';
import browserHistory from './browser-history.ts';
import {reducer} from './reducer.ts';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === ActionRouter.RedirectToRoute.toString()) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
