import React from "react";
import classes from "./Button.module.css";

export const classMgmt = (className: any) => {
    switch(className) {
        case "alternate":
            return classes.alternate;
        default:
            return classes.default;
    }
}

const Button = (props:any) => {
    return (
        <button type={props.type || "button"} className={classes.button + ' ' + classMgmt(props.className)} onClick={props.onClick}>
            {props.buttonText || "debiluZapomniałeśWpisać"}
        </button>
    )
}

export default Button;