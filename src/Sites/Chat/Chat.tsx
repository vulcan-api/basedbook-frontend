import React, { useState } from "react";
import ChatSidebar from "./Layout/ChatSidebar";
import Conversation from "./Layout/Conversation";
import Modal from "../../Layout/ModalComponents/Modal";

const Chat = () => {
  const [conversationId, setConversationId] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [trigger, setTrigger] = useState<number>(0);

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

  const closeModalHelper = () => {
    setShowModal(false);
    setModalContent("");
    setTrigger(trigger + 1);
  };

  return (
    <>
      {showModal && (
        <Modal
          modalContent={modalContent}
          onClose={closeModalHelper}
          onBgClick={closeModalHelper}
        />
      )}
      <ChatSidebar
        chooseConversation={setConversationId}
        formatDate={formatDate}
        setShowModal={setShowModal}
        setModalContent={setModalContent}
        trigger={trigger}
      />
      <Conversation
        conversationId={conversationId}
        formatDate={formatDate}
        setShowModal={setShowModal}
        setModalContent={setModalContent}
        trigger={trigger}
        setTrigger={setTrigger}
      />
    </>
  );
};

export default Chat;
