import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Layout({ user, setUser }) {
  const navigate = useNavigate();

  function logOut() {
    // استخدام js-cookie لإزالة قيمة الـ access token من الكوكيز
    Cookies.remove('userToken');
    setUser(null);
    navigate('/Login');
  }

  return (
    <>
      <Navbar user={user} logOut={logOut} />
      <div className="container">
        <Outlet> </Outlet>
      </div>
    </>
  );
}
