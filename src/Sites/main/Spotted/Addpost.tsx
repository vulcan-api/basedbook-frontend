import React from "react";
import classes from "./Addpost.module.css";
import Checkbox from "../../../Components/Checkbox";
import Button from "../../../Components/Button";
import { useState } from "react";

const Addpost = () => {
    const [dateHourAuto, setDateHourAuto] = useState(true);
    function disableTimeAndDate() {
        setDateHourAuto(!dateHourAuto);
    }

    return (
    <>
        <h1 className={classes.h1}>Dodaj post</h1>
        <form className={classes.addForm}>
            <textarea id="post_value" placeholder="Treść posta"/>
            <div className={classes.postOptions}>
                <Checkbox id="anonimowyPost" label="Anonimowy post"/>
                <Checkbox id="zezwolNaKom" label="Zezwól na komentarze"/>
                <Checkbox id="dataIGodzina" label="Obecna data i godzina" onChange={disableTimeAndDate} checked={dateHourAuto}/>
                <input type="date" name="data" id="data" disabled={dateHourAuto}/>
                <input type="time" name="godzina" id="godzina" disabled={dateHourAuto}/>
                <Button buttonText="Dodaj post" />
            </div>
        </form>
    </>
    );
}

export default Addpost;