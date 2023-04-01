// localStorageMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === 'auth/setToken' || action.type === 'auth/clearToken') {
    localStorage.setItem('token', JSON.stringify(store.getState().auth.token));
  }
  return result;
};