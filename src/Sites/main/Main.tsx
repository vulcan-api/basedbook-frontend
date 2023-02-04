import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Layout/Sidebar";
import classes from "./Main.module.css";

const Main = () => {
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