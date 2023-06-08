import React, { useState, useEffect, useCallback } from "react";
import classes from "./ChatSidebar.module.css";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import getUserObject from "../../../Lib/getUser";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const ChatSidebar = (props: { chooseConversation: Function, formatDate: Function }) => {
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
    },
  ];

  const fetchChat = useCallback(() => {
    fetch("http://localhost:3000/chat/conversations", {
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
          props.chooseConversation(data[0].id)
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props]);

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);

  let lastMessageTime: String;

  return (
    <>
      <div className={classes.main}>
        <div className={classes.top}>
          <h2>Chat</h2>
          {isLoading && <LoadingSpinner />}
          <div className={classes.conversations}>
            {conversations.length > 0 &&
              conversations.map((conversation: any) => {
                lastMessageTime = props.formatDate(conversation.lastMessage.sendTime, false);

                return (
                  <div
                    className={classes.conversation}
                    key={conversation.id}
                    onClick={() => props.chooseConversation(conversation.id)}
                  >
                    <div className={classes.avatar}>
                      <img
                        src={
                          conversation.avatar ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO-7dlhEBOaxEyaiVVF_T-PY4ylyLjRmJTyCiajDft&s"
                        }
                        alt="avatar"
                      />
                    </div>
                    <div className={classes.info}>
                      <h3>{conversation.name}</h3>
                      <div>
                        <p>
                          {user.username ===
                            conversation.lastMessage.sender.username && "Ty: "}
                          {conversation.lastMessage.content}
                        </p>
                        <p>{lastMessageTime}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
