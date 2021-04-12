import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Button, Card, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import "../css/dogmanager.css";
import "font-awesome/css/font-awesome.min.css";
// import goodDog from "../../img/good-dog.jpeg";
import defProfilePic from "../../img/def-pic.jpg";
import ImageUploading from "react-images-uploading";
// import axios from "axios";
import { ACTIONS } from "./dogManager";

function DogProfile({ dog, dispatch }) {
  // const bp = require("../../bp.js");
  // const storage = require("../../tokenStorage.js");
  // const jwt = require("jsonwebtoken");

  // const dogID = dog.id;

  // var tok = storage.retrieveToken();
  // var ud = jwt.decode(tok, { complete: true });

  // var userID = ud.payload.userId;

  // const doEditDog = async (event) => {
  //   var obj = {
  //     UserID: userID,
  //     Name: name,
  //     Bio: bio,
  //     Breed: breed,
  //     Weight: weight,
  //     Height: height,
  //     Age: age,
  //     Sex: sex,
  //   };

  //   var js = JSON.stringify(obj);

  //   try {
  //     // Axios code follows
  //     var config = {
  //       method: "post",
  //       url: bp.buildPath("editDog"),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },

  //       data: js,
  //     };

  //     axios(config)
  //       .then(function (response) {
  //         var res = response.data;

  //         if (res.error) {
  //           console.log(res);
  //         } else {
  //           storage.storeToken(jwt.refresh(res));
  //           window.location.href = "/home";
  //         }
  //       })
  //       .catch(function (error) {
  //         // setMessage(error);
  //       });
  //   } catch (e) {
  //     alert(e.toString());
  //     return;
  //   }
  // };

  // Dog state variables
  const [name, setName] = useState(dog.name);
  const [sex, setSex] = useState(dog.sex);
  const [breed, setBreed] = useState(dog.breed);
  const [age, setAge] = useState(dog.age);
  const [weight, setWeight] = useState(dog.weight);
  const [height, setHeight] = useState(dog.height);
  const [bio, setBio] = useState(dog.bio);

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

  const handleEditDog = () => {
    setEditingDog(false);
    // doEditDog();
    dispatch({
      type: ACTIONS.EDIT_DOG,
      payload: {
        id: dog.id,
        name: name,
        breed: breed,
        sex: sex,
        age: age,
        weight: weight,
        height: height,
        bio: bio,
      },
    });
  };

  return (
    <>
      <Button className="dog-profile-btn" onClick={showDetails}>
        <Card border="light" bg="light" className="dog-profile-card">
          <Card.Img variant="top" className="dog-profile-card-img" src={isImageChanged ? images[0].data_url : defProfilePic} alt="" />
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
                        <img className="profile-pic" src={isImageChanged ? images[0].data_url : defProfilePic} alt=""/>
                      </button>
                    </>
                  )}
                </ImageUploading>
              </Row>
              <br />
              <Form.Group className="dog-name">
                <Form.Control type="text" defaultValue={dog.name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
              </Form.Group>

              <Form.Group className="dog-sex">
                <Form.Control type="text" defaultValue={dog.sex} placeholder="Sex" onChange={(e) => setSex(e.target.value)} />
              </Form.Group>

              <Form.Group className="dog-breed">
                <Form.Control type="text" defaultValue={dog.breed} placeholder="Breed" onChange={(e) => setBreed(e.target.value)} />
              </Form.Group>

              <Form.Group className="dog-age">
                <Form.Control type="number" defaultValue={dog.age} placeholder="Age" onChange={(e) => setAge(e.target.value)} />
              </Form.Group>

              <Form.Group className="dog-weight">
                <Form.Control type="number" defaultValue={dog.weight} placeholder="Weight" onChange={(e) => setWeight(e.target.value)} />
              </Form.Group>

              <Form.Group className="dog-height">
                <Form.Control type="text" defaultValue={dog.height} placeholder="Height" onChange={(e) => setHeight(e.target.value)} />
              </Form.Group>

              <Form.Group className="dog-bio">
                <textarea
                  className="form-control"
                  rows="3"
                  type="text"
                  defaultValue={dog.bio}
                  placeholder="Bio"
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button className="edit-prof-btn" onClick={handleEditDog}>
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
                <img className="profile-pic" src={isImageChanged ? images[0].data_url : defProfilePic} alt="" />
              </Row>
              <div>
                <br />
                <p className="profile-text">Name: {dog.name}</p>
                <br />
                <p className="profile-text">Sex: {dog.sex}</p>
                <br />
                <p className="profile-text">Breed: {dog.breed}</p>
                <br />
                <p className="profile-text">Age: {dog.age}</p>
                <br />
                <p className="profile-text">Weight: {dog.weight}</p>
                <br />
                <p className="profile-text">Height: {dog.height}</p>
                <br />
                <p className="bio-text">Bio: {dog.bio}</p>
                <br />
              </div>
            </Modal.Body>
            <Row className="justify-content-center">
              <Button className="edit-prof-btn" onClick={() => setEditingDog(true)}>
                Update
              </Button>
              <Button className="edit-prof-btn" onClick={() => dispatch({ type: ACTIONS.DELETE_DOG, payload: { id: dog.id } })}>
                Delete
              </Button>
            </Row>
          </>
        )}
      </Modal>
    </>
  );
}

export default DogProfile;
