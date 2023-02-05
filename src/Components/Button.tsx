import React from "react";
import classes from "./Button.module.css";

const Button = (props:any) => {
    return (
        <button type={props.type || "button"} className={props.className === "alternate" ? classes.button + " " + classes.alternate : classes.button + " " + classes.default}>
            {props.buttonText || "debiluZapomniałeśWpisać"}
        </button>
    )
}

export default Button;