import React from "react";
import { Triangle } from "react-loader-spinner";

const LoadingSpinner = () => {
    return (
        <Triangle
          height="250"
          width="250"
          color="var(--add1-500)"
          ariaLabel="triangle-loading"
          wrapperStyle={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          visible={true}
        />
    );
}

export default LoadingSpinner;