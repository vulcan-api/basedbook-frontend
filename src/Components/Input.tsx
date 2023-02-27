import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props:any, ref) => {
    return (
        // @ts-ignore
        <input type={props.type || "text"} ref={ref} onChange={props.onChange} placeholder={props.placeholder || "debiluZapomniałeśWpisać"} className={props.className === "alternate" ? classes.input + " " + classes.alternate : classes.input + " " + classes.default} />
    )
});

export default Input;