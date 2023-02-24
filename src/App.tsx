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
import Profile from './Sites/User/Profile';
//@ts-ignore
import {NotificationContainer} from "react-notifications";
import Project from "./Sites/Project/Project";
import Addproject from "./Sites/Project/Addproject";
import ProfileRedirect from './Sites/User/ProfileRedirect';
import Settings from './Sites/User/Settings';

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
        element: <Homepage />,
      },
      {
        path: "spotted",
        element: <Spotted />,
      },
      {
        path: "spotted/add",
        element: <Addpost />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "profile",
        element: <ProfileRedirect />,
      },
      {
        path: "profile/:userId",
        element: <Profile />,
      },
    ],
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
