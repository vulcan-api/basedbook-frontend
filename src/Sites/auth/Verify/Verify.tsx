import React, { useEffect, useState } from "react";
import classes from "./Verify.module.css";
import kitku from "./Graphics/fajny_kotek.png";
import Button from "../../../Components/Button";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const Verify = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { tempId = "" } = useParams();

  useEffect(() => {
    tempId?.length !== 128 ? setIsError(true) : setIsError(false);
    setIsLoading(false);
  }, [tempId]);

  useEffect(() => {
    setIsLoading(true);
    const verify = async () => {
        await fetch(`${process.env.REACT_APP_REQUEST_URL}/auth/verify/${tempId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => {
        setIsError(true);
        console.error(err);
      })
      .finally(() => {setIsLoading(false);})
    }
    isError ? <></> : verify()
  }, [tempId, isError]);

  return (
    <>
    {isLoading && <LoadingSpinner />}
      {!isError ? (
        <div className={classes.main}>
          <img src={kitku} alt="zdjęcie kitka" />
          <p>Udało się potwierdzić konto!</p>
          <Link to="/">
            <Button buttonText="Powrót do strony głównej" />
          </Link>
        </div>
      ) : (
        <div className={classes.main}>
          <img src={kitku} alt="zdjęcie kitka" />
          <p>Nie udało się potwierdzić konta!</p>
          <Link to="/">
            <Button buttonText="Powrót do strony głównej" />
          </Link>
        </div>
      )}
    </>
  );
};

export default Verify;
