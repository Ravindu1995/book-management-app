import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../slices/booksSlice";
import { AppDispatch } from "../store/store";
import Navbar from "../components/Navbar";
import BookList from "../components/BookList";
import AddBookModal from "../components/AddBookModal";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className=" mx-auto p-4 flex items-center ">
        <AddBookModal />
      </div>
      <div className="p-4">
        <BookList />
      </div>
    </div>
  );
};

export default Home;
