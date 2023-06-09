import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props: any, ref: any) => {
  return (
    // @ts-ignore
    <input
      type={props.type || "text"}
      value={props.value}
      ref={ref}
      onChange={props.onChange}
      placeholder={props.placeholder || "debiluZapomniałeśWpisać"}
      className={`${classes.input} ${props.className === "alternate" ? classes.alternate : classes.default} ${props.additionalClass || ""}`}
      onKeyDown={props.onKeyDown}
    />
  );
});

export default Input;
