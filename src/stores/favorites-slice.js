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
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavorite: (state, action) => {
      delete state.favorites[action.payload];
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    }
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
