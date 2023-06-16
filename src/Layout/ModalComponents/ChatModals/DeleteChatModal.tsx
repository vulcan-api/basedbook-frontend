
import Button from "../../../Components/Button";
import classes from "../SettingsModals/Enable2FAModal.module.css";
//@ts-ignore
import {NotificationManager} from "react-notifications";
import {useEffect} from "react";

const DeleteChatModal = (props: { onClose: Function, showSpinner: Function, conversationId: number }) => {
    const deleteConversationHandler = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_REQUEST_URL}/chat/conversation/delete/${props.conversationId}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
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
    });

    return (
        <>
        <p>Czy na pewno chcesz usunac ta konwersacje?</p>
            <div className={classes.actions}>
                <Button onClick={deleteConversationHandler} style={{marginTop: 20}} buttonText="Usun konwersacje" />
            </div>
           </>
    );
};

export default DeleteChatModal;
