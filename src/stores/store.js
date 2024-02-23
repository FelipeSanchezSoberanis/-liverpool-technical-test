import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/stores/auth-slice";
import favoritesReducer from "@/stores/favorites-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer
  }
});
