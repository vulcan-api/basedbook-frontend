import React from "react";
import { Link } from "react-router-dom";
import classes from "./SearchResult.module.css";
import Avatar from "./Avatar";

const SearchResult = (props: {id: number, name: string, onClick: Function}) => {
    return (
        <>
            <Link to={`/profile/${props.id}`} className={classes.inliner} onClick={() => {props.onClick()}}>
                <div className={classes.avatar}>
                    <Avatar userId={props.id} />
                </div>
                <div>
                    <p className={classes.name}>{props.name}</p>
                </div>
            </Link>
        </>
    )
}

export default SearchResult;