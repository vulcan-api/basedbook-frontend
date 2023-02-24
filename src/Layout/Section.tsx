import React from "react";
import classes from "./Section.module.css"

const Section = (props:any) => {
    return (
        <div className={`${classes.section} ${props.className}`} style={props.style}>
            {props.children}
        </div>
    )
}

export default Section;