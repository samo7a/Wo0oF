import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Card, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import "../css/dogmanager.css";
import "font-awesome/css/font-awesome.min.css";
import goodDog from "../../img/good-dog.jpeg";
import defProfilePic from "../../img/def-pic.jpg";
import ImageUploading from "react-images-uploading";

function DogProfile() {
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
                <Form.Control type="text" placeholder="Name" />
              </Form.Group>

              <Form.Group className="dog-sex">
                <Form.Control type="text" placeholder="Sex" />
              </Form.Group>

              <Form.Group className="dog-breed">
                <Form.Control type="text" placeholder="Breed" />
              </Form.Group>

              <Form.Group className="dog-age">
                <Form.Control type="number" placeholder="Age" />
              </Form.Group>

              <Form.Group className="dog-weight">
                <Form.Control type="number" placeholder="Weight" />
              </Form.Group>

              <Form.Group className="dog-height">
                <Form.Control type="text" placeholder="Height" />
              </Form.Group>

              <Form.Group className="dog-bio">
                <textarea className="form-control" rows="5" type="text" placeholder="Bio"></textarea>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer className="justify-content-center">
              <Button className="edit-prof-btn" onClick={() => setEditingDog(false)}>
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
                <p className="profile-text">Name: </p>
                <br />
                <p className="profile-text">Sex: </p>
                <br />
                <p className="profile-text">Breed: </p>
                <br />
                <p className="profile-text">Age: </p>
                <br />
                <p className="profile-text">Weight: </p>
                <br />
                <p className="profile-text">Height: </p>
                <br />
                <p className="bio-text">Bio: </p>
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
