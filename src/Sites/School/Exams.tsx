import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../Components/LoadingSpinner";
import classes from "./Exams.module.css";
import Wrapper from "../../Layout/Wrapper";

const Exams = () => {
  const [exams, setExams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllExams();
  }, []);

  async function getAllExams() {
    setIsLoading(true);
    try {
      await fetch("http://localhost:3000/school/exams", {
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
        <div className={classes.exams}>
          {exams.map((exam) => {
            return (
              <Wrapper
                key={exam.id}
                className={
                  exam.type === "Sprawdzian" ? classes.quiz : classes.exam
                }
              >
                <h2>{exam.subject}</h2>
                <h3>{exam.type}</h3>
                <p>{exam.deadline}</p>
                <p>
                  {exam.description.charAt(0).toUpperCase() +
                    exam.description.slice(1)}
                </p>
                <p className={classes.teacher}>{exam.teacherName}</p>
              </Wrapper>
            );
          })}
        </div>
      )}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default Exams;
