import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { BooksState, deleteBook } from "../slices/booksSlice";
import ConfirmDeleteModal from './ConfirmDeleteModal';
import EditBookModal from './EditBookModal';

function BookList() {
  const dispatch = useDispatch<AppDispatch>();
  const booksState = useSelector((state: RootState) => state.books);
  const { books, status, error } = booksState as BooksState;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedBook, setSelectedBook] = useState<{
    id: string;
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
  } | null>(null);

  const handleEditClick = (book: {
    id: string;
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
  }) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setBookToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      dispatch(deleteBook(bookToDelete));
      setBookToDelete(null);
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBookToDelete(null);
  };

  if (status) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <div key={book._id} className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">{book.title}</h2>
          <p className="text-gray-700 mb-2">Author: {book.author}</p>
          <p className="text-gray-700 mb-4">Genre: {book.genre}</p>
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
              View
            </button>
            <button className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600" onClick={() => handleEditClick(book as any)}>
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(book._id as any)}
              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
            >
              Delete
            </button>

          </div>
        </div>
      ))}
      {selectedBook && (
        <EditBookModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          book={selectedBook}
        />
      )}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default BookList;
