import React from "react";
import classes from "./SearchResult.module.css";

const SearchResult = (props: {name: string, image: string}) => {
    return (
        <>
            <div className={classes.inliner}>
                <div className={classes.avatar}>
                    <img className={classes.avImage} src={props.image} alt="" />
                </div>
                <div>
                    <p className={classes.name}>{props.name}</p>
                </div>
            </div>
        </>
    )
}

export default SearchResult;