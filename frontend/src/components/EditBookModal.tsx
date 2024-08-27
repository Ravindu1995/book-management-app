import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateBook } from '../slices/booksSlice';
import { AppDispatch } from '../store/store';

interface EditBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    book: {
        id: string;
        title: string;
        author: string;
        genre: string;
        publicationDate: string;
    } | null;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ isOpen, onClose, book }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [publicationDate, setPublicationDate] = useState('');

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setAuthor(book.author);
            setGenre(book.genre);
            const formattedDate = new Date(book.publicationDate).toISOString().split('T')[0];
            setPublicationDate(formattedDate);
        }
    }, [book]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(book);
        if (book) {
            dispatch(updateBook({ ...book, title, author, genre, publicationDate }));
            onClose();
        }
    };

    if (!isOpen || !book) return null;

    return (
        <>
            <div
                id="crud-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-4 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">Edit Book</h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                            onClick={onClose}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Type book title"
                                    required
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Type author name"
                                    required
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="genre" className="block mb-2 text-sm font-medium text-gray-900">Genre</label>
                                <input
                                    type="text"
                                    id="genre"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Type book genre"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="publicationDate" className="block mb-2 text-sm font-medium text-gray-900">Publication Date</label>
                                <input
                                    type="date"
                                    id="publicationDate"
                                    value={publicationDate}
                                    onChange={(e) => setPublicationDate(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Update Book
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditBookModal;
