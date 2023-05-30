import React, { useState, useEffect } from "react";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import classes from "./Modal.module.css";
import defaultAvatar from "../../Sites/User/Graphics/default.png";
import { Link } from "react-router-dom";

const FollowersModal = (props: {
  userId: Number,
  showSpinner: Function;
  onClose: Function;
}) => {
  const [showUsers, setShowUsers] = useState(false);
  const [followers, setFollowers] = useState([
    {
      user: {
        id: Number,
        name: String,
        surname: String,
      },
    },
  ]);

  useEffect(() => {
    async function getUsers() {
      await fetch(
        `http://localhost:3000/user/follows/followers/${props.userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then(setFollowers)
        .catch((err) => {
          console.error(err);
          NotificationManager.error(
            "Wystąpił błąd podczas pobierania użytkowników!",
            "Błąd!",
            3000
          );
        })
        .finally(() => {
          props.showSpinner(false);
          setShowUsers(true);
        });
    }
    getUsers();
  }, [props]);

  return (
    <>
      <p>Obserwujący: </p>
      <ul>
        {showUsers &&
          followers.map((user: any, index: any) => {
            return (
              <li key={index}>
                <Link
                  to={`/profile/${user.follower.id}`}
                  onClick={() => props.onClose()}
                >
                  <div className={classes.avatar}>
                    <img
                      className={classes.avImage}
                      src={defaultAvatar}
                      alt=""
                    />
                  </div>
                  {user.follower.username}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default FollowersModal;