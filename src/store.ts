import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authentication/slice';
import { localStorageMiddleware } from './features/authentication/localstorage-middleware';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
