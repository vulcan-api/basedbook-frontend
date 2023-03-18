import React from "react";
import Button from "../Components/Button";
import classes from "./ErrorElement.module.css";
import { ShieldExclamation } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const ErrorElement = () => {
  return (
    <div className={classes.mainCont}>
      <ShieldExclamation />
      <h2>Nie odnaleziono adresu!</h2>
      <Link to="/">
        <Button buttonText="Powrót do strony głównej" />
      </Link>
    </div>
  );
};

export default ErrorElement;
