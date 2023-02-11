import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice
  },
  devTools: process.env.REACT_APP_NODE_ENV === 'development',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
