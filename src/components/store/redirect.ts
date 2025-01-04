import {Middleware, PayloadAction} from '@reduxjs/toolkit';
import {ActionRouter} from './action-router/action-router.ts';
import browserHistory from './browser-history.ts';
import {combinedReducer} from './index.ts';

type Reducer = ReturnType<typeof combinedReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === ActionRouter.RedirectToRoute.toString()) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
