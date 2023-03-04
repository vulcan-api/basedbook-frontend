import React, { useEffect } from "react";
//@ts-ignore
import { NotificationManager } from "react-notifications";

const ProjectAppliedUsersModal = (props: any) => {
  async function getUsers() {
    const throwObject = {};
    await fetch(
      `http://localhost:3000/project/${props.projectId}/participants`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => {
        console.log(res.json())
      }).then(console.log)
      .catch((err) => {
        console.error(err);
        NotificationManager.error(
          "Wystąpił błąd podczas pobierania użytkowników!",
          "Błąd!",
          3000
        );
        return throwObject;
      });
  }

  useEffect(() => {
    getUsers();
  })

  return <p>Chuj</p>;
};

export default ProjectAppliedUsersModal;
