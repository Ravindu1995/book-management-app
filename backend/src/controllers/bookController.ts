import { Request, Response } from "express";
import Book from "../models/Book";

// Get all books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// Get a single book
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// add a new book
export const createBook = async (req: Request, res: Response) => {
  const { title, author, genre, publicationDate } = req.body;

  const newBook = new Book({ title, author, genre, publicationDate });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });
    res.json(updatedBook);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
