import { createSlice } from '@reduxjs/toolkit'

interface UiState {
  isSearchLoading: boolean;
  error: string | null;
}

const initialState: UiState = {
  isSearchLoading: false,
  error: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isSearchLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = uiSlice.actions;
export default uiSlice.reducer;