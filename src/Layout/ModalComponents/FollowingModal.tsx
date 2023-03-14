import React, { useState, useEffect } from "react";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import classes from "./Modal.module.css";
import defaultAvatar from "../../Sites/User/Graphics/default.png";
import { Link } from "react-router-dom";

const FollowingModal = (props: {
  userId: Number;
  showSpinner: Function;
  onClose: Function;
}) => {
  const [showUsers, setShowUsers] = useState(false);
  const [following, setFollowing] = useState([
      {
        following: {
          id: 1,
          username: "123",
        },
      },
    ]);

  useEffect(() => {
    async function getUsers() {
      await fetch(
        `http://localhost:3000/user/follows/following/${props.userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then(setFollowing)
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
      <p>Obserwuje: </p>
      <ul>
        {showUsers &&
          following.map((user: any, index: any) => {
            return (
              <li key={index}>
                <Link
                  to={`/profile/${user.following.id}`}
                  onClick={() => props.onClose()}
                >
                  <div className={classes.avatar}>
                    <img
                      className={classes.avImage}
                      src={defaultAvatar}
                      alt=""
                    />
                  </div>
                  {user.following.username}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default FollowingModal;
