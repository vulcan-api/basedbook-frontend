import React, {ReactElement} from "react";
import classes from './LinkBase.module.css';

export interface LinkBaseType {
    label: string,
    icon: ReactElement,
}

const LinkBase = (props: LinkBaseType) => {
    return (
        <>
            <span className={classes.linkIcon}>{props.icon}</span>
            <span>{props.label}</span>
        </>
    )
}

export default LinkBase;