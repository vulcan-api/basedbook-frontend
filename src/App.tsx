import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Sites/auth/Login/Login';
import Auth from './Sites/auth/Auth';
import Register from './Sites/auth/Register/Register';
import Main from './Sites/Main';
import Homepage from './Sites/Homepage/Homepage';
import Spotted from './Sites/Spotted/Spotted';
import Addpost from './Sites/Spotted/Addpost';
//@ts-ignore
import {NotificationContainer} from "react-notifications";
import Project from "./Sites/Project/Project";
import Addproject from "./Sites/Project/Addproject";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth/>,
  },
  {
    path: "/auth/login",
    element: <Login/>
  },
  {
    path: "/auth/signup",
    element: <Register/>
  },
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        path: "",
        element: <Homepage/>
      },
      {
        path: "spotted",
        element: <Spotted/>
      },
      {
        path: "spotted/add",
        element: <Addpost/>
      },
    ]
  },

  {
    path: "/",
    element: <Main/>,
    children: [
      {
        path: "",
        element: <Homepage/>
      },
      {
        path: "project",
        element: <Project/>
      },
      {
        path: "project/add",
        element: <Addproject/>
      },
    ]
  },
]);


function App() {
  return (
      <>
        <NotificationContainer/>
        <RouterProvider router={router}/>
      </>
  );

}

export default App;
