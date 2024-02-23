import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : {}
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites[action.payload] = true;
    },
    removeFavorite: (state, action) => {
      delete state.favorites[action.payload];
    }
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
