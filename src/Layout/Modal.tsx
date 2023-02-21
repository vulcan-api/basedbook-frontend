import React, { useRef } from "react";
import classes from "./Modal.module.css"
//@ts-ignore
import {NotificationManager} from "react-notifications";
import * as Icon from "react-bootstrap-icons";
import Button from "../Components/Button";

const Modal = (props: any) => {
    const postText: any = useRef("");

    const maxLengthHandler = () => {
      postText.current.value.length >= 300 ? (
        NotificationManager.warning(
          "Wpisano maksymalną ilość znaków.",
          "Uwaga!",
          3000
        )
      ) : (
        <></>
      );
    };

    return (
      <>
        <div className={classes.background} onClick={props.onBgClick}></div>
        <div className={classes.modal}>
          <p onClick={props.onBgClick}>
            <Icon.X />
          </p>
          <p>Zgłoś post</p>
          <textarea
            onChange={maxLengthHandler}
            id="post_value"
            placeholder="Treść zgłoszenia"
            maxLength={300}
            ref={postText}
            className={classes.textarea}
          />
          <Button buttonText="Zgłoś post"/>
        </div>
      </>
    );
}

export default Modal;