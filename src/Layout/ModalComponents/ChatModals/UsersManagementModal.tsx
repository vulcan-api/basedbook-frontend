import React, { useEffect, useState, useCallback } from "react";
import classes from "./UsersManagementModal.module.css";

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

  return (
    <>
      <p>Użytkownicy chatu:</p>
      <div className={classes.users}>
        {users.map((user: User) => {
          return (
            <div className={classes.user} key={user.user.id}>
              {user.isAdmin && <p className={classes.admin}>Admin</p>}
              <p>{user.user.username}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserManagementModal;
