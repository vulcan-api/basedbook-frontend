import React, { useState } from "react";
import classes from "./Grades.module.css";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Checkbox from "../../Components/Checkbox";

const Grades = () => {
    const [isActive, setIsActive] = useState(true);
    const [grades, setGrades] = useState([

    ]);

    const [listType, setListType] = useState({
        width: "40%",
    });

    function changeListTypeHandler(length: Number, id: Number) {
        setIsActive(!id);
        setListType({
            width: length + "%",
        });
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
            <div>

            </div>
        </>
    )
}

export default Grades;