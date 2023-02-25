import React, {useEffect, useState} from "react";
import classes from "./Grades.module.css";
import Checkbox from "../../Components/Checkbox";
import LoadingSpinner from "../../Components/LoadingSpinner";
import ProjectItem from "../Project/ProjectItem";

const Exams = () => {
    const [exams, setExams] = useState<any[]>([]);
    const [isActive, setIsActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    function changeListTypeHandler(length: Number, id: Number) {
        setIsActive(!id);
    }

    useEffect(() => {

        getAllExams();
    }, []);

    async function getAllExams() {
        setIsLoading(true);
        try {
            await fetch("http://localhost:3000/school/exams?last=10", {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setExams(data));
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);

    }

    return (
        <>
            {!isLoading && (
                <div>
                    {exams.map((exam) => {
                        return (
                            <div key={exam.id}>
                                {exam.value}
                            </div>
                        );
                    })}
                </div>
            )}
            {isLoading && <LoadingSpinner/>}
        </>
    )
}

export default Exams;