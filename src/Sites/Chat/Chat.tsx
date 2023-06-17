import React, { useState } from "react";
import ChatSidebar from "./Layout/ChatSidebar";
import Conversation from "./Layout/Conversation";
import Modal from "../../Layout/ModalComponents/Modal";

const Chat = () => {
  const [conversationId, setConversationId] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [trigger, setTrigger] = useState<number>(0);
  const [additionalModalData, setAdditionalModalData] = useState<any>({});

  function formatDate(timestamp: number): string {
    const now = new Date();
    const messageDate = new Date(timestamp);

    if (
      messageDate.getDate() === now.getDate() &&
      messageDate.getMonth() === now.getMonth() &&
      messageDate.getFullYear() === now.getFullYear()
    ) {
      const hours = messageDate.getHours();
      const minutes = messageDate.getMinutes();
      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      return `${formattedHours}:${formattedMinutes}`;
    }

    if (messageDate.getFullYear() === now.getFullYear()) {
      const month = messageDate.getMonth() + 1;
      const day = messageDate.getDate();
      return `${day}.${month < 10 ? "0" + month : month}`;
    }

    return messageDate.toLocaleDateString();
  }

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
          additionalModalData={additionalModalData}
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
        setConversationId={setConversationId}
        conversationId={conversationId}
        formatDate={formatDate}
        setShowModal={setShowModal}
        setModalContent={setModalContent}
        trigger={trigger}
        setTrigger={setTrigger}
        setAdditionalModalData={setAdditionalModalData}
      /> 
    </>
  );
};

export default Chat;
