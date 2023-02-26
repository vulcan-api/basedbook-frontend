import React, {useEffect, useState} from "react";
import classes from "./Grades.module.css";
import Checkbox from "../../Components/Checkbox";
import LoadingSpinner from "../../Components/LoadingSpinner";

const Grades = () => {
    const [grades, setGrades] = useState<any[]>([]);
    const [isActive, setIsActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    function changeListTypeHandler(length: Number, id: Number) {
        setIsActive(!id);
    }

    useEffect(() => {

        getAllGrades();
    }, []);

    async function getAllGrades() {
        setIsLoading(true);
        try {
            await fetch("http://localhost:3000/school/grades", {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setGrades(data.grades));
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);

    }

    return (
        <>
            <div className={classes.menu}>
                <Checkbox
                    className={isActive ? "" : classes.active}
                    type="radio"
                    name="periodSwitch"
                    id="firstPeriod"
                    label="Okres 1"
                    onClick={() => changeListTypeHandler(100, 1)}
                />
                <Checkbox
                    className={isActive ? classes.active : ""}
                    type="radio"
                    name="periodSwitch"
                    id="secondPeriod"
                    label="Okres 2"
                    onClick={() => changeListTypeHandler(40, 0)}
                    checked
                />
            </div>
            {!isLoading && (
                <div>
                    {grades.map((grade) => {
                        return (
                            <div key={grade.id}>
                                {grade.value}
                            </div>
                        );
                    })}
                </div>
            )}
            {isLoading && <LoadingSpinner/>}
        </>
    )
}

export default Grades;