import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "../css/likedDogs.css";
import DogBanner from "./dogBanner";

export default function LikedPage() {
  const [likedDogsArr, setLikedDogsArr] = useState([
    {
      id: 1,
      name: "Doggo",
    },
    {
      id: 2,
      name: "Doge",
    },
  ]);

  return (
    <Container fluid className="" style={{ overflow: "auto" }}>
      {likedDogsArr.map((dog) => (
        <DogBanner key={dog.id} dog={dog} />
      ))}
    </Container>
  );
}
