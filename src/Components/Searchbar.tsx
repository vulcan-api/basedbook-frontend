import React from "react";
import classes from './Searchbar.module.css';
import Input from "../Components/Input";

const Searchbar = () => {
    return (
        <>
            <div className={classes.searchCont}>
                <Input placeholder={'Szukaj'}/>
            </div>
        </>
    )
}

export default Searchbar;