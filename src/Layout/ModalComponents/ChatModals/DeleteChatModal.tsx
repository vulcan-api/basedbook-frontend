
import Button from "../../../Components/Button";
import classes from "./DeleteChatModal.module.css";
//@ts-ignore
import {NotificationManager} from "react-notifications";
import {useEffect} from "react";

const DeleteChatModal = (props: { onClose: Function, showSpinner: Function, additionalData: any }) => {
    const deleteConversationHandler = async () => {
        try {
            const response = await fetch(
              `${process.env.REACT_APP_REQUEST_URL}/chat/conversation/delete/${props.additionalData.id}`,
              {
                method: "DELETE",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(response);
            if (response.status === 200) {
                NotificationManager.success(
                    "Pomyślnie usunieto konwersacje",
                    "Sukces",
                    3000
                );
                props.onClose();
            } else if (response.status >= 400) {
                NotificationManager.error(
                    "Wystąpił błąd. Spróbuj ponownie później",
                    "Nie udało się usunac konwersacji",
                    3000
                );
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(()=> {
        props.showSpinner(false);
    }, [props]);

    return (
      <>
        <p>
          Czy na pewno chcesz usunąć konwersację {props.additionalData.name}?
        </p>
        <div className={classes.buttons}>
          <Button
            onClick={() => props.onClose()}
            buttonText="Wróć"
            className="alternate"
          />
          <Button
            onClick={deleteConversationHandler}
            buttonText="Usuń konwersację"
          />
        </div>
      </>
    );
};

export default DeleteChatModal;
