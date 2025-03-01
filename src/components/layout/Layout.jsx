import React from 'react';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex flex-1 pt-[60px] justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
