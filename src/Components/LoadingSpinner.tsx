import React from "react";
import { Triangle } from "react-loader-spinner";

const LoadingSpinner = (props:any) => {
    return (
      <Triangle
        height="250"
        width="250"
        color="var(--add1-500)"
        ariaLabel="triangle-loading"
        wrapperStyle={{
          width: "100%",
          height: props.height || "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          padding: "2rem",
        }}
        visible={true}
      />
    );
}

export default LoadingSpinner;