import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from '../store';

export interface viewTypeState {
  value: 'grid' | 'list';
}

const initialState: viewTypeState = {
  value: 'grid',
};

export const viewTyeSlice = createSlice({
  name: 'view',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setView: (state, action: PayloadAction<viewTypeState>) => {
      state.value = action.payload.value;
    },
  },
});

export const { setView } = viewTyeSlice.actions;

export const getViewType = (state: AppState) => state.view.value;

export default viewTyeSlice.reducer;
