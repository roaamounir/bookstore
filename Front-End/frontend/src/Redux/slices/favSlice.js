import { createSlice } from "@reduxjs/toolkit";

const favItemsFromStorage = JSON.parse(localStorage.getItem("favItems")) || [];

const initialState = {
  favItems: favItemsFromStorage,
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    addToFav: (state, action) => {
      const exists = state.favItems.find((b) => b._id === action.payload._id);
      if (!exists) {
        state.favItems.push(action.payload);
        localStorage.setItem("favItems", JSON.stringify(state.favItems));
      }
    },
    removeFromFav: (state, action) => {
      state.favItems = state.favItems.filter((b) => b._id !== action.payload);
      localStorage.setItem("favItems", JSON.stringify(state.favItems));
    },
    removeBookFromFavs: (state, action) => {
      state.favItems = state.favItems.filter((b) => b._id !== action.payload);
      localStorage.setItem("favItems", JSON.stringify(state.favItems));
    },
  },
});

export const { addToFav, removeFromFav, removeBookFromFavs } = favSlice.actions;
export default favSlice.reducer;
