import React from "react";
import classes from "./Addproject.module.css";
import Checkbox from "../../Components/Checkbox";
import Button from "../../Components/Button";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
//@ts-ignore
import {NotificationManager} from "react-notifications";
import Input from "../../Components/Input";
import Textarea from "../../Components/Textarea";

const Addproject = () => {
    const navigate = useNavigate();
    const [dateHourAuto, setDateHourAuto] = useState(true);
    const postText: any = useRef('');
    const projectTitle: any = useRef('');
    const isAnonymous: any = useRef(false);

    function disableTimeAndDate() {
        setDateHourAuto(!dateHourAuto);
    }

    async function addProject(event: any) {
        event.preventDefault();

        let publishDate;

        const post = {
            title: projectTitle.current.value,
            text: postText.current.value,
        };

        const throwObject = {};
        console.log(post);
        const project = await fetch("http://localhost:3000/project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(post),
        })
            .then((res) => res.json())
            .catch((err) => {
                console.error(err);
                return throwObject;
            });

        if (project.statusCode === 201 || Array.isArray(project)) {
            NotificationManager.success("Udało się dodać post.", "Sukces!", 3000);
            navigate("/project");
        }
    }

    const maxLengthHandler = () => {
        postText.current.value.length >= 300 ? NotificationManager.warning("Wpisano maksymalną ilość znaków.", "Uwaga!", 3000) : (
            <></>);
    }

    return (
        <>
            <h1 className={classes.h1}>Dodaj projekt</h1>
            <form className={classes.addForm} onSubmit={addProject}>
                <Input id="title_value" placeholder="Tytuł" ref={projectTitle} />
                <Textarea onChange={maxLengthHandler} id="post_value" placeholder="Treść" maxLength={300} ref={postText}/>
                <Button type="submit" buttonText="Dodaj projekt"/>
            </form>
        </>
    );
};

export default Addproject;
