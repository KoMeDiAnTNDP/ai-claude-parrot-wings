import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.error = null;
      localStorage.setItem('token', action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, setError, logout } = authSlice.actions;
export default authSlice.reducer;