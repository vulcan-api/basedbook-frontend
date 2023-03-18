import React, { useEffect } from "react";
import classes from "./AddPostModal.module.css";
import Checkbox from "../../Components/Checkbox";
import Button from "../../Components/Button";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
//@ts-ignore
import {NotificationManager} from "react-notifications";
import Textarea from "../../Components/Textarea";

const AddPostModal = (props: {onClose: Function, showSpinner: Function}) => {
    const navigate = useNavigate();
    const [dateHourAuto, setDateHourAuto] = useState(true);
    const postText: any = useRef('');
    const isAnonymous: any = useRef(false);

    function disableTimeAndDate() {
        setDateHourAuto(!dateHourAuto);
    }

    async function addPost(event: any) {
        event.preventDefault();

        let publishDate;

        if (dateHourAuto) {
            publishDate = new Date();
        }
        const post = {
            title: "do not ask",
            text: postText.current.value,
            isAnonymous: isAnonymous.current.checked,
            publishAt: publishDate,
        };

        const throwObject = {};
        await fetch("http://localhost:3000/spotted/post", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(post),
        })
            .then(() => {
                NotificationManager.success("Udało się dodać post.", "Sukces!", 3000);
                navigate("/spotted");
            })
            .finally(() => props.onClose())
            .catch((err) => {
                console.error(err);
                return throwObject;
            });

    }

    const maxLengthHandler = () => {
        postText.current.value.length >= 300 ? NotificationManager.warning("Wpisano maksymalną ilość znaków.", "Uwaga!", 3000) : (
            <></>);
    }

    useEffect(
        () => props.showSpinner(false)
    , [props]);
    return (
        <>
            <p>Dodaj post</p>
            <form className={classes.addForm} onSubmit={addPost}>
            <Textarea
                onChange={maxLengthHandler}
                id="post_value"
                placeholder="Treść posta"
                maxLength={300}
                ref={postText}
            />
                <div className={classes.postOptions}>
                    <Checkbox
                        id="anonimowyPost"
                        label="Anonimowy post"
                        ref={isAnonymous}
                    />
                    <Checkbox
                        id="dataIGodzina"
                        label="Obecna data i godzina"
                        onChange={disableTimeAndDate}
                        checked={dateHourAuto}
                    />
                    <input
                        type="date"
                        name="data"
                        id="data"
                        disabled={dateHourAuto}
                    />
                    <input
                        type="time"
                        name="godzina"
                        id="godzina"
                        disabled={dateHourAuto}
                    />
                    <Button type="submit" buttonText="Dodaj post" />
                </div>
            </form>
        </>
    );
};

export default AddPostModal;
