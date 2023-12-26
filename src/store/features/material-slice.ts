import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { materialSchema } from '../../schema';

interface materialState {
  materials: materialSchema[];
  isLoading: boolean;
  error: boolean;
}

const initialState: materialState = {
  materials: [],
  isLoading: true,
  error: false,
};

const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    setMaterials: (
      state,
      action: PayloadAction<materialSchema[] | []>
    ) => {
      state.materials = action.payload;
      (state.error = false), (state.isLoading = false);
    },

    setNewMaterial: (
      state,
      action: PayloadAction<materialSchema>
    ) => {
      state.materials.push(action.payload);
    },

    setDeleteMaterial: (state, action: PayloadAction<string>) => {
      const filtredMaterials = state.materials.filter(
        (material) => material.id !== action.payload
      );

      state.materials = filtredMaterials;
    },

    setUpdateMaterial: (
      state,
      action: PayloadAction<materialSchema>
    ) => {
      const payloadMaterialPayload = action.payload;
      const filtredMaterials = state.materials.filter(
        (material) => material.id !== payloadMaterialPayload.id
      );

      state.materials = [...filtredMaterials, payloadMaterialPayload];
    },

    setLoadingMaterial: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setErrorMaterial: (state) => {
      state.error = true;
      state.isLoading = false;
    },
  },
});

export const {
  setMaterials,
  setNewMaterial,
  setDeleteMaterial,
  setUpdateMaterial,
  setErrorMaterial,
  setLoadingMaterial,
} = materialSlice.actions;

export default materialSlice.reducer;
