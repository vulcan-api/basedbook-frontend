import React, { useRef } from "react";
// @ts-ignore
import {NotificationManager} from "react-notifications";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import Section from "../../Layout/Section";
import classes from "./Settings.module.css"

const RegisterVulcan = () => {
    const formPin = useRef<HTMLInputElement>(); 
    const formToken = useRef<HTMLInputElement>();
    const formSymbol = useRef<HTMLInputElement>(); 
    const navigate = useNavigate();
    async function addPost(event: any) {
        event.preventDefault();

        let publishDate;

        const userCredentials = {
            pin: formPin.current?.value,
            token: formToken.current?.value,
            symbol: formSymbol.current?.value
        };

        const throwObject = {};
        const spottedPosts = await fetch("http://localhost:3000/school/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userCredentials),
        })
            .then((res) => res.json())

        if (spottedPosts.statusCode === 200) {
            NotificationManager.success("Udało się zarejerstrować token.", "Sukces!", 3000);
            navigate("/settings");
        } else {
            NotificationManager.error("Coś poszło nie tak.", "Błąd!", 3000);
        }
    }

    return (
        <>
            <form className={classes.addForm} onSubmit={addPost}>
                <Section>
                    <div className={classes.twoInputs}>
                        <Input placeholder="Token" ref={formToken}/>
                        <Input placeholder="Pin" ref={formPin}/>
                        <Input placeholder="Symbol" ref={formSymbol}/>
                    </div> 
                    <div>
                        <Button buttonText="Zapisz" type="submit"/>
                    </div>
                </Section>
            </form>
        </>
    );
}

export default RegisterVulcan;