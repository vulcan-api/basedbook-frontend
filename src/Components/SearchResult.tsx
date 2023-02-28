import React from "react";
import { Link } from "react-router-dom";
import classes from "./SearchResult.module.css";

const SearchResult = (props: {id: number, name: string, image: string, onClick: Function}) => {
    return (
        <>
            <Link to={`/profile/${props.id}`} className={classes.inliner} onClick={() => {props.onClick()}}>
                <div className={classes.avatar}>
                    <img className={classes.avImage} src={props.image} alt="" />
                </div>
                <div>
                    <p className={classes.name}>{props.name}</p>
                </div>
            </Link>
        </>
    )
}

export default SearchResult;