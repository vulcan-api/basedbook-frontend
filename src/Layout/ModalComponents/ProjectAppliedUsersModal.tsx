import React, {useEffect, useState} from "react";
//@ts-ignore
import {NotificationManager} from "react-notifications";

const ProjectAppliedUsersModal = (props: any) => {

        const [participants, setParticipants] = useState([{
            "user": {
                "id": 4,
                "name": "Jan",
                "surname": "Kowalski"
            }
        }]);

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

        return (
            <div>
                <ul>
                    {participants.length === 0 && (<li>Brak użytkowników</li>)}
                    {participants.map((participant: any, index) => {
                        return (
                            <li key={index}>
                                {participant.user.name} {participant.user.surname}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
;

export default ProjectAppliedUsersModal;
