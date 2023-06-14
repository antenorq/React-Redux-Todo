import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../utils/config";

const items = JSON.parse(localStorage.getItem("items"));

// Async thunk for get todos from the API
export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (user_id, thunkAPI) => {
    try {
      const response = await axios.get(api + "/todo?user_id=" + user_id);
      if (response.data) {
        localStorage.setItem("items", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for add a new todo
export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await axios.post(api + "/todo", todo);
  return response.data;
});

// Async thunk for edit an existing todo
export const editTodo = createAsyncThunk("todos/editTodo", async (todo) => {
  const response = await axios.put(api + "/todo/" + todo.id, todo);
  return response.data;
});

// Async thunk for deleting an existing todo
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(api + "/todo/" + id);
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: items ? items : [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetMessageTodo: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //getTodos/////////////////
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        //state.success = "LOADED SUCCESSFULLY";
        state.error = null;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //addTodo////////////////////
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.success = "ADDED SUCCESSFULLY";
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editTodo.pending, (state) => {
        state.loading = true;
      })
      //editTodo////////////////////
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
          state.success = "EDITED SUCCESSFULLY";
          state.error = null;
        }
        localStorage.setItem("items", JSON.stringify(state.items));
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //deleteTodo////////////////////
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.success = "DELETED SUCCESSFULLY";
        state.error = null;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetMessageTodo } = todoSlice.actions;
export default todoSlice.reducer;
