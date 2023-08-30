import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  opacity-75 flex flex-col items-center justify-center">
      <h1 className="text-center text-cyan-900 text-xl font-semibold">404 Not Found</h1>
      <p className="w-1/3 text-center text-cyan-900">The page you are looking for is not here</p>
      <Link to="/">Go back to index</Link>
    </div>
  );
};

export default NotFound;
