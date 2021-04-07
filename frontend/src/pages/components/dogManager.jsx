import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import "../css/dogmanager.css";
import "font-awesome/css/font-awesome.min.css";
import DogProfile from "./dogProfile";
import defProfilePic from "../../img/def-pic.jpg";
import ImageUploading from "react-images-uploading";

function DogManager() {
  const [addDog, setAddDog] = useState(false);
  const showAddDog = () => setAddDog(true);
  const hideAddDog = () => setAddDog(false);

  const [images, setImages] = useState([]);
  const [isImageChanged, setImageChanged] = useState(false);
  const onUpload = (image) => {
    setImages(image);
    setImageChanged(true);
  };

  return (
    <>
      <Container fluid className="vh-100 bkgd-manager-color" style={{ overflow: "auto" }}>
        <Row className="justify-content-center">
          <Col sm={4}></Col>
          <Col sm={4}>
            <h2 className="title-text-dm">Dog Manager</h2>
          </Col>
          <Col sm={4}>
            <Button className="add-button" onClick={showAddDog}>
              Add Dog <i class="fa fa-plus-square"></i>
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <DogProfile />
          <DogProfile />
          <DogProfile />
          <DogProfile />
          <DogProfile />
          <DogProfile />
          <DogProfile />
          <DogProfile />
          <DogProfile />
          <DogProfile />
          <DogProfile />
          <DogProfile />
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
      <Modal show={addDog} onHide={hideAddDog}>
        <Modal.Header closeButton>
          <Modal.Title>Add Dog</Modal.Title>
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
          <Button className="edit-prof-btn">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DogManager;
