import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../api/axios";

interface Book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

interface BooksState {
  books: Book[];
  status: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  status: false,
  error: null,
};

// fetching books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get("/books");
  return response.data;
});

// adding a book
export const addBook = createAsyncThunk(
  "books/addBook",
  async (newBook: Book) => {
    const response = await axios.post("/books", newBook);
    return response.data;
  }
);

// update a book
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (updatedBook: Book) => {
    const response = await axios.put(`/books/${updatedBook._id}`, updatedBook);
    return response.data;
  }
);

// deleting a book
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId: string) => {
    await axios.delete(`/books/${bookId}`);
    return bookId;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.status = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed to fetch books";
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
        const index = state.books.findIndex(
          (book) => book._id === action.payload._id
        );
        if (index >= 0) {
          state.books[index] = action.payload;
        }
      })
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
        state.books = state.books.filter((book) => book._id !== action.payload);
      });
  },
});

export const { actions, reducer } = booksSlice;
export default booksSlice.reducer;
export type { BooksState };
