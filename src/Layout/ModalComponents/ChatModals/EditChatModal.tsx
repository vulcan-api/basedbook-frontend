import React, { useEffect, useRef, useState } from "react";
import classes from "./CreateChatModal.module.css"
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";
//@ts-ignore
import { NotificationManager } from "react-notifications";

const EditChatModal = (props: {
  onClose: Function;
  showSpinner: Function;
  additionalData: any;
}) => {
  useEffect(() => {
    props.showSpinner(false);
  }, [props]);

  const [avatarValue, setAvatarValue] = useState<number>(1);

  const nameRef = useRef<HTMLInputElement>(null);

  function onChangeValue(event: any) {
    setAvatarValue(event.target.value);
  }

  const saveSettingsHandler = async () => {
    if (nameRef.current?.value === "") {
      NotificationManager.error(
        "Nazwa konwersacji nie może być pusta!",
        "Błąd",
        3000
      );
      return;
    }

    await fetch(`http://localhost:3000/chat/update/${props.additionalData.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current?.value.trim(),
        avatarId: avatarValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode >= 400) {
          NotificationManager.error(
            "Błąd przy aktualizowaniu konwersacji!",
            "Błąd",
            3000
          );
        } else {
          NotificationManager.success(
            "Konwersacja została zaaktualizowana!",
            "Sukces",
            3000
          );
          props.onClose();
        }
      });
  };

  return (
    <>
      <p>Edytuj konwersacje</p>
      <Input
        type="text"
        placeholder="Nazwa konwersacji"
        ref={nameRef}
        defaultValue={props.additionalData.name}
      />
      <p className={classes.p}>Wybierz ikonę chatu:</p>
      <div className={classes.radio} onChange={onChangeValue}>
        <input
          type="radio"
          id="1"
          name="avatar"
          value="1"
          defaultChecked={props.additionalData.avatarId === 1 ? true : false}
        />
        <input
          type="radio"
          id="2"
          name="avatar"
          value="2"
          defaultChecked={props.additionalData.avatarId === 2 ? true : false}
        />
        <input
          type="radio"
          id="3"
          name="avatar"
          value="3"
          defaultChecked={props.additionalData.avatarId === 3 ? true : false}
        />
        <input
          type="radio"
          id="4"
          name="avatar"
          value="4"
          defaultChecked={props.additionalData.avatarId === 4 ? true : false}
        />
        <input
          type="radio"
          id="5"
          name="avatar"
          value="5"
          defaultChecked={props.additionalData.avatarId === 5 ? true : false}
        />
      </div>
      <Button buttonText="Zaaktualizuj dane" onClick={saveSettingsHandler} />
    </>
  );
};

export default EditChatModal;