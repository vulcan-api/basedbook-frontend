import React, { useState, useEffect, useCallback, useRef } from "react";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import classes from "./Conversation.module.css";
import Input from "../../../Components/Input";
import * as Icon from "react-bootstrap-icons";

interface ConversationProps {
  conversationId: number;
  formatDate: Function;
  setShowModal: Function;
  setModalContent: Function;
  trigger: number;
  setTrigger: Function;
  setAdditionalModalData: Function;
}

const Conversation = (props: ConversationProps) => {
  const [chat, setChat] = useState<ChatInterface>({
    id: 1,
    name: "",
    messages: [
      {
        id: "1",
        content: "",
        sendTime: "2023-06-05T16:47:56.098Z",
        isEdited: false,
        sender: {
          id: 26,
          username: "",
        },
        isOwned: true,
      },
    ],
    isAdmin: true,
    avatarId: 1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const chatRef = useRef<any>("");
  const [edit, setEdit] = useState<any>(false);

  interface Message {
    id: string;
    content: string;
    sendTime: string;
    isEdited: boolean;
    sender: {
      id: number;
      username: string;
    };
    isOwned: boolean;
  }

  interface ChatInterface {
    id: number;
    name: string;
    messages: Message[];
    isAdmin: boolean;
    avatarId: number;
  }

  const fetchConversation = useCallback(() => {
    //TODO: Add pagination
    fetch(
      `http://localhost:3000/chat/messages/${props.conversationId}?take=100000`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode >= 400) {
          NotificationManager.error(
            "Błąd przy pobieraniu konwersacji!",
            "Błąd",
            3000
          );
        } else {
          setChat(data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props]);

  const sendManagement = () => {
    if (edit) {
      editHandler();
    } else {
      sendHandler();
    }
    props.setTrigger(props.trigger + 1);
  };

  useEffect(() => {
    fetchConversation();
  }, [fetchConversation, props.trigger]);

  const editHandler = async () => {
    let body = {
      content: chatRef.current.value,
    };
    if (chatRef.current.value.length > 0) {
      const response = await fetch(
        `http://localhost:3000/chat/edit/${edit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );
      if (response.status < 400) {
        fetchConversation();
        chatRef.current.value = "";
        setEdit(null);
      } else {
        NotificationManager.error(
          "Błąd przy edytowaniu wiadomości!",
          "Błąd",
          3000
        );
      }
    }
  };

  const sendHandler = async () => {
    let body = {
      content: chatRef.current.value,
      conversation: props.conversationId,
    };
    if (chatRef.current.value.length > 0) {
      const response = await fetch(`http://localhost:3000/chat/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (response.status === 201) {
        fetchConversation();
        chatRef.current.value = "";
      } else {
        NotificationManager.error(
          "Błąd przy wysyłaniu wiadomości!",
          "Błąd",
          3000
        );
      }
    }
  };

  const deleteHandler = async (id: number) => {
    const response = await fetch(`http://localhost:3000/chat/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      NotificationManager.success(
        "Udało się usunąć wiadomość.",
        "Sukces!",
        3000
      );
      fetchConversation();
    } else {
      NotificationManager.error("Wystąpił błąd!", "Błąd!", 3000);
    }
  };

  function importAll(r: any) {
    let images: any = {};
    r.keys().forEach((item: any, index: Number) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = Object.values(
    importAll(require.context("../ChatIcons/", false, /\.(png|jpe?g|svg)$/))
  );
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (edit) {
        editHandler();
      } else {
        sendHandler();
      }
    }
  };
  return (
    <>
      {props.conversationId ? (
        isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className={classes.main}>
            <div className={classes.header}>
              <div
                style={{
                  background: `transparent url("${
                    images[chat.avatarId - 1]
                  }")  no-repeat center center/contain`,
                }}
              ></div>
              <p>{chat.name}</p>
              <div className={classes.headerNav}>
                <Icon.PersonFill
                  onClick={() => {
                    props.setShowModal(true);
                    props.setModalContent("usermanagement");
                    props.setAdditionalModalData({
                      id: chat.id,
                      name: chat.name,
                    });
                  }}
                />
                <Icon.PersonPlusFill
                  onClick={() => {
                    props.setShowModal(true);
                    props.setModalContent("addusertochat");
                    props.setAdditionalModalData({
                      id: chat.id,
                      name: chat.name,
                    });
                  }}
                />
                <Icon.PencilFill
                  onClick={() => {
                    props.setShowModal(true);
                    props.setModalContent("editchat");
                    props.setAdditionalModalData({
                      id: chat.id,
                      name: chat.name,
                      avatarId: chat.avatarId,
                    });
                  }}
                />
                <Icon.TrashFill />
              </div>
            </div>
            <div className={classes.chat}>
              {chat.messages.reverse().map((message: any) => {
                let messageTime = props.formatDate(message.sendTime, true);
                return (
                  <div
                    key={message.id}
                    className={
                      message.sender.id === 0
                        ? classes.adminMessage
                        : classes.message
                    }
                  >
                    {message.sender.id !== 0 && (
                      <img
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO-7dlhEBOaxEyaiVVF_T-PY4ylyLjRmJTyCiajDft&s"
                        }
                        alt="avatar"
                      />
                    )}
                    <div>
                      {message.sender.id !== 0 && (
                        <p className={classes.senderUsername}>
                          {message.sender.username}
                        </p>
                      )}
                      <p>{message.content}</p>
                      {message.isEdited && (
                        <p className={classes.edited}>(Edytowano)</p>
                      )}
                    </div>
                    <div className={classes.controls}>
                      {message.isOwned && (
                        <>
                          <Icon.PencilFill
                            onClick={() => {
                              setEdit({
                                text: message.content,
                                id: message.id,
                              });
                            }}
                          />
                          <Icon.TrashFill
                            onClick={() => deleteHandler(message.id)}
                          />
                        </>
                      )}
                      <p>{messageTime}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={classes.bottom}>
              <div className={classes.inputContainer}>
                {edit && (
                  <p onClick={() => setEdit(null)}>
                    Edytuj: {edit.text} <Icon.XCircleFill />
                  </p>
                )}
                <Input
                  ref={chatRef}
                  placeholder="Wiadomość"
                  onKeyDown={handleKeyDown}
                />
              </div>
              <Icon.ArrowRightCircleFill onClick={sendManagement} />
            </div>
          </div>
        )
      ) : (
        <p className={classes.noChatParagraph}>
          Wybierz konwersację z listy lub stwórz nową
        </p>
      )}
    </>
  );
};

export default Conversation;
