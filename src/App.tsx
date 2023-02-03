import React from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from './Sites/auth/Login/Login';
import Auth from './Sites/auth/Auth';
import Sidebar from './Layout/Sidebar';
import Register from './Sites/auth/Register/Register';

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
    element: <Register />
  },
  {
    path: "/",
    element: <div><Sidebar /><Outlet/></div>,
    children: [
    {
      path: "poo",
      element: <div></div>
    }]
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
