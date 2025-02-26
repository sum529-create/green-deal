import React from 'react';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
