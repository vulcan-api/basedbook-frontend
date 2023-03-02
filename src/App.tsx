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
import School from './Sites/School/School';
import Grades from './Sites/School/Grades';
import RegisterVulcan from './Sites/User/RegisterVulcan';
import Exams from "./Sites/School/Exams";
import ComingSoon from './Layout/ComingSoon';

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <Register />,
  },
  {
    path: "/",
    element: <Main />,
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
        path: "project",
        element: <Project />,
      },
      {
        path: "project/add",
        element: <Addproject />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "settings/vulcan",
        element: <RegisterVulcan />,
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
  {
    path: "/school",
    element: <Main removeWrapper={true} />,
    children: [
      {
        path: "",
        element: <School />,
        children: [
          {
            path: "grades",
            element: <Grades />,
          },
          {
            path: "attendance",
            element: <ComingSoon />,
          },
          {
            path: "exams",
            element: <Exams />,
          },
          {
            path: "lessons",
            element: <ComingSoon />,
          },
          {
            path: "messages",
            element: <ComingSoon />,
          },
        ],
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
