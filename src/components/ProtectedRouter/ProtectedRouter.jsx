import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRouter({ children }) {
  // استخدام js-cookie لفحص وجود الـ access token في الكوكيز
  if (Cookies.get('userToken')) {
    return <>{children}</>;
  } else {
    return <Navigate to="/Login" />;
  }
}

export default ProtectedRouter;
