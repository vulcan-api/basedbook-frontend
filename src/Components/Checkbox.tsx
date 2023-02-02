import React from "react";
import classes from "./Checkbox.module.css";

const Checkbox = (props:any) => {
    return (
        <div className={classes.checkboxFlex}>
            <input id="regulamin" type="checkbox" className={classes.checkbox}/>
            <label htmlFor="regulamin" className={classes.label}>{props.label || "nieDałeśLabela"}</label>
        </div>
    )
}

export default Checkbox;