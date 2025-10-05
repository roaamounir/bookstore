import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import booksReducer from "./slices/bookSlice";
import favReducer from "./slices/favSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    favs: favReducer,
    cart: cartReducer, 
  },
});

export default store;
