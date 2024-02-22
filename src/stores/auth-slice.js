import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    reset: (state) => {
      state.name = null;
    }
  }
});

export const { setName, reset } = authSlice.actions;
export default authSlice.reducer;
