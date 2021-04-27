import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Button, Modal } from "react-bootstrap";
import FaceIcon from "@material-ui/icons/Face";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "../css/likedDogs.css";
import "../css/editProfile.css";
import axios from "axios";

export default function AdopterBanner({ like, updateLikers }) {
  const bp = require("../../bp.js");
  const [openOwnerModal, setOpenOwnerModal] = useState(false);
  const [ownerFName, setOwnerFName] = useState("");
  const [ownerLName, setOwnerLName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerBio, setOwnerBio] = useState("");
  const [dogName, setDogName] = useState("");

  const getOwner = async () => {
    var obj = {
      OwnerID: like.UserID,
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
            setOwnerFName(res.FirstName);
            setOwnerLName(res.LastName);
            setOwnerEmail(res.Email);
            setOwnerPhone(res.Phone);
            setOwnerBio(res.ShortBio);
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
    getOwner(like.UserID);
    getDog(like.DogID);
  }, [updateLikers]);

  return (
    <Row className="justify-content-start row-border">
      <Col sm={2} className="mt-2">
        <button
          className="dog-btn"
          onClick={() => setOpenOwnerModal(true)}
          style={{
            backgroundImage: `url(${"https://wo0of.s3.amazonaws.com/" + like.UserID})`,
            backgroundSize: "cover",
          }}
        ></button>
      </Col>
      <Col sm={10} className=" pl-3">
        <p className="pt-3 liked-dogs-text">
          {ownerFName} likes {dogName}
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
                backgroundImage: `url(${"https://wo0of.s3.amazonaws.com/" + like.UserID})`,
                backgroundSize: "cover",
              }}
            ></div>
          </Row>
          <Row className="justify-content-start mt-5 ml-1">
            <p className="bio-text">
              <FaceIcon className="mr-2 mb-1" />
              {ownerFName + " " + ownerLName}
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
