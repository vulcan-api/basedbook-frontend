import React, {useEffect, useState} from "react";
//@ts-ignore
import {NotificationManager} from "react-notifications";

const ProjectAppliedUsersModal = (props: any) => {

    const [participants, setParticipants] = useState([]);

    async function getUsers() {
        const throwObject = {};
        const response = await fetch(
            `http://localhost:3000/project/${props.projectId}/participants`,
            {
                method: "GET",
                credentials: "include",
            }
        )
            .then((res) => res.json()).then(setParticipants)
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
