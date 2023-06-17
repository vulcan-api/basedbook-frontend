import React, { useEffect } from "react";
import classes from "./AddProjectModal.module.css";
import Button from "../../../Components/Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import Input from "../../../Components/Input";
import Textarea from "../../../Components/Textarea";

const AddProjectModal = (props: {onClose: Function, showSpinner: Function}) => {
    const navigate = useNavigate();
    const postText: any = useRef('');
    const projectTitle: any = useRef('');

    async function addProject(event: any) {
        event.preventDefault();

        if (projectTitle.current.value.length === 0) {
            NotificationManager.error(
                "Wpisz tytul projektu",
                "Błąd przy dodawaniu projektu",
                3000
            );
            return;
        } else if (postText.current.value.length === 0) {
            NotificationManager.error(
                "Wpisz treść projektu",
                "Błąd przy dodawaniu projektu",
                3000
            );
            return;
        }

        const post = {
            title: projectTitle.current.value.trim(),
            text: postText.current.value.trim(),
        };
        if (post.title.length > 60) {
            NotificationManager.error(
                "Wpisz tytul krotszy niż 60 znakow",
                "Błąd przy dodawaniu projektu",
                3000
            );
            return;
        }

        const throwObject = {};
        fetch(`${process.env.REACT_APP_REQUEST_URL}/project`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(post),
        })
        .then(() => {
            NotificationManager.success("Udało się dodać post.", "Sukces!", 3000);
            navigate("/project");
        })
        .finally(() => props.onClose())
        .catch((err) => {
            console.error(err);
            return throwObject;
        });
    }

    const maxLengthHandler = () => {
        postText.current.value.length >= 400 ? NotificationManager.warning("Wpisano maksymalną ilość znaków.", "Uwaga!", 3000) : (<></>);
    }

    useEffect(
        () => props.showSpinner(false)
    , [props]);

    return (
        <>
            <p>Dodaj projekt</p>
            <form className={classes.addForm} onSubmit={addProject}>
                <Input id="title_value" placeholder="Tytuł" ref={projectTitle} />
                <Textarea onChange={maxLengthHandler} placeholder="Treść" maxLength={400} ref={postText}/>
                <Button type="submit" buttonText="Dodaj projekt"/>
            </form>
        </>
    );
};

export default AddProjectModal;
