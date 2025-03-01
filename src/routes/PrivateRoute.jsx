import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/userStore';

const PrivateRoute = () => {
  const isLogin = useUserStore((state) => state.isLogin);

  return isLogin ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
