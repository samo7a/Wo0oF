import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Button } from "react-bootstrap";
import "../css/likedDogs.css";

export default function LikedDogs() {
  const [likedDogsArr, setLikedDogsArr] = useState([
    {
      name: "Doggo",
      owner: "Mark",
    },
    {
      name: "Doge",
      owner: "Chris",
    },
  ]);

  return (
    <Container fluid className="" style={{ overflow: "auto" }}>
      <Row className="mt-2 top-row">
        <Col sm={3}>
          <p>Dog</p>
        </Col>
        <Col sm={3}>
          <p>Owner</p>
        </Col>
        <Col sm={3}>
          <p></p>
        </Col>
        <Col sm={3}>
          <p></p>
        </Col>
      </Row>
      {likedDogsArr.map((dog) => (
        <Row className=" row-border">
          <Col sm={3} className="mt-3 ">
            <p>{dog.name}</p>
          </Col>
          <Col sm={3} className="mt-3 ">
            <p>{dog.owner}</p>
          </Col>
          <Col sm={3} className="mt-3 ">
            <Button className="btn-sm ">Message</Button>
          </Col>
          <Col sm={3} className="mt-3 ">
            <Button className="btn-sm btn-danger">Remove</Button>
          </Col>
        </Row>
      ))}
    </Container>
  );
}
