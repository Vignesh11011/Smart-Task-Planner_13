import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { setAuthToken } from '../lib/api';

export default function Navbar(){
  const { user, logout } = useAuth();
  function doLogout(){
    setAuthToken(null);
    logout();
  }
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">TaskPlanner</Link>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/planner" className="hover:underline">Planner</Link>
          {user ? (
            <>
              <span className="text-sm">{user.email}</span>
              <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={doLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="px-3 py-1 bg-indigo-600 text-white rounded">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
