import React from "react";
import classes from "./Input.module.css";

const Textarea = React.forwardRef((props:any, ref) => {
    return (
        // @ts-ignore
        <textarea type={props.type || "text"} ref={ref} placeholder={props.placeholder || "debiluZapomniałeśWpisać"} className={props.className === "alternate" ? classes.input + " " + classes.alternate : classes.input + " " + classes.default} />
    )
});

export default Textarea;