import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/stores/auth-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});
