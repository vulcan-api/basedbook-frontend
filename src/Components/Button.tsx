import React from "react";
import classes from "./Button.module.css";

export const classMgmt = (className: any) => {
    switch (className) {
      case "alternate":
        return classes.alternate;
      case "gray":
        return classes.gray;
      default:
        return classes.default;
    }
}

const Button = (props:any) => {
    return (
        <button type={props.type || "button"} className={classes.button + ' ' + classMgmt(props.className)} onClick={props.onClick} disabled={props.disabled}>
            {props.buttonText || "debiluZapomniałeśWpisać"}
        </button>
    )
}

export default Button;