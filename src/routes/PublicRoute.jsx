import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/userStore';

const PublicRoute = () => {
  const isLogin = useUserStore((state) => state.isLogin);

  return isLogin ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
