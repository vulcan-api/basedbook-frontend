import React, { useState, useEffect } from "react";
import classes from "./ChatSidebar.module.css";
//@ts-ignore
import { NotificationManager } from "react-notifications";
import getUserObject from "../../../Lib/getUser";

const ChatSidebar = () => {
  const [conversations, setConversations] = useState<
    typeof conversationInterface
  >([]);

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

  const fetchChat = () => {
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
        }
      });
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <>
      <div className={classes.main}>
        <div className={classes.top}>
          <h2>Chat</h2>
          <div className={classes.conversations}>
            {conversations.map((conversation: any) => {
              const lastMessageDate = new Date(
                conversation.lastMessage.sendTime
              );

              let lastMessageTime: String;

              if (
                lastMessageDate.getDate() === new Date().getDate() &&
                lastMessageDate.getMonth() === new Date().getMonth() &&
                lastMessageDate.getFullYear() === new Date().getFullYear()
              ) {
                lastMessageTime =
                  lastMessageDate.getHours() +
                  ":" +
                  lastMessageDate.getMinutes();
              } else {
                lastMessageTime =
                  lastMessageDate.getDate() + "/" + lastMessageDate.getMonth();
              }

              return (
                <div className={classes.conversation} key={conversation.id}>
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
