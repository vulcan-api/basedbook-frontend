import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import classes from "./Main.module.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();
    useEffect(() => {
        try {
          fetch("http://localhost:3000/spotted/post", {
            method: "GET",
            credentials: "include",
          })
            .then((res) => res.json())
            .then(console.log);
        } catch (error) {
          navigate("/auth");
        }
    }, []);

    return (
        <>
            <div className={classes.flexRow}>
                <Sidebar />
                <div className={classes.wrapper}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Main;