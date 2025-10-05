import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  cartItems: cartItemsFromStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartItem: (state, action) => {
      const exists = state.cartItems.find((b) => b._id === action.payload._id);
      if (exists) {
        state.cartItems = state.cartItems.filter((b) => b._id !== action.payload._id);
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((b) => b._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      state.cartItems = state.cartItems.map((b) =>
        b._id === id ? { ...b, quantity } : b
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { toggleCartItem, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
