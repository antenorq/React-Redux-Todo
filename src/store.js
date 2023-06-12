import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
  },
});

export default store;
