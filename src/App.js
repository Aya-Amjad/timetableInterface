import React, { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Layout from './components/Layout/Layout.jsx';
import Background from './components/Background/Background.jsx';
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter.jsx';
import GenerateTimetable from './components/GenerateTimetable/GenerateTimetable.jsx';
import AddProfessor from './components/Professor/AddProfessor.jsx';
import Updateprofessor from './components/Professor/Updateprofessor.jsx';
import Addroom from './components/Room/Addroom.jsx';
import Updateroom from './components/Room/Updateroom.jsx';
import Addcourse from './components/Course/Addcourse.jsx';
import Updatecourse from './components/Course/Updatecourse.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import CreateProfessor from './components/Professor/CreateProfessor.jsx';
import Createroom from './components/Room/Createroom.jsx';
import Createcourse from './components/Course/Createcourse.jsx';
import Cookies from 'js-cookie';

export default function App() {
  const [user, setUser] = useState(null);

  function saveCurrentUser() {
    const token = Cookies.get('userToken'); // استخدام js-cookie لاسترجاع قيمة الـ access token من الكوكيز
    const decode = jwtDecode(token);
    setUser(decode);
  }

  useEffect(() => {
    if (Cookies.get('userToken')) {
      saveCurrentUser();
    }
  }, []);
  const routers = createBrowserRouter([
    {
      path: '',
      element: (
        <Layout user={user} setUser={setUser}>
          <Background user={user} />
        </Layout>
      ),
      children: [
        { index: true, element: <Background user={user} /> },
        { path: 'Addprofessor', element: <ProtectedRouter><AddProfessor /></ProtectedRouter> },
        { path: 'Updatprofessor/:id', element: <ProtectedRouter><Updateprofessor /></ProtectedRouter> },
        { path: 'Addroom', element: <ProtectedRouter><Addroom /></ProtectedRouter> },
        { path: 'GenerateTimetable', element: <ProtectedRouter><GenerateTimetable /></ProtectedRouter> },
        { path: 'Updateroom/:id', element: <ProtectedRouter><Updateroom /></ProtectedRouter> },
        { path: 'Addcourse', element: <ProtectedRouter><Addcourse /></ProtectedRouter> },
        { path: 'Updatecourse/:id', element: <ProtectedRouter><Updatecourse /></ProtectedRouter> },
        { path: 'Login', element: <Login saveCurrentUser={saveCurrentUser} /> },
        { path: 'Addprofessor/CreateProfessor', element: <ProtectedRouter><CreateProfessor /></ProtectedRouter> },
        { path: 'Addroom/Createroom', element: <ProtectedRouter><Createroom /></ProtectedRouter> },
        { path: 'Addcourse/Createcourse', element: <ProtectedRouter><Createcourse /></ProtectedRouter> },
        { path: 'Signup', element: <Signup /> },
        { path: 'Readprofessor/:id/' },
      ],
    },
  ]);

  return (
    <RouterProvider router={routers}></RouterProvider>
  );
}
