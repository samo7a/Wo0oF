import { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/dogcard.css";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";

function DogCard({ dog, removeDogCard }) {
  const bp = require("../../bp.js");
  const storage = require("../../tokenStorage.js");
  const jwt = require("jsonwebtoken");
  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok, { complete: true });
  var userID = ud.payload.userId;
  const [source, setSource] = useState("");

  const likeDog = async () => {
    var obj = {
      UserID: userID,
      Dog: dog,
      IsLiked: true,
    };

    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: bp.buildPath("likeDog"),
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
          }
        })
        .catch(function (error) {});
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const skipDog = async () => {
    var obj = {
      UserID: userID,
      Dog: dog,
      IsLiked: false,
    };

    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: bp.buildPath("likeDog"),
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
          }
        })
        .catch(function (error) {});
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const [isFlipped, setFlipped] = useState(false);
  const flipCard = () => setFlipped(!isFlipped);

  function handleLike() {
    likeDog();
    removeDogCard(dog._id);
  }

  function handleSkip() {
    skipDog();
    removeDogCard(dog._id);
  }

  useEffect(() => {
    // Update the document title using the getPhoto API
  }, []);

  return (
    <>
      {!isFlipped ? (
        <button className="flip-btn" onClick={flipCard}>
          <div
            className="dog-card"
            style={{
              backgroundImage: `url(https://wo0of.s3.amazonaws.com/${dog._id})`,
            }}
          >
            <h3 className="dog-card-title">{dog.Name}</h3>
          </div>
        </button>
      ) : (
        <button className="flip-btn" onClick={flipCard}>
          <div className="dog-card list-text" style={{ overflow: "auto" }}>
            <ListGroup>
              <ListGroupItem>
                <p>Name: </p>
                {dog.Name}
              </ListGroupItem>
              <ListGroupItem>
                <p>Breed: </p>
                {dog.Breed}
              </ListGroupItem>
              <ListGroupItem>
                <p>Age: </p>
                {dog.Age}
              </ListGroupItem>
              <ListGroupItem>
                <p>Sex: </p>
                {dog.Sex}
              </ListGroupItem>
              <ListGroupItem>
                <p>Size: </p>
                {dog.Size}
              </ListGroupItem> 
              <ListGroupItem>
                <p>Potty Trained: </p>
                {dog.isPottyTrained ? "Yes" : "No"}
              </ListGroupItem>
              <ListGroupItem>
                <p>Neutered: </p>
                {dog.isNeutered ? "Yes" : "No"}
              </ListGroupItem>
              <ListGroupItem>
                <p>Bio: </p>
                {dog.Bio}
              </ListGroupItem>
            </ListGroup>
          </div>
        </button>
      )}
      <Row className="justify-content-center">
        <button className="like-button" onClick={handleLike}>
          <i className="fa fa-heart"></i>
        </button>
        <button className="dislike-button" onClick={handleSkip}>
          <i className="fa fa-arrow-right"></i>
        </button>
      </Row>
    </>
  );
}

export default DogCard;
