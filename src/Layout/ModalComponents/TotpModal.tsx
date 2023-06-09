import React, {useEffect} from "react";
import classes from "./AddProjectModal.module.css";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
//@ts-ignore
import {NotificationManager} from "react-notifications";

const TotpModal = (props: { onClose: Function, showSpinner: Function, email: String }) => {
    const navigate = useNavigate();
    const codeRef: any = useRef('');
    const verifyCode = () => {
        const body = {code: codeRef.current.value, email: props.email};
        fetch(`${process.env.REACT_APP_REQUEST_URL}/auth/totp/verify`, {
            method: "POST",
            credentials: "include",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((res) => res.json()).then(data => {
            if (data.token) {
                navigate('/');
            } else {
                NotificationManager.error(
                    "Błędny kod",
                    "Nie zalogowano",
                    3000
                );
            }
        }).catch((err) => {
            NotificationManager.error(
                "Wystąpił błąd. Spróbuj ponownie później",
                "Nie zalogowano",
                3000
            );
            console.error(err);
        });
    }
    useEffect(() => {
        props.showSpinner(false);
    }, [props]);

    return (
        <>
            <p>Wpisz kod wyswietlany w aplikacji</p>
            <form className={classes.addForm}>
                <Input id="title_value" placeholder="Kod" ref={codeRef}/>
                <Button buttonText="Zweryfikuj" onClick={verifyCode}/>
            </form>
        </>
    );
};

export default TotpModal;
