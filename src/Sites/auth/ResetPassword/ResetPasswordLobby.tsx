import React, { useRef, useState } from "react";
import classes from "./ResetPasswordLobby.module.css";
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";
import Pencil from "./Graphics/pencil.png";
//@ts-ignore
import { NotificationManager } from "react-notifications";

const ResetPasswordLobby = () => {
  const [isSend, setIsSend] = useState<boolean>(false);
  const emailRef = useRef<any>();

  const sendEmailHandler = async (email: string) => {
    email = email.trim();
    let regex =
      /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@([a-zA-Z0-9_-]+)(\.[a-zA-Z0-9_-]+)*(\.[a-zA-Z]{2,4})$/i;

    if (!email.match(regex)) {
      NotificationManager.error(
        "Wprowadź prawidłowy email!",
        "Błąd przy wysyłaniu emaila!",
        3000
      );
      return;
    }

    let body = { email };
    fetch(`${process.env.REACT_APP_REQUEST_URL}/auth/reset`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          setIsSend(true);
          NotificationManager.success(
            "Udało się zmienić hasło",
            "Zmieniono hasło.",
            3000
          );
        }
      })
      .catch((err) => {
        NotificationManager.error(
          "Nie udało się wysłąć emaila odnośnie zmiany hasła.",
          "Błąd przy wysyłaniu emaila!",
          3000
        );
        console.error(err);
      });
  };

  return (
    <>
      {!isSend && (
        <div className={classes.main}>
          <img src={Pencil} alt="" />
          <h1>Zmień hasło</h1>
          <p>Podaj email konta, do którego hasło chcesz zmienić</p>
          <Input placeholder="E-mail" type="email" required ref={emailRef} />
          <Button
            buttonText="Wyślij link do zmiany hasła"
            onClick={() => {
              sendEmailHandler(emailRef.current.value || "");
            }}
          />
        </div>
      )}
      {isSend && (
        <div className={classes.main}>
          <img src={Pencil} alt="" />
          <h1>Wysłano email do zmiany hasła.</h1>
        </div>
      )}
    </>
  );
};

export default ResetPasswordLobby;
