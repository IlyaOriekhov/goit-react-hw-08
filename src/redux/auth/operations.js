import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  clearAuthHeader,
  instance,
  setAuthHeaders,
} from "../../services/instance";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      const { data } = await instance.post("users/login", userData);
      setAuthHeaders(data.token);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const { data } = await instance.post("users/signup", userData);
      setAuthHeaders(data.token);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await instance.post("users/logout");
    clearAuthHeader();
  } catch (err) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setAuthHeaders(token);
      const { data } = await instance.get("users/current");
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;

      if (token) return true;

      return false;
    },
  }
);
