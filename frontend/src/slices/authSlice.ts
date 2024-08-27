import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

//recheck
export interface UserLogged {
  id: string;
  email: string;
  name: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
}

interface AuthState {
  token: string | null;
  user: UserLogged | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

// user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: { username: string; email: string; password: string }) => {
    console.log(userData);
    const response = await axios.post("/auth/register", userData);
    return response.data;
  }
);

//user authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: UserLogged }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to register user";
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export type { AuthState };
