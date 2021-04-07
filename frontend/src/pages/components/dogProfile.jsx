import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Card, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import "../css/dogmanager.css";
import "font-awesome/css/font-awesome.min.css";
import goodDog from "../../img/good-dog.jpeg";
import defProfilePic from "../../img/def-pic.jpg";
import ImageUploading from "react-images-uploading";
import axios from "axios";

function DogProfile(props) {
  const bp = require("../../bp.js");
  const storage = require("../../tokenStorage.js");
  const jwt = require("jsonwebtoken");

  const dogID = props.id;

  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok, { complete: true });

  var userID = ud.payload.userId;

  const doEditDog = async (event) => {
    var obj = {
      UserID: userID,
      Name: name,
      Bio: bio,
      Breed: breed,
      Weight: weight,
      Height: height,
      Age: age,
      Sex: sex,
    };

    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: bp.buildPath("editDog"),
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
            storage.storeToken(jwt.refresh(res));
            window.location.href = "/home";
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

  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bio, setBio] = useState("");

  const [details, setShow] = useState(false);
  const showDetails = () => setShow(true);
  const hideDetails = () => setShow(false);

  const [isEditingDog, setEditingDog] = useState(false);

  const [images, setImages] = useState([]);
  const [isImageChanged, setImageChanged] = useState(false);
  const onUpload = (image) => {
    setImages(image);
    setImageChanged(true);
  };

  const onEdit = () => {
    setEditingDog(false);
    doEditDog();
  };

  return (
    <>
      <Button className="dog-profile-btn" onClick={showDetails}>
        <Card border="light" bg="light" className="dog-profile-card">
          <Card.Img variant="top" className="dog-profile-card-img" src={isImageChanged ? images[0].data_url : defProfilePic} />
        </Card>
      </Button>
      <Modal show={details} onHide={hideDetails}>
        {isEditingDog ? (
          <>
            <Modal.Header closeButton onClick={() => setEditingDog(false)}>
              <Modal.Title>Edit Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row className="justify-content-center">
                <ImageUploading single value={images} onChange={onUpload} dataURLKey="data_url">
                  {({ onImageUpload }) => (
                    <>
                      <button className="profile-button" onClick={onImageUpload}>
                        <img className="profile-pic" src={isImageChanged ? images[0].data_url : defProfilePic} />
                      </button>
                    </>
                  )}
                </ImageUploading>
              </Row>
              <br />
              <Form.Group className="dog-name">
                <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
              </Form.Group>

              <Form.Group className="dog-sex">
                <Form.Control type="text" placeholder="Sex" onChange={(e) => setSex(e.target.value)} />
              </Form.Group>

              <Form.Group className="dog-breed">
                <Form.Control type="text" placeholder="Breed" onChange={(e) => setBreed(e.target.value)} />
              </Form.Group>

              <Form.Group className="dog-age">
                <Form.Control type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
              </Form.Group>

              <Form.Group className="dog-weight">
                <Form.Control type="number" placeholder="Weight" onChange={(e) => setWeight(e.target.value)} />
              </Form.Group>

              <Form.Group className="dog-height">
                <Form.Control type="text" placeholder="Height" onChange={(e) => setHeight(e.target.value)} />
              </Form.Group>

              <Form.Group className="dog-bio">
                <textarea className="form-control" rows="5" type="text" placeholder="Bio" onChange={(e) => setBio(e.target.value)}></textarea>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer className="justify-content-center">
              <Button className="edit-prof-btn" onClick={onEdit}>
                Confirm
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            {/* Non editing view */}
            <Modal.Header closeButton onClick={() => setEditingDog(false)}>
              <Modal.Title>Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row className="justify-content-center">
                <img className="profile-pic" src={isImageChanged ? images[0].data_url : defProfilePic} />
              </Row>
              <div>
                <br />
                <p className="profile-text">Name: {props.name}</p>
                <br />
                <p className="profile-text">Sex: {props.sex}</p>
                <br />
                <p className="profile-text">Breed: {props.breed}</p>
                <br />
                <p className="profile-text">Age: {props.age}</p>
                <br />
                <p className="profile-text">Weight: {props.weight}</p>
                <br />
                <p className="profile-text">Height: {props.height}</p>
                <br />
                <p className="bio-text">Bio: {props.bio}</p>
                <br />
              </div>
            </Modal.Body>
            <Row className="justify-content-center">
              <Button className="edit-prof-btn" onClick={() => setEditingDog(true)}>
                Update
              </Button>
              <Button className="edit-prof-btn">Delete</Button>
            </Row>
          </>
        )}
      </Modal>
    </>
  );
}

export default DogProfile;
