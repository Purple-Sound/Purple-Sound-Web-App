import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/authentication/slice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
