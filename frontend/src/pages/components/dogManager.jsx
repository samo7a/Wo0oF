import { useState, useReducer, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import DogProfile from "./dogProfile";
import defDogPic from "../../img/dogAvatar.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "../css/dogmanager.css";
import "../css/editProfile.css";
import { uploadFile } from "../images.js";

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
          action.payload.size,
          action.payload.bio,
          action.payload.isPottyTrained,
          action.payload.isNeutered
        ),
      ];
    case ACTIONS.EDIT_DOG:
      return dogs.map((dog) => {
        if (dog.id === action.payload.id) {
          return {
            ...dogs,
            id: action.payload.id,
            name: action.payload.name,
            breed: action.payload.breed,
            sex: action.payload.sex,
            age: action.payload.age,
            size: action.payload.size,
            bio: action.payload.bio,
            isPottyTrained: action.payload.isPottyTrained,
            isNeutered: action.payload.isNeutered,
          };
        }
        return dog;
      });
    case ACTIONS.DELETE_DOG:
      return dogs.filter((dog) => dog.id !== action.payload.id);
    default:
      return [];
  }
}

function newDog(id, name, breed, sex, age, size, bio, isPottyTrained, isNeutered) {
  return {
    id: id,
    name: name,
    breed: breed,
    sex: sex,
    age: age,
    size: size,
    bio: bio,
    isNeutered: isNeutered,
    isPottyTrained: isPottyTrained,
  };
}

function DogManager() {
  const bp = require("../../bp.js");
  const storage = require("../../tokenStorage.js");
  const jwt = require("jsonwebtoken");
  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok, { complete: true });
  var userID = ud.payload.userId;
  const [render, setRender] = useState(false);

  const doCreateDog = async () => {
    var obj = {
      UserID: userID,
      Name: name,
      Bio: bio,
      Breed: breed,
      Size: size,
      Age: age,
      Sex: sex,
      isPottyTrained: isPottyTrained,
      isNeutered: isNeutered,
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
            // Dont read this code
            // PLS DO NOT TOUCH
            let tempID = res.dogID;
            let tempID1 = tempID.substring(0, 20);
            let tempID2 = tempID.substring(20, tempID.length);
            tempID2 = parseInt(tempID2, 16);
            tempID2 = tempID2 - 1;
            tempID2 = tempID2.toString(16);
            tempID = tempID1 + tempID2;
            // DONT TOUCH THAT ^

            if (images.length != 0) {
              uploadFile(images[0].file, tempID);
            }

            dispatch({
              type: ACTIONS.ADD_DOG,
              payload: {
                id: tempID,
                name: obj.Name,
                breed: obj.Breed,
                sex: obj.Sex,
                age: obj.Age,
                size: obj.Size,
                bio: obj.Bio,
                isNeutered: obj.isNeutered,
                isPottyTrained: obj.isPottyTrained,
              },
            });
            setImageChanged(false);
            setImages([]);
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
                  size: dog.Size,
                  bio: dog.Bio,
                  isNeutered: dog.isNeutered,
                  isPottyTrained: dog.isPottyTrained,
                },
              });
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
  const [isPottyTrained, setIsPottyTrained] = useState(false);
  const [isNeutered, setIsNeutered] = useState(false);
  const [size, setSize] = useState("");
  const [bio, setBio] = useState("");
  const [isAddingDog, setAddingDog] = useState(false);
  const [resmsg, setResmsg] = useState("");

  // Fetching dogs from API on load once
  useEffect(() => {
    dispatch("default");
    getOwnerDogs();
  }, []);

  function handleAddDog() {
    doCreateDog();
    setName("");
    setSex("");
    setBreed("");
    setAge(0);
    setIsPottyTrained(false);
    setIsNeutered(false);
    setSize("");
    setBio("");
    setResmsg("DOG ADDED");
    setTimeout(() => {
      setResmsg("");
    }, 2000);
  }

  return !isAddingDog ? (
    <Container fluid className=" bkgd-manager-color" style={{ overflow: "auto", height: "95vh" }}>
      {/* Dog Manager Header */}
      <Row className="justify-content-center">
        <Col sm={4}></Col>
        <Col sm={4}>
          <h2 className="title-text-dm">Dogs</h2>
        </Col>
        <Col sm={4}>
          <Button className="add-button" onClick={() => setAddingDog(true)}>
            Add Dog <i className="fa fa-plus-square"></i>
          </Button>
        </Col>
      </Row>
      {/* Where dog proles are displayed */}
      <Row className="justify-content-center">
        {dogs.map((dog) => {
          return <DogProfile key={dog.id} dog={dog} dispatch={dispatch} getOwnerDogs={getOwnerDogs} />;
        })}
      </Row>
      <Row>
        <div>
          <br />
        </div>
      </Row>
    </Container>
  ) : (
    <Container fluid className=" bkgd-manager-color" style={{ overflow: "auto", height: "95vh" }}>
      <Row className="justify-content-center">
        <h3 style={{ marginTop: "20px", color: "white" }}>Add Dog</h3>
      </Row>
      <Row className="justify-content-center ">
        <ImageUploading single value={images} onChange={onUpload} dataURLKey="data_url">
          {({ onImageUpload }) => (
            <>
              <button
                className="dog-pic-btn"
                onClick={onImageUpload}
                style={{ backgroundImage: `url(${isImageChanged ? images[0].data_url : defDogPic})`, backgroundSize: "cover" }}
              ></button>
            </>
          )}
        </ImageUploading>
      </Row>
      <br />
      <Row className="justify-content-center">
        <Form style={{ width: "55%", color: "white", fontSize: "18px" }}>
          <Form.Group>
            <Form.Label>Name: </Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Breed: </Form.Label>
            <Form.Control type="text" placeholder="Breed" onChange={(e) => setBreed(e.target.value)} />
          </Form.Group>
          <Form.Group style={{ display: "inline" }}>
            <Form.Label style={{ display: "inline" }}> Sex: </Form.Label>
            <Form.Control className="w-25" as="select" custom onChange={(e) => setSex(e.target.value)}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group style={{ display: "inline" }}>
            <Form.Label style={{ display: "inline" }}> Age: </Form.Label>
            <Form.Control style={{ display: "inline" }} className="w-25" type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
          </Form.Group>
          <Form.Group style={{ display: "inline" }}>
            <Form.Label style={{ display: "inline" }}> Size: </Form.Label>
            <Form.Control className="w-25" as="select" custom onChange={(e) => setSize(e.target.value)}>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </Form.Control>
          </Form.Group>
          <Form.Group style={{ marginTop: "15px" }}>
            <Form.Label style={{ display: "inline" }}>Potty Trained </Form.Label>
            <Form.Check style={{ display: "inline" }} onChange={() => setIsPottyTrained(!isPottyTrained)} />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ display: "inline" }}>Neutered </Form.Label>
            <Form.Check style={{ display: "inline" }} onChange={() => setIsNeutered(!isNeutered)} />
          </Form.Group>
          <Form.Group>
            <textarea className="form-control" rows="2" type="text" placeholder="Bio" onChange={(e) => setBio(e.target.value)}></textarea>
          </Form.Group>
        </Form>
      </Row>
      <Row className="justify-content-center">
        <Button className="edit-prof-btn" onClick={handleAddDog}>
          Add
        </Button>
        <Button
          className="edit-prof-btn"
          onClick={() => {
            setResmsg("");
            setAddingDog(false);
          }}
        >
          Back
        </Button>
        <div>
          <br />
        </div>
      </Row>
      <Row className="justify-content-center">
        <span className="dog-added animated pulse ">{resmsg}</span>
      </Row>
    </Container>
  );
}

export default DogManager;
