import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../utils/config";

const user = JSON.parse(localStorage.getItem("user"));

// Async thunk for get User from API
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (userdata, thunkAPI) => {
    try {
      const response = await axios.post(api + "/login", userdata);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: user ? user : null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = "Login Successfuly";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
