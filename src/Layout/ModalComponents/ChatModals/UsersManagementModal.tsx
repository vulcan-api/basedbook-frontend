import React, { useEffect, useState, useCallback } from "react";
import classes from "./UsersManagementModal.module.css";
import Button from "../../../Components/Button";
import getUserObject from "../../../Lib/getUser";

const UserManagementModal = (props: {
  onClose: Function;
  showSpinner: Function;
  additionalData: any;
}) => {
  const [users, setUsers] = useState<any>([]);

  const getConversationMembers = useCallback(() => {
    fetch(
      `${process.env.REACT_APP_REQUEST_URL}/chat/conversation/${props.additionalData.id}/members`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((json) => setUsers(json));
  }, [props.additionalData.id]);

  useEffect(() => {
    props.showSpinner(false);
    getConversationMembers();
  }, [props, getConversationMembers]);

  const userInfo = getUserObject();
  interface User {
    addedBy: {
      username: string;
    };
    isAdmin: boolean;
    user: {
      id: number;
      username: string;
    };
  }

  let isUserAdmin = users.find((user: User) => user.user.id === userInfo.id);

  const addAdmin = (userId: number) => {
    fetch(`${process.env.REACT_APP_REQUEST_URL}/chat/conversation/admin`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        conversationId: props.additionalData.id,
        userId: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => getConversationMembers());
  };

  const deleteAdmin = (userId: number) => {
    fetch(
      `${process.env.REACT_APP_REQUEST_URL}/chat/conversation/admin?userId=${userId}&conversationId=${props.additionalData.id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => getConversationMembers());
  };

  return (
    <>
      <p>Użytkownicy chatu:</p>
      <div className={classes.users}>
        {users.map((user: User) => {
          return (
            <div className={classes.user} key={user.user.id}>
              <div>
                <p className={classes.username}>
                  {user.user.username}{" "}
                  {user.isAdmin && <p className={classes.admin}>Admin</p>}
                </p>
                {user.addedBy.username !== user.user.username && (
                  <p className={classes.addedBy}>
                    Dodany przez: {user.addedBy.username}
                  </p>
                )}
              </div>
              <div>
                {isUserAdmin.isAdmin && userInfo.id !== user.user.id && (
                  <Button
                    buttonText={
                      user.isAdmin ? "Odbierz Admina" : "Nadaj Admina"
                    }
                    onClick={
                      !user.isAdmin
                        ? () => addAdmin(user.user.id)
                        : () => deleteAdmin(user.user.id)
                    }
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserManagementModal;
