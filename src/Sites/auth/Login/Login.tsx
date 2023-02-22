import React, {useRef, useEffect} from "react";
import Input from "../../../Components/Input";
import Checkbox from "../../../Components/Checkbox";
import classes from "./Login.module.css";
import Button from "../../../Components/Button";
import loginImg from "./Graphics/loginImg.png";
import {Link, useNavigate} from "react-router-dom";
//@ts-ignore
import {NotificationManager} from "react-notifications";

const Login = () => {
    const navigate = useNavigate();
    const emailRef: any = useRef();
    const passwordRef: any = useRef();
    const remeberPasswordRef: any = useRef();

    useEffect(() => {
        fetchPosts();
    })

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

    const loginHandler = async (event: any) => {
        event.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        });

        await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
            credentials: "include",
        })
            .then((response) => response.text())
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.log("error", error)
                NotificationManager.error(
                  "Nie udało się zalogować. Spróbuj ponownie później",
                  "Nie zalogowano",
                  3000
                );
            });
    };

    return (
        <div className={classes.loginFlex}>
            <div className={classes.img}></div>
            <div className={classes.formSide}>
                <div className={classes.loginForm}>
                    <p>Zaloguj się</p>
                    <img src={loginImg} alt="cool login img"/>
                    <form onSubmit={loginHandler} className={classes.form}>
                        <Input placeholder="E-Mail" ref={emailRef}/>
                        <Input type="password" placeholder="Hasło" ref={passwordRef}/>
                        <p>Nie pamiętasz hasła?</p>
                        <Checkbox
                            ref={remeberPasswordRef}
                            id="passwordRemember"
                            label="Zapamiętaj hasło"
                        />
                        <Button type="submit" buttonText="Zaloguj się"/>
                    </form>
                    <Link to={"/auth/signup"}>Nie masz konta? Zarejestruj się!</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
