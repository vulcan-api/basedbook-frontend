import React, { useEffect, useRef, useState, useCallback } from "react";
import Input from "../../../Components/Input";
import ModalSearchResult from "./ModalSearchResult";
import defaultAvatar from "../../../Sites/User/Graphics/default.png";
import classes from "./AddUserModal.module.css";
//@ts-ignore
import { NotificationManager } from "react-notifications";

const AddUserModal = (props: {
  onClose: Function;
  showSpinner: Function;
  additionalData: any;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState([
    { id: 0, name: "", surname: "", username: "" },
  ]);

  const [usersInConversation, setUsersInConversation] = useState<any[]>([{
    addedBy: {
      username: "",
    },
    isAdmin: false,
    user: {
      id: 0,
      username: "",
    },
  }]); 

  const fetchUsersInConversation = useCallback(async () => {
    await fetch(
      `${process.env.REACT_APP_REQUEST_URL}/chat/conversation/${props.additionalData.id}/members`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((json) => setUsersInConversation(json))
      .finally(() => props.showSpinner(false));
  }, [props]);

  useEffect(() => {
    fetchUsersInConversation();
  }, [fetchUsersInConversation]);

  const filterUsers = useCallback((users: any) => {
    let filteredUsers = users.filter((user: any) => {
      let isInConversation = false;
      usersInConversation.forEach((userInConversation) => {
        if (userInConversation.user.id === user.id) {
          isInConversation = true;
        }
      });
      if (!isInConversation) {
        return user;
      }
      return null;
    });
    setUsers(filteredUsers);
  }, [usersInConversation]);

  const fetchUsers = async () => {
    const val = inputRef.current?.value;
    await fetch(`${process.env.REACT_APP_REQUEST_URL}/user/?name=${val}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => filterUsers(json));
  };

  const addUserHandler = async (id: number, username: String) => {
    const body = {
      conversationId: props.additionalData.id,
      userId: id,
    };
    const response = await fetch(
      `${process.env.REACT_APP_REQUEST_URL}/chat/conversation/add`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (response.status === 409) {
      NotificationManager.error(
        `Użytkownik ${username} jest już w konwersacji!`,
        "Błąd",
        3000
      );
    } else if (response.status < 400) {
      NotificationManager.success(
        `Zaproszono użytkownika ${username} do konwersacji!`,
        "Sukces",
        3000
      );
    }
  };

  return (
    <>
      <h1>Dodaj userów</h1>
      <Input
        ref={inputRef}
        placeholder="Szukaj"
        onChange={fetchUsers}
        additionalClass={classes.input}
      />
      <div>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((result) => {
            if (result["id"] !== 0) {
              return (
                <ModalSearchResult
                  key={result["id"]}
                  id={result["id"]}
                  name={`${result["name"]} ${result["surname"]} - ${result["username"]}`}
                  image={defaultAvatar}
                  onClick={() => {
                    addUserHandler(result["id"], result["username"]);
                  }}
                />
              );
            }
            return "";
          })
        ) : (
          <p className={classes.noUsersFound}>Brak wyników</p>
        )}
      </div>
    </>
  );
};

export default AddUserModal;
