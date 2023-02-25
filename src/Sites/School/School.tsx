import React, { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SchoolSidebar";
import classes from "./School.module.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
//@ts-ignore
import {NotificationManager} from "react-notifications";

const School = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    await fetch("http://localhost:3000/spotted/post", {
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
        NotificationManager.error(
          "Nie udało się zalogować. Sprawdź poprawność danych",
          "Nie zalogowano",
          3000
        );
        return;
      });
      setIsLoading(false);
  }, [navigate]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      {!isLoading &&
      <div className={classes.flexRow}>
        <Sidebar />
        <div className={classes.wrapper}>
          <Outlet />
        </div>
      </div>
      }
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default School;