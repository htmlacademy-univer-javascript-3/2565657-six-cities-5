import {store} from './index.ts';
import {setError} from './actions/app-actions.ts';
import {clearError} from './actions/api-actions.ts';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearError());
};
