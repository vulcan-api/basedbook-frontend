import React, { useState } from "react";
import ChatSidebar from "./Layout/ChatSidebar";
import Conversation from "./Layout/Conversation";

const Chat = () => {
  const [conversationId, setConversationId] = useState<number>(-1);

  const formatDate = (date: Date, hour: Boolean) => {
    const messageDate = new Date(date);

    if (
      messageDate.getDate() === new Date().getDate() &&
      messageDate.getMonth() === new Date().getMonth() &&
      messageDate.getFullYear() === new Date().getFullYear()
    ) {
      return messageDate.getHours() + ":" + messageDate.getMinutes();
    } else {
      if (messageDate.getDate() < 10) {
        if (messageDate.getMonth() < 10) {
          if (hour) {
            return (
              "0" +
              messageDate.getDate() +
              "/0" +
              messageDate.getMonth() +
              " " +
              messageDate.getHours() +
              ":" +
              messageDate.getMinutes()
            );
          } else {
            return "0" + messageDate.getDate() + "/0" + messageDate.getMonth();
          }
        } else {
          if (hour) {
            return (
              "0" +
              messageDate.getDate() +
              "/" +
              messageDate.getMonth() +
              " " +
              messageDate.getHours() +
              ":" +
              messageDate.getMinutes()
            );
          } else {
            return "0" + messageDate.getDate() + "/" + messageDate.getMonth();
          }
        }
      }
    }
  };

  return (
    <>
      <ChatSidebar
        chooseConversation={setConversationId}
        formatDate={formatDate}
      />
      <Conversation conversationId={conversationId} formatDate={formatDate} />
    </>
  );
};

export default Chat;
