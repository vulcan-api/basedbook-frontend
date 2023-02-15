import React from "react";
import classes from "./Addpost.module.css";
import Checkbox from "../../../Components/Checkbox";
import Button from "../../../Components/Button";
import {useState} from "react";

const Addpost = () => {
    const [dateHourAuto, setDateHourAuto] = useState(true);
    const [postText, setPostText] = useState('');
    const [anonymous, setAnonymous] = useState(false);
    const [comments, setComments] = useState(false);
    const [postDate, setPostDate] = useState(new Date());

    function disableTimeAndDate() {
        setDateHourAuto(!dateHourAuto);
    }

    async function addPost(event: any) {

        event.preventDefault();

        if (dateHourAuto) {
            setPostDate(new Date());
        }
        const post = {
            title: 'not ask',
            text: postText,
            isAnonymous: anonymous,
            isComments: comments,
            publishAt: postDate
        };

        fetch('http://localhost:3000/spotted/post', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(post)
        }).then(res => res.json()).then(console.log).catch(err => console.log(err));

    }

    const changeTextHandler = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        setPostText(value);
    }
    return (
        <>
            <h1 className={classes.h1}>Dodaj post</h1>
            <form className={classes.addForm} onSubmit={addPost}>
                <textarea value={postText} onChange={changeTextHandler} id="post_value" placeholder="Treść posta"/>
                <div className={classes.postOptions}>
                    <Checkbox id="anonimowyPost" label="Anonimowy post" value={anonymous}
                              onChange={() => setAnonymous(!anonymous)}/>
                    <Checkbox id="zezwolNaKom" label="Zezwól na komentarze" value={comments}
                              onChange={() => setComments(!comments)}/>
                    <Checkbox id="dataIGodzina" label="Obecna data i godzina" onChange={disableTimeAndDate}
                              checked={dateHourAuto}/>
                    <input type="date" name="data" id="data" disabled={dateHourAuto}/>
                    <input type="time" name="godzina" id="godzina" disabled={dateHourAuto}/>
                    <Button type="submit" buttonText="Dodaj post"/>
                </div>
            </form>
        </>
    );
}

export default Addpost;