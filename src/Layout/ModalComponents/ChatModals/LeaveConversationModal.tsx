import React, { useEffect } from "react";
import Classes from "./LeaveConversationModal.module.css";
import Button from "../../../Components/Button";
//@ts-ignore
import { NotificationManager } from "react-notifications";

const LeaveConversationModal = (props: {
  onClose: Function;
  additionalData: any;
  showSpinner: Function;
}) => {
  useEffect(() => {
    props.showSpinner(false);
  }, [props]);

  const leaveConversation = async () => {
    await fetch(
      `${process.env.REACT_APP_REQUEST_URL}/chat/conversation/leave/${props.additionalData.id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    ).then(() => {
      NotificationManager.success("Opuszczono konwersację", "", 3000);
      props.onClose();
      props.additionalData.setConversationId(0);
      console.log("asdasd");
    })
    .catch((err) => {
        console.error(err)
        NotificationManager.error("Nie udało się opuścić konwersacji", "", 3000);
    });
  };

  return (
    <>
      <p>Czy chcesz opuścić konwersację {props.additionalData.name}?</p>
      <div className={Classes.buttons}>
        <Button
          onClick={() => props.onClose()}
          buttonText="Wróć"
          className="alternate"
        />
        <Button
          onClick={leaveConversation}
          buttonText="Opuść konwersację"
        />
      </div>
    </>
  );
};

export default LeaveConversationModal;
