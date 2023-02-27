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
                .then((data) => {
                    setGrades((data))
                });
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
        console.log(grades);

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
                    defaultChecked
                />
            </div>
            {!isLoading && (
                <div>
                    {Object.keys(grades).map((subject: any) => {
                        return (
                            <div key={subject}>
                                <p>{subject}:
                                    {grades[subject].map((grade1: any) => {
                                        return (
                                            <p>
                                                {grade1.grade}
                                            </p>
                                        )
                                    })}
                                </p>
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