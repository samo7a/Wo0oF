import React, { useState, useEffect } from "react";
import { ListGroup, Container, Row } from "react-bootstrap";
import "../css/likedDogs.css";
import axios from "axios";
import AdopterBanner from "./adopterBanner";

function Likers({ updateLikers }) {
  const bp = require("../../bp.js");
  const storage = require("../../tokenStorage.js");
  const jwt = require("jsonwebtoken");
  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok, { complete: true });
  var userID = ud.payload.userId;

  const [likes, setlikes] = useState([]);

  const getLikers = async () => {
    var obj = {
      id: userID,
    };

    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: bp.buildPath("getLikers"),
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
            setlikes(res);
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
  useEffect(() => {
    getLikers();
  }, [updateLikers]);

  return (
    <Container style={{ overflow: "auto", height: "90vh", padding: "0" }}>
      <ListGroup className="w-100">
        {likes
          .map((like) => (
            <ListGroup.Item>
              <AdopterBanner key={like._id} like={like} updateLikers={updateLikers} />
            </ListGroup.Item>
          ))
          .reverse()}
      </ListGroup>
    </Container>
  );
}

export default Likers;
