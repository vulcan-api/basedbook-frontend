import React from "react";
import classes from "../../../Components/SearchResult.module.css"
import * as Icon from "react-bootstrap-icons";
import Avatar from "../../../Components/Avatar";

const ModalSearchResult = (props: any) => {
    return (
        <>
            <div className={classes.inliner} onClick={() => {props.onClick()}} style={{cursor: "pointer"}}>
                <div className={classes.avatar}>
                    <Avatar userId={props.id}/>
                </div>
                <div>
                    <p className={classes.name}>{props.name}</p>
                </div>
                <div className={classes.inlinerAdd}>
                    <Icon.PlusCircleFill className={classes.addIcon} style={{color: "var(--main-500)"}}/>
                    <p>Dodaj użytkownika</p>
                </div>
            </div>
        </>
    )
}

export default ModalSearchResult