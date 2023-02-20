import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import classes from "./Main.module.css";
import { useNavigate } from "react-router-dom";


const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetchPosts();
  });

  const fetchPosts = async () => {
    await fetch("http://localhost:3000/spotted/post", {
      method: "GET",
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error('chuj cie to');
        return res;
      })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        navigate("/auth/login");
      });
  }

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

export default Main;
