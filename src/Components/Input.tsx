import React from "react";
import classes from "./Input.module.css";

const Input = (props:any) => {
    return (
        <input type={props.type || "text"} placeholder={props.placeholder || "debiluZapomniałeśWpisać"} className={props.className === "alternate" ? classes.input + " " + classes.alternate : classes.input + " " + classes.default} />
    )
}

export default Input;