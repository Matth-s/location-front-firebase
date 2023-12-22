import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

import authSlice from './features/auth-slice';
import materialSlice from './features/material-slice';
import modalSlice from './features/modal-slice';
import bookingSlice from './features/booking-slice';
import messagingSlice from './features/messaging-slice';

export const store = configureStore({
  reducer: {
    authSlice,
    materialSlice,
    modalSlice,
    bookingSlice,
    messagingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch =
  useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;
