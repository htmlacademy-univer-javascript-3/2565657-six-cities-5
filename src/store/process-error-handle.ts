import {store} from './index.ts';
import {setError} from './actions.ts';
import {clearError} from './api-actions.ts';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearError());
};
