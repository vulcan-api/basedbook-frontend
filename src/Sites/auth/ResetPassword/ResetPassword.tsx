import React, { useEffect, useState, useRef } from "react";
import classes from "./ResetPassword.module.css";
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { useNavigate, Link, useParams } from "react-router-dom";
import piesek from "./Graphics/piesek.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { hash = "" } = useParams();
  const passwordRef = useRef<any>();
  const repeatPasswordRef = useRef<any>();

  useEffect(() => {
    hash?.length !== 128 ? setIsError(true) : setIsError(false);
    setIsLoading(false);
  }, [hash]);

  const resetHandler = async () => {
    setIsLoading(true);

    if (
      passwordRef.current.value.length < 8 ||
      repeatPasswordRef.current.value.length < 8
    ) {
      NotificationManager.error(
        "Hasła muszą zawierać co najmniej 8 znaków!",
        "Błąd przy zmianie hasła",
        3000
      );
      setIsLoading(false);
      return;
    } else if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      NotificationManager.error(
        "Hasła muszą się zgadzać!",
        "Błąd przy zmianie hasła",
        3000
      );
      setIsLoading(false);
      return;
    }

    const body = {
      newPassword: passwordRef.current.value,
    };

    fetch(`${process.env.REACT_APP_REQUEST_URL}/auth/reset/${hash}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          setIsError(true);
          NotificationManager.error(
            "Nie udało się zmienić hasła.",
            "Nie zmieniono hasła!",
            3000
          );
        } else {
          NotificationManager.success(
            "Udało się zmienić hasło",
            "Zmieniono hasło.",
            3000
          );
          navigate("/auth/login");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
      });
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isError && (
        <div className={classes.main}>
          <img src={piesek} alt="fajna grafika pieska" />
          <p>Zmień hasło</p>
          <p>Pamiętaj, że hasło musi mieć co najmniej 8 znaków!</p>
          <Input placeholder="Nowe hasło" type="password" ref={passwordRef} />
          <Input
            placeholder="Powtórz nowe hasło"
            type="password"
            ref={repeatPasswordRef}
          />
          <Button buttonText="Zmień hasło" onClick={resetHandler} />
        </div>
      )}
      {isError && (
        <div className={classes.main}>
          <img src={piesek} alt="fajna grafika pieska" />
          <p>Bład przy zmianie hasła!</p>
          <Link to="/">
            <Button buttonText="Powrót do strony głównej" />
          </Link>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
