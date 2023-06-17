import React, { useState, useEffect, useCallback } from "react";
import classes from "./ChatSidebar.module.css";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import getUserObject from "../../../Lib/getUser";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import * as Icon from "react-bootstrap-icons";

const ChatSidebar = (props: {
  chooseConversation: Function;
  formatDate: Function;
  setShowModal: Function;
  setModalContent: Function;
  trigger: number;
}) => {
  const [conversations, setConversations] = useState<
    typeof conversationInterface
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let user = getUserObject();

  const conversationInterface = [
    {
      id: Number,
      lastMessage: {
        content: String,
        id: Number,
        sendTime: Date,
        sender: {
          username: String,
        },
      },
      name: String,
      avatarId: Number,
    },
  ];

  const fetchChat = useCallback(() => {
    fetch(`${process.env.REACT_APP_REQUEST_URL}/chat/conversations`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode >= 400) {
          NotificationManager.error(
            "Błąd przy pobieraniu konwersacji!",
            "Błąd",
            3000
          );
        } else {
          setConversations(data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchChat();
  }, [fetchChat, props.trigger]);

  let lastMessageTime: String;

  const openModalHandler = () => {
    props.setShowModal(true);
    props.setModalContent("createchat");
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

  return (
    <>
      <div className={classes.main}>
        <div className={classes.top}>
          <h2>Chat</h2>
          {isLoading && <LoadingSpinner />}
          <div className={classes.conversations}>
            {conversations.length > 0 &&
              conversations.map((conversation: any) => {
                if (conversation.lastMessage) {
                  lastMessageTime = props.formatDate(
                    conversation.lastMessage.sendTime
                  );
                }

                return (
                  <div
                    className={classes.conversation}
                    key={conversation.id}
                    onClick={() => props.chooseConversation(conversation.id)}
                  >
                    <div
                      className={classes.avatar}
                      style={{
                        background: `transparent url("${
                          images[conversation.avatarId - 1]
                        }")  no-repeat center center/contain`,
                      }}
                    ></div>
                    <div className={classes.info}>
                      <h3>{conversation.name}</h3>
                      {conversation.lastMessage && (
                        <div>
                          <p>
                            {user.username ===
                              conversation.lastMessage.sender.username &&
                              "Ty: "}
                            {conversation.lastMessage.content}
                          </p>
                          <p>{lastMessageTime}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={classes.bottom}>
          <Icon.EnvelopeFill
            onClick={() => {
              props.setShowModal(true);
              props.setModalContent("invitations");
            }}
          />
          <div onClick={openModalHandler}>
            <Icon.PlusCircleFill />
            <p>Utwórz chat</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
