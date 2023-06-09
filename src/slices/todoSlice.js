import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../utils/config";

// Async thunk for fetching todos from the API
export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const response = await axios.get(api + "/todo");
  return response.data;
});

// Async thunk for creating a new todo
export const createTodo = createAsyncThunk("todos/createTodo", async (todo) => {
  const response = await axios.post("/api/todos", todo);
  return response.data;
});

// Async thunk for updating an existing todo
export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  const response = await axios.put(`/api/todos/${todo.id}`, todo);
  return response.data;
});

// Async thunk for deleting a todo
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`/api/todos/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
