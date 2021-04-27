import React, { useState, useEffect } from "react";
import { ListGroup, Container, Row } from "react-bootstrap";
import "../css/likedDogs.css";
import DogBanner from "./dogBanner";
import axios from "axios";

export default function LikedPage({ updateLikedDogs }) {
  const bp = require("../../bp.js");
  const storage = require("../../tokenStorage.js");
  const jwt = require("jsonwebtoken");
  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok, { complete: true });
  var userID = ud.payload.userId;

  const [likedDogsArr, setLikedDogsArr] = useState([]);

  const getLikedDogs = async () => {
    var obj = {
      id: userID,
    };

    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: bp.buildPath("getLikedDogs"),
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
            // console.log(res);
            setLikedDogsArr(res);
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

  // Fetching liked dogs from API on load once
  // When a user likes a dog, call getLikedDogs()
  useEffect(() => {
    getLikedDogs();
  }, [updateLikedDogs]);

  return (
    <Container style={{ overflow: "auto", height: "90vh", padding: "0" }}>
      <ListGroup className="w-100">
        {likedDogsArr.map((like) => (
          <ListGroup.Item>
            <DogBanner key={like._id} like={like} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
