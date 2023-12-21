import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface AuthState {
  id: number | null;
  name: string | null;
  role: number | null;
  token: string | null;
  color: string | null;
}

const initialState: AuthState = {
  id: null,
  name: null,
  role: null,
  token: null,
  color: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: action.payload.id,
          name: action.payload.name,
          role: action.payload.role,
          token: action.payload.token,
          color: action.payload.color,
        })
      );

      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.color = action.payload.color;
    },
  },
});

export const selectAuth = (state: RootState): AuthState => state.auth;
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
