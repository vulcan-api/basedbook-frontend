import React, { useRef } from "react";
import Input from "../../../Components/Input";
import Checkbox from "../../../Components/Checkbox";
import classes from "./Login.module.css";
import Button from "../../../Components/Button";
import loginImg from "./Graphics/loginImg.png";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const remeberPasswordRef = useRef();

    const loginHandler = (event: any) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          // @ts-ignore
          email: emailRef.current.value,
          // @ts-ignore
          password: passwordRef.current.value,
        });

        fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
          credentials: "include",
        })
          .then((response) => response.text())
          // @ts-ignore
          .then(() => remeberPasswordRef.target.checked ? console.log("to itak nie działa") : "", navigate("/"))
          .catch((error) => console.log("error", error));
    };

  return (
    <div className={classes.loginFlex}>
      <div className={classes.img}></div>
      <div className={classes.formSide}>
        <div className={classes.loginForm}>
          <p>Zaloguj się</p>
          <img src={loginImg} alt="cool login img" />
          <form onSubmit={loginHandler} className={classes.form}>
            <Input placeholder="E-Mail" ref={emailRef} />
            <Input type="password" placeholder="Hasło" ref={passwordRef} />
            <p>Nie pamiętasz hasła?</p>
            <Checkbox
              ref={remeberPasswordRef}
              id="passwordRemember"
              label="Zapamiętaj hasło"
            />
            <Button type="submit" buttonText="Zaloguj się" />
          </form>
          <Link to={"/auth/signup"}>Nie masz konta? Zarejestruj się!</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
