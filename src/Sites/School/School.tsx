import React, { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SchoolSidebar";
import classes from "./School.module.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
//@ts-ignore
import {NotificationManager} from "react-notifications";

const School = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(window.location.pathname == '/school')
          navigate("/school/grades");
  },[navigate])
  return (
    <>
      <div className={classes.flexRow}>
        <Sidebar />
        <div className={classes.wrapper}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default School;