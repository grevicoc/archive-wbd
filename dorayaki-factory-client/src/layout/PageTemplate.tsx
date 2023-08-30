import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/common/layout/Footer';
import Header from '../components/common/layout/Header';
import ProtectRoute from '../components/common/layout/ProtectRoute';

const Layout = () => {
  return (
    <ProtectRoute>
      <div className="antialiased w-full">
        <Header />
        <div id="page" className="min-h-screen container mx-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </ProtectRoute>
  );
};

export default Layout;
