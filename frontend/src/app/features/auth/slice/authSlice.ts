import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";

interface AuthState {
  email: string | null;
  token: string | null;
}

const initialState: AuthState = {
  email: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ email: string | null; token: string | null }>
    ) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logOut: (state) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.email;
export const selectCurrenUserToken = (state: RootState) => state.auth.token;

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
