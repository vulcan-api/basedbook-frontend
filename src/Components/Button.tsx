import React from "react";
import classes from "./Button.module.css";

const Button = (props:any) => {
    return (
        <button type={props.type || "button"} placeholder={props.placeholder || "debiluZapomniałeśWpisać"} className={props.className === "alternate" ? classes.button + " " + classes.alternate : classes.button + " " + classes.default}>
            {props.buttonText}
        </button>
    )
}

export default Button;