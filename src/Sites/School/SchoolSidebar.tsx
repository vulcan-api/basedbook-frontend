import React, {useEffect, useRef, useState} from 'react';
import LinkSection from '../../Components/LinkSection';
import * as Icon from 'react-bootstrap-icons';
import classes from './SchoolSidebar.module.css';

const Sidebar = () => {
    const navbarRef = useRef<HTMLDivElement>(null);
    const [lastGrades, setLastGrades] = useState<any[]>([]);
    let luckyNumber;

    useEffect(() => {
        getLuckyNumber();
        getLastGrades();
    }, []);

    async function getLastGrades() {
        try {
            await fetch("http://localhost:3000/school/grades?last=5", {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setLastGrades(data.grades));
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
                .then((data) => luckyNumber = data.number);
        } catch (error) {
            console.error(error);
        }
    }

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
            <div className={classes.stat}>
              Szczęśliwy numerek: {luckyNumber}
            </div>
            <div className={classes.stat}>
              Ostatnie oceny:
              <div className={classes.stat}>
                {lastGrades.map((grade) => {
                  return (
                    <p key={grade.id}>
                      {grade.column.subject.name}: {grade.value}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className={classes.stat}>Średnia ocen:</div>
            <div className={classes.stat}>Dni do wakacji:</div>
          </div>
        </div>
      </>
    );
}

export default Sidebar;
