import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import classes from "./InvitationsModal.module.css";
//@ts-ignore
import { NotificationManager } from "react-notifications";

const InvitationsModal = (props: {
  onClose: Function;
  showSpinner: Function;
  additionalData: any;
}) => {
  const [invitations, setInvitations] = useState([]);

  const acceptInvitation = async (conversationId: number) => {
    const response = await fetch(
        `${process.env.REACT_APP_REQUEST_URL}/chat/invitations/${conversationId}/accept`,
        {
            method: "GET",
            credentials: "include",
            }
        );
        if (response.status < 400) {
            NotificationManager.success(
                `Zaakceptowano zaproszenie do konwersacji!`,
                "Sukces",
                3000
            );
            getInvitations();
        }
    }

    const declineInvitation = async (conversationId: number) => {
        const response = await fetch(
            `${process.env.REACT_APP_REQUEST_URL}/chat/invitations/${conversationId}/decline`,
            {
                method: "DELETE",
                credentials: "include",
                }
            );
            if (response.status < 400) {
                NotificationManager.success(
                    `Odrzucono zaproszenie do konwersacji!`,
                    "Sukces",
                    3000
                );
                getInvitations();
            }
        }

  const getInvitations = async () => {
    const response = await fetch(`${process.env.REACT_APP_REQUEST_URL}/chat/invitations`, {
      method: "GET",
      credentials: "include",
    });
    if (response.status < 400) {
      const json = await response.json();
      setInvitations(json);
    }
  };

  useEffect(() => {
    props.showSpinner(false);
    getInvitations();
  }, [props]);

  return (
    <>
      <p>Zaproszenia</p>
      {invitations.length > 0 ? invitations.map((invitation: any) => {
        return (
          <div key={Math.random()} className={classes.invitation}>
            <p>{invitation.conversation.name}</p>
            <div>
              <Icon.CheckCircleFill
                onClick={() => acceptInvitation(invitation.conversation.id)}
              />
              <Icon.XCircleFill
                onClick={() => declineInvitation(invitation.conversation.id)}
              />
            </div>
          </div>
        );
      }) : <p className={classes.p}>Brak zaproszeń</p>}
    </>
  );
};

export default InvitationsModal;