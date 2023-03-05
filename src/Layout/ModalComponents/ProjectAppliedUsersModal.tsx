import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import classes from "./Modal.module.css"
import defaultAvatar from "../../Sites/User/Graphics/default.png"

const ProjectAppliedUsersModal = (props: any) => {
  const [participants, setParticipants] = useState([
    {
      user: {
        id: 4,
        name: "",
        surname: "",
      },
    },
  ]);

  async function getUsers() {
    props.showSpinner();
    const throwObject = {};
    await fetch(
      `http://localhost:3000/project/${props.projectId}/participants`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then(setParticipants)
      .catch((err) => {
        console.error(err);
        NotificationManager.error(
          "Wystąpił błąd podczas pobierania użytkowników!",
          "Błąd!",
          3000
        );
        return throwObject;
      });
    props.showSpinner();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <ul>
        {participants.length < 1 ? <p>Brak zapisanych użytkowników !</p> : <p>Zapisani użytkownicy: </p>}
      {participants.map((participant: any) => {
        return (
          <li key={participant.id}>
            <Link to={`/profile/${participant.user.id}`}>
              <div className={classes.avatar}>
                <img className={classes.avImage} src={defaultAvatar} alt="" />
              </div>
              {participant.user.name} {participant.user.surname}{" "}
              {console.log(participant.user.id)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default ProjectAppliedUsersModal;
