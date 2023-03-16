import React, {ReactElement} from "react";
import classes from './LinkBase.module.css';

export interface LinkBaseType {
    label: string,
    icon: ReactElement,
    style?: any,
}

const LinkBase = (props: LinkBaseType) => {
    return (
      <>
        <span className={classes.linkIcon} style={props.style}>
          {props.icon}
        </span>
        <label style={props.style}>{props.label}</label>
      </>
    );
}

export default LinkBase;