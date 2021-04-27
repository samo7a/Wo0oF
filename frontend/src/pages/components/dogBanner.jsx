import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Button, Modal } from "react-bootstrap";
import FaceIcon from "@material-ui/icons/Face";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "../css/likedDogs.css";
import "../css/editProfile.css";
import axios from "axios";

export default function DogBanner({ like }) {
  const bp = require("../../bp.js");
  const [openDogModal, setOpenDogModal] = useState(false);
  const [openOwnerModal, setOpenOwnerModal] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerBio, setOwnerBio] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogSex, setDogSex] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogAge, setDogAge] = useState("");
  const [dogSize, setDogSize] = useState("");
  const [dogisPottyTrained, setDogisPottyTrained] = useState("");
  const [dogisNeutered, setDogisNeutered] = useState("");
  const [dogBio, setDogBio] = useState("");

  const getOwner = async () => {
    var obj = {
      OwnerID: like.OwnerID,
    };

    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: bp.buildPath("getOwner"),
        headers: {
          "Content-Type": "application/json",
        },

        data: js,
      };

      axios(config)
        .then(function (response) {
          var res = response.data;
          if (res.error) {
            console.log(res);
          } else {
            setOwnerName(res.FirstName + " " + res.LastName);
            setOwnerEmail(res.Email);
            setOwnerPhone(res.Phone);
            setOwnerBio(res.ShortBio);
            setOpenOwnerModal(true);
          }
        })
        .catch(function (error) {
          // setMessage(error);
        });
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const getDog = async () => {
    var obj = {
      DogID: like.DogID,
    };

    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: bp.buildPath("getDog"),
        headers: {
          "Content-Type": "application/json",
        },

        data: js,
      };

      axios(config)
        .then(function (response) {
          var res = response.data;
          if (res.error) {
            console.log(res);
          } else {
            setDogName(res.Name);
            setDogSex(res.Sex);
            setDogBreed(res.Breed);
            setDogAge(res.Age);
            setDogSize(res.Size);
            setDogisPottyTrained(res.isPottyTrained);
            setDogisNeutered(res.isNeutered);
            setDogBio(res.Bio);
            // console.log(res);
          }
        })
        .catch(function (error) {
          // setMessage(error);
        });
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  useEffect(() => {
    getDog(like.DogID);
  }, []);

  return (
    <Row className="justify-content-start row-border">
      <Col sm={2} className="mt-2">
        {/* dog pic on click open profile*/}
        <button
          className="dog-btn"
          onClick={() => setOpenDogModal(true)}
          style={{
            backgroundImage: `url(${"https://wo0of.s3.amazonaws.com/" + like.DogID})`,
            backgroundSize: "cover",
          }}
        ></button>
      </Col>
      <Col sm={8} className=" pl-3">
        <p className="pt-3 liked-dogs-text">{dogName}</p>
      </Col>
      <Col sm={2} className="mt-2 mb-2">
        {/* ON click send a message request from user to owner */}
        <Button className="owner-btn" onClick={() => getOwner(like.OwnerID)}>
          <FaceIcon />
        </Button>
      </Col>

      <Modal centered contentClassName="modal-view" show={openDogModal} onHide={() => setOpenDogModal(false)}>
        <Modal.Header closeButton onClick={() => setOpenDogModal(false)}>
          <Modal.Title>Dog Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ right: "10vh !important" }}>
          <Row className="justify-content-center">
            <img className="liked-img-details" src={"https://wo0of.s3.amazonaws.com/" + like.DogID} alt="" />
          </Row>
          <div>
            <br />
            <p className="modal-text ">
              <p style={{ fontWeight: "500", display: "inline", marginRight: "7px" }}>Name:</p>
              {dogName}
            </p>
            <p className="modal-text ">
              <p style={{ fontWeight: "500", display: "inline", marginRight: "7px" }}>Sex:</p>
              {dogSex}
            </p>
            <p className="modal-text ">
              <p style={{ fontWeight: "500", display: "inline", marginRight: "7px" }}>Breed:</p>
              {dogBreed}
            </p>
            <p className="modal-text ">
              <p style={{ fontWeight: "500", display: "inline", marginRight: "7px" }}>Age:</p>
              {dogAge}
            </p>
            <p className="modal-text ">
              <p style={{ fontWeight: "500", display: "inline", marginRight: "7px" }}>Size:</p>
              {dogSize}
            </p>
            <p className="modal-text ">
              <p style={{ fontWeight: "500", display: "inline", marginRight: "7px" }}>Potty Trained:</p>
              {dogisPottyTrained ? "Yes" : "No"}
            </p>
            <p className="modal-text ">
              <p style={{ fontWeight: "500", display: "inline", marginRight: "7px" }}>Neutered:</p>
              {dogisNeutered ? "Yes" : "No"}
            </p>
            <p style={{ fontWeight: "500", fontSize: "17px", marginLeft: "5%", marginBottom: "2px" }}>Bio:</p>
            <p className="modal-text ">{dogBio}</p>
          </div>
        </Modal.Body>
      </Modal>

      <Modal centered contentClassName="modal-view" show={openOwnerModal} onHide={() => setOpenOwnerModal(false)}>
        <Modal.Header closeButton onClick={() => setOpenOwnerModal(false)}>
          <Modal.Title>Owner Information For {dogName}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ right: "10vh !important" }}>
          <Row className="justify-content-center">
            <div
              className="profile-pic"
              style={{
                backgroundImage: `url(${"https://wo0of.s3.amazonaws.com/" + like.OwnerID})`,
                backgroundSize: "cover",
              }}
            ></div>
          </Row>
          <Row className="justify-content-start mt-5 ml-1">
            <p className="bio-text">
              <FaceIcon className="mr-2 mb-1" />
              {ownerName}
            </p>
          </Row>
          <Row className="justify-content-start ml-1 ">
            <p className="bio-text">
              <PhoneIcon className="mr-2 mb-1" />
              {ownerPhone}
            </p>
          </Row>
          <Row className="justify-content-start ml-1">
            <p className="bio-text ">
              <MailOutlineIcon className="mr-2 mb-1" />
              {ownerEmail}
            </p>
          </Row>
          <Row className="justify-content-start ml-1">
            <p style={{ marginLeft: "5%", fontSize: "17px", marginBottom: "2px", fontWeight: "500" }}>Bio</p>
          </Row>
          <Row className="justify-content-start ml-1">
            <p className="bio-text ">{ownerBio}</p>
          </Row>
        </Modal.Body>
      </Modal>
    </Row>
  );
}
