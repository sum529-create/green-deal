import React from 'react';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  // 원래는 true지만 접근을 위해 false로 설정
  const [isLogin, setIsLogin] = useState(false);

  return isLogin ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
