import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


function Navbar() {
  //const { user } = useSelector((state: RootState) => state.auth);

  const user = localStorage.getItem('user');
  return (
    <nav className="bg-blue-400 p-4 flex items-center justify-between">
      <h1 className="text-black text-2xl font-bold">Book Management</h1>
      <div className="flex items-center">
        <span className="text-white mr-3">{user}</span>
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white">
          {user?.charAt(0).toUpperCase()}
        </div>
      </div>
    </nav>
  );
}

export default Navbar