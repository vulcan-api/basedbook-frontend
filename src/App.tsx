import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Sites/auth/Login/Login';
import Auth from './Sites/auth/Auth';

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  }, 
  {
    path: "/auth/login",
    element: <Login />
  },
  {
    path: "/auth/signup",
    element: <Login />
  }
]);


function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
  
}

export default App;
