import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Button, Modal } from "react-bootstrap";
import FaceIcon from "@material-ui/icons/Face";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "../css/likedDogs.css";
import "../css/editProfile.css";

export default function AdopterBanner({ adopter, dog }) {
  const [openOwnerModal, setOpenOwnerModal] = useState(false);

  return (
    <Row className="justify-content-start row-border">
      <Col sm={2} className="mt-2">
        <button
          className="dog-btn"
          onClick={() => setOpenOwnerModal(true)}
          style={{
            backgroundImage: `url(${"https://wo0of.s3.amazonaws.com/" + adopter.id})`,
            backgroundSize: "cover",
          }}
        ></button>
      </Col>
      <Col sm={10} className=" pl-3">
        <p className="pt-3 liked-dogs-text">
          {adopter.Fname} likes {dog.Name}
        </p>
      </Col>

      <Modal centered contentClassName="modal-view" show={openOwnerModal} onHide={() => setOpenOwnerModal(false)}>
        <Modal.Header closeButton onClick={() => setOpenOwnerModal(false)}>
          <Modal.Title>Potential Adopter</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ right: "10vh !important" }}>
          <Row className="justify-content-center">
            <div
              className="profile-pic"
              style={{
                backgroundImage: `url(${"https://wo0of.s3.amazonaws.com/" + dog.OwnerID})`,
                backgroundSize: "cover",
              }}
            ></div>
          </Row>
          <Row className="justify-content-start mt-5 ml-1">
            <p className="bio-text">
              <FaceIcon className="mr-2 mb-1" />
              {adopter.Fname + " " + adopter.Lname}
            </p>
          </Row>
          <Row className="justify-content-start ml-1 ">
            <p className="bio-text">
              <PhoneIcon className="mr-2 mb-1" />
              {adopter.Phone}
            </p>
          </Row>
          <Row className="justify-content-start ml-1">
            <p className="bio-text ">
              <MailOutlineIcon className="mr-2 mb-1" />
              {adopter.Email}
            </p>
          </Row>
          <Row className="justify-content-start ml-1">
            <p style={{ marginLeft: "5%", fontSize: "17px", marginBottom: "2px", fontWeight: "500" }}>Bio</p>
          </Row>
          <Row className="justify-content-start ml-1">
            <p className="bio-text ">{adopter.Bio}</p>
          </Row>
        </Modal.Body>
      </Modal>
    </Row>
  );
}
