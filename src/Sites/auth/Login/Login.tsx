import React, {useRef, useState} from "react";
import Input from "../../../Components/Input";
import classes from "./Login.module.css";
import Button from "../../../Components/Button";
import loginImg from "./Graphics/loginImg.png";
import {Link, useNavigate} from "react-router-dom";
//@ts-ignore
import {NotificationManager} from "react-notifications";
import Modal from "../../../Layout/ModalComponents/Modal";

const Login = () => {
    const navigate = useNavigate();
    const emailRef: any = useRef();
    const passwordRef: any = useRef();
    const [showModal, setShowModal] = useState(false);


    const closeModal = () => {
        setShowModal(false);
    };
    const loginHandler = async (event: any) => {
        event.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            email: emailRef.current.value.trim(),
            password: passwordRef.current.value,
        });

        await fetch(`${process.env.REACT_APP_REQUEST_URL}/auth/login`, {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode >= 400) {
                    NotificationManager.error(
                        "Błędny login lub hasło",
                        "Nie zalogowano",
                        3000
                    );
                } else if (data.has2FAEnabled) {
                    setShowModal(true);
                } else {
                    navigate("/");
                }
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
        <>
            {showModal && (
                <Modal
                    onBgClick={closeModal}
                    onClose={closeModal}
                    modalContent="totp"
                    email={emailRef.current.value.trim()}
                />
            )}
        <div className={classes.loginFlex}>
            <div className={classes.img}></div>
            <div className={classes.formSide}>
                <div className={classes.loginForm}>
                    <p>Zaloguj się</p>
                    <img src={loginImg} alt="cool login img"/>
                    <form onSubmit={loginHandler} className={classes.form}>
                        <Input placeholder="E-Mail" ref={emailRef}/>
                        <Input type="password" placeholder="Hasło" ref={passwordRef}/>
                        <p onClick={() => navigate("/auth/reset")}>
                          Nie pamiętasz hasła?
                        </p>
                        <Button type="submit" buttonText="Zaloguj się"/>
                    </form>
                    <Link to={"/auth/signup"}>Nie masz konta? Zarejestruj się!</Link>
                </div>
            </div>
        </div>
        </>

    );
};

export default Login;
