import React, {useState, useEffect, useCallback, useRef} from "react";
//@ts-ignore
import {NotificationManager} from "react-notifications";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import classes from "./Conversation.module.css";
import Input from "../../../Components/Input";
import * as Icon from "react-bootstrap-icons";

const Conversation = (props: {
    conversationId: number;
    formatDate: Function;
}) => {
    const [chat, setChat] = useState<ChatInterface>({
        id: 1,
        name: "test",
        messages: [
            {
                id: "1",
                content: "test",
                sendTime: "2023-06-05T16:47:56.098Z",
                isEdited: false,
                sender: {
                    id: 26,
                    username: "12314323541231",
                },
                isOwned: true,
            },
        ],
        isAdmin: true,
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const chatRef = useRef<any>("");

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
        avatar?: string;
        messages: Message[];
        isAdmin: boolean;
    }

    const fetchConversation = useCallback(() => {
        fetch(`http://localhost:3000/chat/messages/${props.conversationId}`, {
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
                    setChat(data);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [props]);

    useEffect(() => {
        fetchConversation();
    }, [fetchConversation]);

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
            } else {
                NotificationManager.error(
                    "Błąd przy wysyłaniu wiadomości!",
                    "Błąd",
                    3000
                );
            }
        }
    };

    return (
        <>
            {isLoading ? (
                <LoadingSpinner/>
            ) : (
                <div className={classes.main}>
                    <div className={classes.header}>
                        <img
                            src={
                                chat.avatar ||
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO-7dlhEBOaxEyaiVVF_T-PY4ylyLjRmJTyCiajDft&s"
                            }
                            alt="avatar"
                        />
                        <p>{chat.name}</p>
                    </div>
                    <div className={classes.chat}>
                        {chat.messages.map((message: any) => {
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
                                                chat.avatar ||
                                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO-7dlhEBOaxEyaiVVF_T-PY4ylyLjRmJTyCiajDft&s"
                                            }
                                            alt="avatar"
                                        />
                                    )}
                                    <div className={classes.content}>
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
                                        <Icon.PencilFill/>
                                        {message.isOwned && <Icon.TrashFill/>}
                                        <Icon.ReplyFill/>
                                        <p>{messageTime}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={classes.bottom}>
                        <Input ref={chatRef} placeholder="Wiadomość"/>
                        <Icon.ArrowRightCircleFill onClick={sendHandler}/>
                    </div>
                </div>
            )}
        </>
    );
};

export default Conversation;
