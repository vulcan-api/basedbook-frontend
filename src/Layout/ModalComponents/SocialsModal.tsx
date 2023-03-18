import React, { useEffect } from "react";

const SocialsModal = (props: {
  userId: Number,
  onClose: Function;
  showSpinner: Function
}) => {

  useEffect(() => {
    props.showSpinner(false);
  }, [props]);

  return (
    <>
      <p>Obserwujący: </p>
      <ul>
      </ul>
    </>
  );
};

export default SocialsModal;