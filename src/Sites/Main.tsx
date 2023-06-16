import React, { useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import classes from "./Main.module.css";
import { useNavigate } from "react-router-dom";

const Main = (props: {removeWrapper?: boolean}) => {
  const navigate = useNavigate();
  const fetchPosts = useCallback(async () => {
    await fetch(`${process.env.REACT_APP_REQUEST_URL}/spotted/post`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error('nie zalogowano');
        return res;
      })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        navigate("/auth/login");
        return;
      });
  }, [navigate]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <div className={classes.flexRow}>
        <Sidebar />
        {props.removeWrapper && <Outlet />}
        {!props.removeWrapper && (
        <div className={classes.wrapper}>
          <Outlet />
        </div>
        )}
      </div>
    </>
  );
};

export default Main;
