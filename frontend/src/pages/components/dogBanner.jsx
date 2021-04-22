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
          <img
            className="liked-img"
            src={
              process.env.NODE_ENV === "production"
                ? "https://wo0of.herokuapp.com/getSingleImage/" + dog._id
                : "http://localhost:5000/getSingleImage/" + dog._id
            }
            alt=""
          />
        </button>
      </Col>
      <Col sm={3} className="mt-3 ">
        <p className="pt-1 liked-dogs-text">{dog.Name}</p>
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
            <img
              className="liked-img-details"
              src={
                process.env.NODE_ENV === "production"
                  ? "https://wo0of.herokuapp.com/getSingleImage/" + dog._id
                  : "http://localhost:5000/getSingleImage/" + dog._id
              }
              alt=""
            />
          </Row>
          <div>
            <br />
            <p className="profile-text mb-4">Name: {dog.Name}</p>
            <p className="profile-text mb-4">Sex: {dog.Sex}</p>
            <p className="profile-text mb-4">Breed: {dog.Breed}</p>
            <p className="profile-text mb-4">Age: {dog.Age}</p>
            <p className="profile-text mb-4">Size: {dog.Size}</p>
            <p className="profile-text mb-4">Potty Trained: {dog.isPottyTrained ? "Yes" : "No"}</p>
            <p className="profile-text mb-4">Neutered: {dog.isNeutered ? "Yes" : "No"}</p>
            <p className="bio-text mb-4">Bio: {dog.Bio}</p>
          </div>
        </Modal.Body>
      </Modal>
    </Row>
  );
}
