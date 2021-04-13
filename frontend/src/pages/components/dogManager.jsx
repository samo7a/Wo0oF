import { useState, useReducer, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import DogProfile from "./dogProfile";
import defProfilePic from "../../img/def-pic.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "../css/dogmanager.css";

export const ACTIONS = {
  ADD_DOG: "add-dog",
  EDIT_DOG: "edit-dog",
  DELETE_DOG: "delete-dog",
};

function reducer(dogs, action) {
  switch (action.type) {
    case ACTIONS.ADD_DOG:
      return [
        ...dogs,
        newDog(
          action.payload.id,
          action.payload.name,
          action.payload.breed,
          action.payload.sex,
          action.payload.age,
          action.payload.height,
          action.payload.bio
        ),
      ];
    case ACTIONS.EDIT_DOG:
      return dogs.map((dog) => {
        if (dog.id === action.payload.id) {
          return {
            ...dogs,
            name: action.payload.name,
            breed: action.payload.breed,
            sex: action.payload.sex,
            age: action.payload.age,
            height: action.payload.height,
            bio: action.payload.bio,
          };
        }
        return dog;
      });
    case ACTIONS.DELETE_DOG:
      return dogs.filter((dog) => dog.id !== action.payload.id);
    default:
      return dogs;
  }
}

function newDog(id, name, breed, sex, age, height, bio) {
  return {
    id: id,
    name: name,
    breed: breed,
    sex: sex,
    age: age,
    height: height,
    bio: bio,
  };
}

function DogManager() {
  const bp = require("../../bp.js");
  const storage = require("../../tokenStorage.js");
  const jwt = require("jsonwebtoken");
  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok, { complete: true });
  var userID = ud.payload.userId;

  const doCreateDog = async () => {
    var obj = {
      UserID: userID,
      Name: name,
      Bio: bio,
      Breed: breed,
      Height: height,
      Age: age,
      Sex: sex,
    };

    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: bp.buildPath("createDog"),
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
            dispatch({
              type: ACTIONS.ADD_DOG,
              payload: {
                id: res.dogID,
                name: obj.Name,
                breed: obj.Breed,
                sex: obj.Sex,
                age: obj.Age,
                height: obj.Height,
                bio: obj.Bio,
              },
            });
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

  const getOwnerDogs = async () => {
    var obj = {
      id: userID,
    };

    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: bp.buildPath("getOwnerDogs"),
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
            console.log(res);
            res.map((dog) => {
              dispatch({
                type: ACTIONS.ADD_DOG,
                payload: {
                  id: dog._id,
                  name: dog.Name,
                  breed: dog.Breed,
                  sex: dog.Sex,
                  age: dog.Age,
                  height: dog.Height,
                  bio: dog.Bio,
                },
              });
            })
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

  // Modal state variables
  const [addDogModal, setAddDogModal] = useState(false);
  const showAddDogModal = () => setAddDogModal(true);
  const hideAddDogModal = () => setAddDogModal(false);

  // Profile picture state variables
  const [images, setImages] = useState([]);
  const [isImageChanged, setImageChanged] = useState(false);
  const onUpload = (image) => {
    setImages(image);
    setImageChanged(true);
  };

  // Dogs state variables
  const [dogs, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bio, setBio] = useState("");

  // Fetching dogs from API on load once
  useEffect(() => {
    getOwnerDogs();
  }, []);

  function handleAddDog() {
    doCreateDog();
    hideAddDogModal();
    setName("");
    setSex("");
    setBreed("");
    setAge(0);
    setWeight(0);
    setHeight(0);
    setBio("");
  }

  return (
    <>
      {/* Main Dog Manager Page */}
      <Container fluid className="vh-100 bkgd-manager-color" style={{ overflow: "auto" }}>
        {/* Dog Manager Header */}
        <Row className="justify-content-center">
          <Col sm={4}></Col>
          <Col sm={4}>
            <h2 className="title-text-dm">Dog Manager</h2>
          </Col>
          <Col sm={4}>
            <Button className="add-button" onClick={showAddDogModal}>
              Add Dog <i className="fa fa-plus-square"></i>
            </Button>
          </Col>
        </Row>
        {/* Where dog profiles are displayed */}
        <Row className="justify-content-center">
          {dogs.map((dog) => {
            return <DogProfile key={dog.id} dog={dog} dispatch={dispatch} />;
          })}
        </Row>
        <Row>
          <div>
            <br />
            <br />
            <br />
            <br />
          </div>
        </Row>
      </Container>

      {/* Add dog modal */}
      <Modal show={addDogModal} onHide={hideAddDogModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Dog</Modal.Title>
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

          <Form.Group className="dog-height">
            <Form.Control type="text" placeholder="Height" onChange={(e) => setHeight(e.target.value)} />
          </Form.Group>

          <Form.Group className="dog-bio">
            <textarea className="form-control" rows="5" type="text" placeholder="Bio" onChange={(e) => setBio(e.target.value)}></textarea>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button className="edit-prof-btn" onClick={handleAddDog}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DogManager;
