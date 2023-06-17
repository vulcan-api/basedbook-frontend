import React, { useState, useEffect } from "react";
import ChatSidebar from "./Layout/ChatSidebar";
import Conversation from "./Layout/Conversation";
import Modal from "../../Layout/ModalComponents/Modal";

const Chat = () => {
  const [conversationId, setConversationId] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [trigger, setTrigger] = useState<number>(0);
  const [additionalModalData, setAdditionalModalData] = useState<any>({});
  const [vievportWidth, setVievportWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setVievportWidth(window.innerWidth);
    });
  }, []);

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

  //1100px max-width

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
      {(conversationId === 0 || vievportWidth > 1200) && <ChatSidebar
        chooseConversation={setConversationId}
        formatDate={formatDate}
        setShowModal={setShowModal}
        setModalContent={setModalContent}
        trigger={trigger}
      />}
      {(vievportWidth > 1200 || conversationId > 0) && (
        <Conversation
          setConversationId={setConversationId}
          conversationId={conversationId}
          formatDate={formatDate}
          setShowModal={setShowModal}
          setModalContent={setModalContent}
          trigger={trigger}
          setTrigger={setTrigger}
          setAdditionalModalData={setAdditionalModalData}
          vievportWidth={vievportWidth}
        />
      )}
    </>
  );
};

export default Chat;
