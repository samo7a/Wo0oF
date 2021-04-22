import React, { useState } from "react";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import "../css/chats.css";
import ChatMessage from "./chatMessage";

export default function ChatScreen({ chat, handleCloseChat }) {
  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    setText("");
  };

  function handleSubmit(e) {
    // e.preventDefault();
    // sendMessage();
  }

  return (
    <div className="d-flex flex-column flex-grow-1" style={{ height: "90vh" }}>
      <Row className="chat-header">
        <Col sm={2}>
          <Button className="btn-danger" onClick={() => handleCloseChat()}>
            Close
          </Button>
        </Col>
        <Col sm={10}>
          <h4>{chat.user}</h4>
        </Col>
      </Row>
      <div className="flex-grow-1 overflow-auto">{messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}</div>
      {/* <Row className=""> */}
      <Form className="chat-form" onSubmit={handleSubmit}>
        <Form.Group className="">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              placeholder="Send a message..."
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <InputGroup.Append>
              <Button type="submit" style={{ width: "100px" }}>
                Send
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
      {/* </Row> */}
    </div>
  );
}
