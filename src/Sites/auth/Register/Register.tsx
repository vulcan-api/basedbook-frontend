import React, { useEffect, useRef } from "react";
import classes from "./Register.module.css";
import registerImg from "./Graphics/registerImg.png";
import Input from "../../../Components/Input";
import Checkbox from "../../../Components/Checkbox";
import Button from "../../../Components/Button";
import { Link, useNavigate } from "react-router-dom";
//@ts-ignore
import { NotificationManager } from "react-notifications";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  });

  const emailRef: any = useRef();
  const usernameRef: any = useRef();
  const passwordRef: any = useRef();
  const repeatPasswordRef: any = useRef();

  const fetchPosts = async () => {
    const throwObject = {};
    await fetch("http://localhost:3000/spotted/post", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        logout();
      })
      .catch((err) => {
        console.error(err);
        return throwObject;
      });
  };

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

  const registerHandler = (event: any) => {
    event.preventDefault();
    console.log("nie wyjebało sie");
    if (usernameRef.current.value.length < 2) {
      NotificationManager.error(
        "Wpisz nazwę użtkownika dłuższą niż 1 znam",
        "Błąd przy rejestacji",
        3000
      );
      return;
    }

    if (
      !(
        passwordRef.current.value.length > 7 &&
        repeatPasswordRef.current.value.length > 7
      ) ||
      passwordRef.current.value !== repeatPasswordRef.current.value
    ) {
      NotificationManager.error(
        "Hasła muszą się zgadzać i zawierać co najmniej 8 znaków!",
        "Błąd przy rejestacji",
        3000
      );
      return;
    }

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      email: emailRef.current.value,
      password: passwordRef.current.value,
      username: usernameRef.current.value,
    });

    fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include",
    })
      .then((response) => response.text())
      .then(() => {
        NotificationManager.success(
          "Udało się zarejestrować. Nie zapomnij potwierdzić rejestracji poprzez email!",
          "Zarejestrowano",
          3000
        );
        navigate("/auth/login");
      })
      .catch((error) => {
        console.log("error", error);
        NotificationManager.error(
          "Nie udało się zarejestrować. Spróbuj ponownie później",
          "Nie zarejestrowano",
          3000
        );
      });
  };

  return (
    <div className={classes.loginFlex}>
      <div className={classes.formSide}>
        <div className={classes.loginForm}>
          <p>Zarejestruj się</p>
          <img src={registerImg} alt="cool register img" />
          <form className={classes.form} onSubmit={registerHandler}>
            <Input placeholder="Nazwa użytkownika" ref={usernameRef} require />
            <Input type="email" placeholder="E-Mail" ref={emailRef} require />
            <Input
              type="password"
              placeholder="Hasło"
              ref={passwordRef}
              require
            />
            <Input
              type="password"
              placeholder="Powtórz hasło"
              ref={repeatPasswordRef}
              require
            />
            <Checkbox id="acceptRegulamin" label="Akceptuję regulamin" />
            <Button buttonText="Zarejestruj się" type="submit" />
          </form>
          <Link to={"/auth/login"}>Masz już konto? Zaloguj się!</Link>
        </div>
      </div>
      <div className={classes.img}></div>
    </div>
  );
};

export default Register;
