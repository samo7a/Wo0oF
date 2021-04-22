import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import defProfilePic from "../../img/def-pic.jpg";

export default function ChatBanner({ chat, handleOpenChat }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Row className="justify-content-start row-border">
      <Col sm={2} className="mt-2">
        {/* chat pic on click open profile*/}
        <button className="chat-btn" onClick={() => setOpenModal(true)}>
          <img src={defProfilePic} fluid className="liked-img" />
        </button>
      </Col>
      <Col sm={4} className="mt-3 ">
        <p className="pt-1 liked-dogs-text">{chat.user}</p>
      </Col>
      <Col sm={4} className="mt-3 mb-3">
        {/* ON click send a message request from user to owner */}
        <Button className="btn-sm liked-dogs-btn-m" onClick={() => handleOpenChat(chat.id)}>
          Open Chat
        </Button>
      </Col>
      <Col sm={1} className="mt-3 mb-3">
        {/* ON click remove chat users likes */}
        <Button className="btn-sm btn-danger liked-dogs-btn">
          <i className="fa fa-times" aria-hidden="true"></i>
        </Button>
      </Col>
      <Modal centered contentClassName="modal-view" show={openModal} onHide={() => setOpenModal(false)}>
        <Modal.Header closeButton onClick={() => setOpenModal(false)}>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ right: "10vh !important" }}>
          <Row className="justify-content-center">
            <img className="profile-pic" src={defProfilePic} alt="" />
          </Row>
          <div>
            <br />
            <p className="profile-text mb-4">Name: {chat.user}</p>
          </div>
        </Modal.Body>
      </Modal>
    </Row>
  );
}
