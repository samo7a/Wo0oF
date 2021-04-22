import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import ChatBanner from "./chatBanner";
import ChatScreen from "./chatScreen";

const ChatSelection = () => {
  const [chats, setChats] = useState([
    {
      id: 1,
      user: "Harry Balsach",
    },
    {
      id: 2,
      user: "Mike Oxlong",
    },
    {
      id: 3,
      user: "Myra Ightnut",
    },
  ]);

  const [isChatOpen, setChatOpen] = useState(false);
  const [displayChat, setDisplayChat] = useState();

  function handleOpenChat(chatID) {
    setChatOpen(true);
    setDisplayChat(chatID);
  }

  function handleCloseChat() {
    setChatOpen(false);
    setDisplayChat();
  }

  return (
    <Container fluid className="vh-100">
      {isChatOpen
        ? chats.map((chat) => {
            if (chat.id === displayChat) return <ChatScreen chat={chat} handleCloseChat={handleCloseChat} />;
          })
        : chats.map((chat) => <ChatBanner key={chat.id} chat={chat} handleOpenChat={handleOpenChat} />)}
    </Container>
  );
};

export default ChatSelection;
