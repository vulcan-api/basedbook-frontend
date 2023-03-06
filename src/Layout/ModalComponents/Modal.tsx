import React, { useState } from "react";
import { X } from "react-bootstrap-icons";
import ReportModal from "./ReportModal";
import classes from "./Modal.module.css";
import ProjectAppliedUsersModal from "./ProjectAppliedUsersModal";
import LoadingSpinner from "../../Components/LoadingSpinner";

const Modal = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className={classes.background} onClick={props.onBgClick}></div>
      <div className={classes.modal}>
        {isLoading && <LoadingSpinner height="100%" />}
        <p onClick={props.onBgClick}>
          <X />
        </p>
        {props.modalContent === "report" && (
          <ReportModal
            postId={props.postId}
            projectId={props.projectId}
            onClose={props.onClose}
          />
        )}
        {props.modalContent === "projectAppliedUsers" && (
          <ProjectAppliedUsersModal
            postId={props.postId}
            projectId={props.projectId}
            showSpinner={setIsLoading}
          />
        )}
      </div>
    </>
  );
};

export default Modal;
