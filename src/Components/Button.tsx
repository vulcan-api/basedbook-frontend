import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Button.module.css";

const Button = (props: any) => {
  const [isClicked, setIsClicked] = useState(props.disabled);

  const classMgmt = (className: any) => {
    if (props.disposable && isClicked) return classes.grayDisabled;

    switch (className) {
      case "alternate":
        return classes.alternate;
      case "gray":
        return classes.gray;
      case "gray disabled":
        return classes.grayDisabled;
      case "tooltip":
        return classes.default + " tooltip";
      case "facebook":
        return `${classes.alternate} ${classes.facebook}`;
      default:
        return classes.default;
    }
  };

  const isDisabled = (): boolean => {
    return props.disabled || (props.disposable && isClicked);
  };

  const sharedProps = {
    className: classes.button + " " + classMgmt(props.className),
    children: (
      <>
        {props.icon}
        {props.buttonText || "debiluZapomniałeśWpisać"}
      </>
    ),
  };

  return (
    <>
      {props && props.destination ? (
        <Link to={props.destination} {...sharedProps}></Link>
      ) : (
        <button
          type={props.type || "button"}
          onClick={() => {
            setIsClicked(true);
            props.onClick && props.onClick();
          }}
          disabled={isDisabled()}
          style={props.style}
          title={props.title}
          {...sharedProps}
        ></button>
      )}
    </>
  );
};

export default Button;
