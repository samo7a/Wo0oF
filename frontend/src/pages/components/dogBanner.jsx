import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Button, Modal } from "react-bootstrap";
import "../css/likedDogs.css";
import "../css/editProfile.css";

export default function DogBanner({ dog }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Row className="justify-content-start row-border">
      <Col sm={2} className="mt-2">
        {/* dog pic on click open profile*/}
        <button className="dog-btn" onClick={() => setOpenModal(true)}>
          <img className="liked-img" src={"https://wo0of.s3.amazonaws.com/" + dog._id} alt="" />
        </button>
      </Col>
      <Col sm={6} className="mt-3 pl-0">
        <p className="pt-1 liked-dogs-text">{dog.Name}</p>
      </Col>
      <Col sm={2} className="mt-2 mb-2">
        {/* ON click send a message request from user to owner */}
        <Button className="btn-sm liked-dogs-btn-m">
          <i className="fa fa-envelope"></i>
        </Button>
      </Col>
      <Col sm={2} className="mt-2 mb-2">
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
            <img className="liked-img-details" src={"https://wo0of.s3.amazonaws.com/" + dog._id} alt="" />
          </Row>
          <div>
            <br />
            <p className="modal-text ">Name: {dog.Name}</p>
            <p className="modal-text ">Sex: {dog.Sex}</p>
            <p className="modal-text ">Breed: {dog.Breed}</p>
            <p className="modal-text ">Age: {dog.Age}</p>
            <p className="modal-text ">Size: {dog.Size}</p>
            <p className="modal-text ">Potty Trained: {dog.isPottyTrained ? "Yes" : "No"}</p>
            <p className="modal-text ">Neutered: {dog.isNeutered ? "Yes" : "No"}</p>
            <p className="bio-text ">Bio: {dog.Bio}</p>
          </div>
        </Modal.Body>
      </Modal>
    </Row>
  );
}
