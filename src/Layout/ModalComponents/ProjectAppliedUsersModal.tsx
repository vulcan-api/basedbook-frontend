import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import classes from "./Modal.module.css";
import defaultAvatar from "../../Sites/User/Graphics/default.png";

const ProjectAppliedUsersModal = (props: {
  postId: Number;
  projectId: Number;
  showSpinner: Function;
  onClose: Function;
}) => {
  const [showUsers, setShowUsers] = useState(false);
  const [participants, setParticipants] = useState([
    {
      user: {
        id: Number,
        name: String,
        surname: String,
      },
    },
  ]);

  useEffect(() => {
    async function getUsers() {
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
        })
        .finally(() => {
          props.showSpinner(false);
          setShowUsers(true);
        });
    }
    getUsers();
  }, [props]);

  return (
    <>
      {participants.length < 1 ? (
        <p>Brak zapisanych użytkowników!</p>
      ) : (
        <p>Zapisani użytkownicy: </p>
      )}
      <ul>
        {showUsers &&
          participants.map((participant: any, index: any) => {
            return (
              <li key={index}>
                <Link to={`/profile/${participant.user.id}`} onClick={() => props.onClose()}>
                  <div className={classes.avatar}>
                    <img
                      className={classes.avImage}
                      src={defaultAvatar}
                      alt=""
                    />
                  </div>
                  {participant.user.username}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};
export default ProjectAppliedUsersModal;
