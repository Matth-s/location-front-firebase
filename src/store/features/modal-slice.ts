import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { modalToOpen } from '../../schema';

interface modalSlice {
  modalToOpen: modalToOpen;
}

const initialState: modalSlice = {
  modalToOpen: 0,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalToOpen: (state, action: PayloadAction<modalToOpen>) => {
      state.modalToOpen = action.payload;
    },
  },
});

export const { setModalToOpen } = modalSlice.actions;

export default modalSlice.reducer;
