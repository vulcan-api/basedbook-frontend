import React from "react";
import classes from "../../../Components/SearchResult.module.css"
import * as Icon from "react-bootstrap-icons";

const ModalSearchResult = (props: any) => {
    return (
        <>
            <div className={classes.inliner} onClick={() => {props.onClick()}} style={{cursor: "pointer"}}>
                <div className={classes.avatar}>
                    <img className={classes.avImage} src={props.image} alt="" />
                </div>
                <div>
                    <p className={classes.name}>{props.name}</p>
                </div>
                <Icon.PlusCircleFill className={classes.addIcon} style={{color: "var(--main-500)"}}/>
            </div>
        </>
    )
}

export default ModalSearchResult