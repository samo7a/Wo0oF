import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Button, Modal } from "react-bootstrap";
import "../css/likedDogs.css";
import "../css/editProfile.css";
import goodDog from "../../img/good-dog.jpeg";

export default function DogBanner({ dog }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Row className="justify-content-start row-border">
      <Col sm={2} className="mt-2">
        {/* dog pic on click open profile*/}
        <button className="dog-btn" onClick={() => setOpenModal(true)}>
          <img src={goodDog} fluid className="liked-img" />
        </button>
      </Col>
      <Col sm={3} className="mt-3 ">
        <p className="pt-1 liked-dogs-text">{dog.name}</p>
      </Col>
      <Col sm={5} className="mt-3 mb-3">
        {/* ON click send a message request from user to owner */}
        <Button className="btn-sm liked-dogs-btn-m">Message Owner</Button>
      </Col>
      <Col sm={1} className="mt-3 mb-3">
        {/* ON click remove dog users likes */}
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
            <img className="profile-pic" src={goodDog} alt="" />
          </Row>
          <div>
            <br />
            <p className="profile-text mb-4">Name: {dog.name}</p>
            <p className="profile-text mb-4">Sex: {dog.sex}</p>
            <p className="profile-text mb-4">Breed: {dog.breed}</p>
            <p className="profile-text mb-4">Age: {dog.age}</p>
            <p className="profile-text mb-4">Size: {dog.size}</p>
            <p className="profile-text mb-4">Potty Trained: {dog.isPottyTrained ? "Yes" : "No"}</p>
            <p className="profile-text mb-4">Neutered: {dog.isNeutered ? "Yes" : "No"}</p>
            <p className="bio-text mb-4">Bio: {dog.bio}</p>
          </div>
        </Modal.Body>
      </Modal>
    </Row>
  );
}
