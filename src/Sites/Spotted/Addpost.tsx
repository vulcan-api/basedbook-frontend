import React from "react";
import classes from "./Addpost.module.css";
import Checkbox from "../../Components/Checkbox";
import Button from "../../Components/Button";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
//@ts-ignore
import {NotificationManager} from "react-notifications";
import Textarea from "../../Components/Textarea";

const Addpost = () => {
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
        const spottedPosts = await fetch("http://localhost:3000/spotted/post", {
            method: "PUT",
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

        if (spottedPosts.statusCode === 200 || Array.isArray(spottedPosts)) {
            NotificationManager.success("Udało się dodać post.", "Sukces!", 3000);
            navigate("/spotted");
        }
    }

    const maxLengthHandler = () => {
        postText.current.value.length >= 300 ? NotificationManager.warning("Wpisano maksymalną ilość znaków.", "Uwaga!", 3000) : (
            <></>);
    }

    return (
        <>
            <h1 className={classes.h1}>Dodaj post</h1>
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
                    <Button type="submit" buttonText="Dodaj post"/>
                </div>
            </form>
        </>
    );
};

export default Addpost;
