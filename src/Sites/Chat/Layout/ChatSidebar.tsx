import React, { useState, useEffect } from "react";
import classes from "./ChatSidebar.module.css";
//@ts-ignore
import {NotificationManager} from "react-notifications";

const ChatSidebar = () => {
  const [conversations, setConversations] = useState<any>([]);

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
            {conversations.map((conversation: any) => (
              <div className={classes.conversation}>
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
                  <h3>{conversation.conversation.name}</h3>
                  <p>
                    {conversation.conversation.lastMessage ||
                      "Sample last message"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
