import React, { useRef, useEffect } from "react";
import classes from "./Modal.module.css";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import Button from "../../Components/Button";

const ReportModal = (props: any) => {
  const postText: any = useRef("");

  useEffect(() => {
    props.showSpinner(false);
  }, [props])

  async function submitReportHandler() {
    let path = "";
    const throwObject = {};
    const report = {
      postId: props.postId,
      projectId: props.projectId,
      reason: postText.current.value,
    };
    if (report.projectId != null) {
      path = "/project";
    } else if (report.postId != null) {
      path = "/spotted";
    }
    await fetch(`http://localhost:3000${path}/report`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report),
    })
      .then((res) => {
        res.json();
        NotificationManager.success("Udało się zgłosić post.", "Sukces!", 3000);
        props.onClose();
      })
      .catch((err) => {
        console.error(err);
        NotificationManager.error(
          "Wystąpił błąd podczas zgłoszenia posta!.",
          "Błąd!",
          3000
        );
        return throwObject;
      });
  }

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
      <p>Zgłoś post</p>
      <textarea
        onChange={maxLengthHandler}
        id="post_value"
        placeholder="Treść zgłoszenia"
        maxLength={300}
        ref={postText}
        className={classes.textarea}
      />
      <Button buttonText="Zgłoś" onClick={submitReportHandler} />
    </>
  );
};

export default ReportModal;
