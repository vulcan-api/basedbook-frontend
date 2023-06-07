import React, { useEffect } from "react";
import classes from "./AddProjectModal.module.css";
import Button from "../../Components/Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import Input from "../../Components/Input";
import Textarea from "../../Components/Textarea";

const AddProjectModal = (props: {onClose: Function, showSpinner: Function}) => {
    const navigate = useNavigate();
    const projectTitle: any = useRef('');


    return (
        <>
            <p>Wpisz kod wyswietlany w aplikacji</p>
            <form className={classes.addForm}>
                <Input id="title_value" placeholder="Kod" ref={projectTitle} />
                <Button type="submit" buttonText="Zweryfikuj"/>
            </form>
        </>
    );
};

export default AddProjectModal;
