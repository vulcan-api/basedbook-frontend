import React, { useEffect, useRef } from "react";
import getUserObject from "../../../Lib/getUser";
import Input from "../../../Components/Input";
import classes from "./RemoveAccountModal.module.css";
import Button from "../../../Components/Button";
//@ts-ignore
import { NotificationManager } from "react-notifications";

const RemoveAccountModal = (props: any) => {
  let user = getUserObject();

  useEffect(() => {
    props.showSpinner(false);
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const logout = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      credentials: "include",
    })
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
  };

  const removeHandler = async () => {
    if (
      inputRef.current!.value === "" ||
      !inputRef.current!.value.match(/([A-Za-z0-9@$!%*#?&]){8,}/)
    ) {
      NotificationManager.error("Za krótkie hasło", "Nie usunięto konta", 3000);
      return;
    }

    await fetch("http://localhost:3000/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        password: inputRef.current!.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 403) {
          NotificationManager.error(
            "Błędny login lub hasło",
            "Nie zalogowano",
            3000
          );
        } else if (data.statusCode === 200) {
          NotificationManager.success(
            "Konto zostało usunięte",
            "Usunięto konto",
            3000
          );
          logout();
          window.location.href = "/auth/login";
        }
      });
  };

  return (
    <>
      <p>Usuń konto {user.username}</p>
      <p className={classes.p}>Tej decyzji nie można cofnąć!</p>
      <p className={classes.p}>Aby usunąć konto, wpisz swoje hasło</p>
      <div className={classes.flex}>
        <Input
          additionalClass={classes.input}
          type="password"
          placeholder="Hasło"
          ref={inputRef}
        />
        <Button buttonText="Usuń konto" onClick={removeHandler} />
      </div>
    </>
  );
};

export default RemoveAccountModal;
