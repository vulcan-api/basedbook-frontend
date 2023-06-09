import React, { useEffect, useRef, useState } from "react";
import classes from "./CreateChatModal.module.css"
import Input from "../../Components/Input";
import Button from "../../Components/Button";
//@ts-ignore
import { NotificationManager } from "react-notifications";

const CreateChatModal = (props: {
  onClose: Function;
  showSpinner: Function;
}) => {
  useEffect(() => {
    props.showSpinner(false);
  }, [props]);

  const [avatarValue, setAvatarValue] = useState<number>(1);

  const nameRef = useRef<HTMLInputElement>(null);

  function onChangeValue(event: any) {
    setAvatarValue(event.target.value);
  }

  const createConversationHandler = async () => {
    if (nameRef.current?.value === "") {
      NotificationManager.error(
        "Nazwa konwersacji nie może być pusta!",
        "Błąd",
        3000
      );
      return;
    }

    await fetch("http://localhost:3000/chat/conversation/create", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: nameRef.current?.value,
            avatarId: avatarValue,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.statusCode >= 400) {
                NotificationManager.error(
                    "Błąd przy tworzeniu konwersacji!",
                    "Błąd",
                    3000
                );
            } else {
                NotificationManager.success(
                    "Konwersacja została utworzona!",
                    "Sukces",
                    3000
                );
                props.onClose();
            }
        }
        );
  }

  return (
    <>
      <p>Utwórz konwersacje</p>
      <Input type="text" placeholder="Nazwa konwersacji" ref={nameRef} />
      <p className={classes.p}>Wybierz ikonę chatu:</p>
      <div className={classes.radio} onChange={onChangeValue}>
        <input type="radio" id="1" name="avatar" value="1" defaultChecked />
        <input type="radio" id="2" name="avatar" value="2" />
        <input type="radio" id="3" name="avatar" value="3" />
        <input type="radio" id="4" name="avatar" value="4" />
        <input type="radio" id="5" name="avatar" value="5" />
      </div>
      <Button buttonText="Utwórz konwersacje" onClick={createConversationHandler}/>
    </>
  );
};

export default CreateChatModal;