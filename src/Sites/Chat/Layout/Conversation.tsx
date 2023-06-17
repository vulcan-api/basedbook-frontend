import React, { useState, useEffect, useCallback, useRef } from "react";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import classes from "./Conversation.module.css";
import Input from "../../../Components/Input";
import * as Icon from "react-bootstrap-icons";
import io from "socket.io-client";
import Avatar from "../../../Components/Avatar";

interface ConversationProps {
  setConversationId: Function;
  conversationId: number;
  formatDate: Function;
  setShowModal: Function;
  setModalContent: Function;
  trigger: number;
  setTrigger: Function;
  setAdditionalModalData: Function;
  vievportWidth: number;
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
  const [conversationMembersCount, setConversationMembersCount] = useState(0);
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
  const [socket] = useState(
    io(`${process.env.REACT_APP_REQUEST_URL}/socket`, {
      transports: ["websocket"],
      transportOptions: {
        websocket: {
          extraHeaders: {
            Cookie: document.cookie,
          },
        },
      },
    })
  );

  const getConversationMembersCount = useCallback(() => {
    fetch(
      `${process.env.REACT_APP_REQUEST_URL}/chat/conversation/${props.conversationId}/members`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((json) => setConversationMembersCount(json.length));
  }
  , [props.conversationId]);

  const fetchConversation = useCallback(() => {
    //TODO: Add pagination
    fetch(
      `${process.env.REACT_APP_REQUEST_URL}/chat/messages/${props.conversationId}?take=100000`,
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
    if (chatRef.current.value) props.setTrigger(props.trigger + 1);
  };

  useEffect(() => {
    fetchConversation();
    getConversationMembersCount();

    socket.emit("join", {
      conversationId: props.conversationId,
    });

    socket.on("receiveMessage", () => {
      fetchConversation();
      chatRef.current.value = "";
      props.setTrigger(props.trigger + 1);
    });

    return () => {
      socket.emit('leave', { conversationId: props.conversationId });
    };
  }, [fetchConversation, props, socket, getConversationMembersCount]);

  const editHandler = async () => {
    let body = {
      content: chatRef.current.value,
    };
    if (chatRef.current.value.length > 0) {
      const response = await fetch(
        `${process.env.REACT_APP_REQUEST_URL}/chat/edit/${edit.id}`,
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
      socket.emit("sendMessage", body);
    }
  };

  const deleteHandler = async (id: number) => {
    const response = await fetch(
      `${process.env.REACT_APP_REQUEST_URL}/chat/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
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
    r.keys().forEach((item: any) => {
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

  const messageLengthHandler = (event: any) => {
    if (event.target.value.length > 300) {
      event.target.value = event.target.value.slice(0, 300);
      NotificationManager.error(
        "Wiadomość nie może być dłuższa niż 300 znaków!",
        "Za długa wiadomość!",
        3000
      );
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
              {
                props.vievportWidth < 1200 && (
                  <Icon.ArrowLeft
                    onClick={() => props.setConversationId(0)}
                  />
                )
              }
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
                      setConversationId: props.setConversationId,
                    });
                  }}
                />
                {chat.isAdmin && (
                  <>
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
                    <Icon.TrashFill onClick={() => {
                      props.setShowModal(true);
                      props.setModalContent("deleteconversation");
                      props.setAdditionalModalData({
                        id: chat.id,
                        name: chat.name,
                      });
                    }} />
                  </>
                )}
                {conversationMembersCount > 1 && <Icon.BoxArrowInRight onClick={
                  () => {
                    props.setShowModal(true);
                    props.setModalContent("leaveconversation");
                    props.setAdditionalModalData({
                      setConversationId: props.setConversationId,
                      id: chat.id,
                      name: chat.name,
                    });
                  }
                }/>}
              </div>
            </div>
            <div className={classes.chat}>
              {chat.messages.map((message: any) => {
                let messageTime = props.formatDate(message.sendTime);
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
                      <Avatar
                        userId={message.sender.id}
                        className={classes.avatar}
                      />
                    )}
                    <div>
                      {message.sender.id !== 0 && (
                        <p className={classes.senderUsername}>
                          {message.sender.username}
                        </p>
                      )}
                      <p
                        style={
                          message.sender.id === 0
                            ? { color: "var(--main-400)" }
                            : {}
                        }
                        className={classes.content}
                      >
                        {message.content}
                      </p>
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
                    Edytuj: {edit.text.slice(0, 20)}... <Icon.XCircleFill />
                  </p>
                )}
                <Input
                  ref={chatRef}
                  placeholder="Wiadomość"
                  onKeyDown={handleKeyDown}
                  onChange={messageLengthHandler}
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
