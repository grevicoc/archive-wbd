import React from 'react';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="antialiased w-full">
      <div className="min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
