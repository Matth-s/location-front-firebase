import { createSlice } from '@reduxjs/toolkit';
import { bookingSchema } from '../../schema';
import { PayloadAction } from '@reduxjs/toolkit';

interface bookingState {
  bookings: bookingSchema[];
  isLoading: boolean;
  error: boolean;
}

const initialState: bookingState = {
  bookings: [],
  isLoading: true,
  error: false,
};

const bookingSlice = createSlice({
  name: 'booking slice',
  initialState,
  reducers: {
    setBooking: (state, action: PayloadAction<bookingSchema[]>) => {
      state.bookings = action.payload;
      state.isLoading = false;
    },

    setNewBooking: (state, action: PayloadAction<bookingSchema>) => {
      state.bookings.push(action.payload);
    },

    setDeleteBooking: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      const bookingsFiltred = state.bookings.filter(
        (booking) => booking.id !== id
      );

      state.bookings = bookingsFiltred;
    },

    setUpdateBooking: (
      state,
      action: PayloadAction<bookingSchema>
    ) => {
      const booking = action.payload;

      const bookingsFiltred = state.bookings.filter(
        (booking) => booking.id !== booking.id
      );

      state.bookings = [...bookingsFiltred, booking];
    },
  },
});

export const {
  setNewBooking,
  setBooking,
  setDeleteBooking,
  setUpdateBooking,
} = bookingSlice.actions;
export default bookingSlice.reducer;
