import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { messagingSchema } from '../../schema';

interface messagingState {
  messagings: messagingSchema[];
  isLoading: boolean;
  error: boolean;
}

const initialState: messagingState = {
  messagings: [],
  isLoading: true,
  error: false,
};

const messagingSlice = createSlice({
  name: 'messaging',
  initialState,
  reducers: {
    setMessaging: (
      state,
      action: PayloadAction<messagingSchema[]>
    ) => {
      state.messagings = action.payload;
      state.isLoading = false;
      state.error = false;
    },

    setMessagingError: (state, action: PayloadAction<true>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    setUpdateMessaging: (
      state,
      action: PayloadAction<messagingSchema>
    ) => {
      const messagingPayload = action.payload;

      const messagingsFiltred = state.messagings.filter(
        (messaging) => messaging.id !== messagingPayload.id
      );

      state.messagings = [...messagingsFiltred, messagingPayload];
    },

    setDeleteMessaging: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      const messagingsFiltred = state.messagings.filter(
        (messaging) => messaging.id !== id
      );

      state.messagings = messagingsFiltred;
    },
  },
});

export const {
  setMessaging,
  setMessagingError,
  setUpdateMessaging,
  setDeleteMessaging,
} = messagingSlice.actions;
export default messagingSlice.reducer;
