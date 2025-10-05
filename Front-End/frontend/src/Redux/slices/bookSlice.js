import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { removeBookFromFavs } from "./favSlice";

export const fetchBooks = createAsyncThunk(
  "books/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/books");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Fetch failed" });
    }
  }
);

export const addBook = createAsyncThunk(
  "books/add",
  async (bookData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/books", bookData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Add failed" });
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/update",
  async (bookData, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/books/${bookData._id}`, bookData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Update failed" }
      );
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`/books/${id}`);
      dispatch(removeBookFromFavs(id));
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Delete failed" }
      );
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: { books: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Fetch failed";
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) state.books[index] = action.payload;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((b) => b._id !== action.payload);
      });
  },
});

export default booksSlice.reducer;
