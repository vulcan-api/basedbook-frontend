import React, { useEffect, useRef, useState, useCallback } from "react";
import LinkSection from "../../Components/LinkSection";
import * as Icon from "react-bootstrap-icons";
import classes from "./SchoolSidebar.module.css";

const Sidebar = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [grades, setGrades] = useState<any>({});
  const [lastGrades, setLastGrades] = useState<any[]>([]);
  const [luckyNumber, setLuckyNumber] = useState();

  const getAllGrades = useCallback(async function () {
    const gradesFetch = await fetch("http://localhost:3000/school/grades", {
      method: "GET",
      credentials: "include",
    });

    if (gradesFetch.status === 200) {
      setGrades(await gradesFetch.json());
    }
  }, []);

  async function getLastGrades() {
    try {
      await fetch("http://localhost:3000/school/grades?last=5", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setLastGrades(data));
    } catch (error) {
      console.error(error);
    }
  }

  async function getLuckyNumber() {
    try {
      await fetch("http://localhost:3000/school/lucky-number", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setLuckyNumber(data.number));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLuckyNumber();
    getLastGrades();
    getAllGrades();
  }, [getAllGrades]);

  return (
    <>
      <div className={classes.navbar} ref={navbarRef}>
        <div>
          <LinkSection
            elements={[
              {
                destination: "/school/grades",
                label: "Oceny",
                icon: <Icon.Icon1CircleFill />,
              },
              {
                destination: "/school/attendance",
                label: "Frekwencja",
                icon: <Icon.Fingerprint />,
              },
              {
                destination: "/school/exams",
                label: "Sprawdziany",
                icon: <Icon.PenFill />,
              },
              {
                destination: "/school/lessons",
                label: "Plan lekcji",
                icon: <Icon.Calendar3RangeFill />,
              },
              {
                destination: "/school/messages",
                label: "Wiadomości",
                icon: <Icon.ChatLeftFill />,
              },
            ]}
          />
        </div>
        <div className={classes.stats}>
          {luckyNumber !== 0 ? (
            <p className={classes.stat}>Szczęśliwy numerek: {luckyNumber}</p>
          ) : (
            <></>
          )}
          <div className={classes.stat}>
            <p>Ostatnie oceny:</p>
            {Object.keys(lastGrades).map((subject: any) => {
              return (
                <div key={subject} className={classes.subject}>
                  <p>
                    {subject.charAt(0).toUpperCase() +
                      subject.slice(1) +
                      ": "}
                    {lastGrades[subject].map((grade1: any) => {
                      return <span key={grade1.id}>{grade1.grade}</span>;
                    })}
                  </p>
                </div>
              );
            })}
          </div>
          <p className={classes.stat}>
            Średnia ocen:
            {
                //some shitty code maksió do not touch it (you will break it, cuz only bader understands it)
                (() => {
                    const subjectSum: any[] = Object.keys(grades)
                    .map((subject: string) => {
                        const subjectGrades = grades[subject]
                          .map((e: any) => +e.grade)
                          .filter((e: any) => !isNaN(e));
                            if (!subjectGrades) return NaN;
                            if (!subjectGrades.length) return NaN;
                            const subjectGradesSum = subjectGrades.reduce((a: number, b: number) => a + b);
                        return subjectGradesSum / grades[subject].length;
                    })
                    .filter(e => !isNaN(e));
                    if (subjectSum.length === 0) return null;
                    return " " + (subjectSum.reduce((a: number, b: number) => a + b, 0) / Object.keys(grades).length).toFixed(2);
                })()
            }
          </p>
          <p className={classes.stat}>
            Dni do wakacji:
            {" " +
              Math.ceil(
                (new Date("06/24/2023").getTime() - new Date().getTime()) /
                  (1000 * 3600 * 24)
              )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
