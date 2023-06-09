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
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for get User from API
export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (userdata, thunkAPI) => {
    try {
      const response = await axios.post(api + "/users", userdata);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
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
  reducers: {
    resetMessageUser: (state) => {
      state.error = null;
      state.success = null;
    },
    userLogout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //LOGIN
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = "Login Successfuly";
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //REGISTER
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = "Registered Successfuly";
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessageUser, userLogout } = userSlice.actions;
export default userSlice.reducer;
