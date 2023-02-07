import React from 'react';
import classes from "./Wrapper.module.css";

const Wrapper = (props:any) => {
    return (
        <div className={`${classes.wrapper} ${props.className}`} style={props.style}>
            {props.children}
        </div>
    )
}

export default Wrapper;