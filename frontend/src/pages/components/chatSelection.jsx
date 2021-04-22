import React, { useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
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

  return isChatOpen ? (
    <Container fluid className="vh-100">
      {chats.map((chat) => {
        if (chat.id === displayChat) return <ChatScreen chat={chat} handleCloseChat={handleCloseChat} />;
      })}
    </Container>
  ) : (
    <ListGroup className="w-100" style={{ overflow: "auto" }}>
      {chats.map((chat) => (
        <ListGroup.Item>
          <ChatBanner key={chat.id} chat={chat} handleOpenChat={handleOpenChat} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ChatSelection;
