import React, {useEffect, useState, useCallback} from "react";
import classes from "./Grades.module.css";
import LoadingSpinner from "../../Components/LoadingSpinner";
// @ts-ignore
import {NotificationManager} from "react-notifications";
import {useNavigate} from "react-router-dom";

const Grades = () => {
    const [grades, setGrades] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const getAllGrades = useCallback(async function () {
        setIsLoading(true);
        const gradesFetch = await fetch("http://localhost:3000/school/grades", {
            method: "GET",
            credentials: "include",
        });

        if (gradesFetch.status === 200) {
            setGrades(await gradesFetch.json());
        } else {
            NotificationManager.error(
                "Połącz swój dziennik w ustawieniach!",
                "Błąd!",
                3000
            );
            navigate("/");
        }
        setIsLoading(false);
    }, [navigate]);

    useEffect(() => {
        getAllGrades();
    }, [getAllGrades]);

    return (
        <>
            {/*
              <div className={classes.menu}>
        <Checkbox
          className={isActive ? "" : classes.active}
          type="radio"
          name="periodSwitch"
          id="firstPeriod"
          label="Okres 1"
          onClick={() => changeListTypeHandler(1)}
        />
        <Checkbox
          className={isActive ? classes.active : ""}
          type="radio"
          name="periodSwitch"
          id="secondPeriod"
          label="Okres 2"
          onClick={() => changeListTypeHandler(0)}
          defaultChecked
        />
      </div>

      */}
            {!isLoading && (
                <div>
                    {Object.keys(grades).map((subject: any) => {
                        return (
                            <div key={subject} className={classes.subject}>
                                {subject + ": "}
                                {grades[subject].map((grade1: any) => {
                                    return <span key={grade1.id}>{grade1.grade} </span>;
                                })}
                            </div>
                        );
                    })}
                </div>
            )}
            {isLoading && <LoadingSpinner/>}
        </>
    );
};

export default Grades;
