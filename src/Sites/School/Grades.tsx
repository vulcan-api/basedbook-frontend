import React, { useState } from "react";
import classes from "./Grades.module.css";
import Checkbox from "../../Components/Checkbox";

const Grades = () => {
    const [isActive, setIsActive] = useState(true);

    function changeListTypeHandler(length: Number, id: Number) {
        setIsActive(!id);
    }

    return (
        <>
            <div className={classes.menu}>
                <Checkbox 
                    className={isActive ? "" : classes.active}
                    radio={true}
                    name="periodSwitch"
                    id="firstPeriod"
                    label="Okres 1"
                    onClick={() => changeListTypeHandler(100, 1)}
                />
                <Checkbox 
                    className={isActive ? classes.active : ""}
                    radio={true}
                    name="periodSwitch"
                    id="secondPeriod"
                    label="Okres 2"
                    onClick={() => changeListTypeHandler(40, 0)}
                />
            </div>
        </>
    )
}

export default Grades;