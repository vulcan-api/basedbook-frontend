import React from "react";
import { X } from "react-bootstrap-icons";
import ReportModal from "./ReportModal";
import classes from "./Modal.module.css"
import ProjectAppliedUsersModal from "./ProjectAppliedUsersModal";

const Modal = (props: any) => {
    return (
      <>
        <div className={classes.background} onClick={props.onBgClick}></div>
        <div className={classes.modal}>
          <p onClick={props.onBgClick}>
            <X />
          </p>
          {props.modalContent === "report" && (
            <ReportModal postId={props.postId} projectId={props.projectId} onClose={props.onClose}/>
          )}
          {props.modalContent === "projectAppliedUsers" && (
            <ProjectAppliedUsersModal postId={props.postId} projectId={props.projectId} />
          )}
        </div>
      </>
    );
}

export default Modal;