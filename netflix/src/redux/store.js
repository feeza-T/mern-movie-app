// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    app: userReducer
    // Add other reducers here if any
  }
});

export default store;
