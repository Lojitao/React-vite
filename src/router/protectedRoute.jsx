//管理路由權限
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from '@/utils';

const ProtectedRoute = ({ children }) => {
  const token = getCookie('token');
  
  // 若無 token，跳轉到登入頁
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children; // 若有 token，顯示子路由
};

export default ProtectedRoute;