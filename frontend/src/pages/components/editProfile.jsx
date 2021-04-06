import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import "../css/editProfile.css";
import defProfilePic from "../../img/def-pic.jpg";
import ImageUploading from "react-images-uploading";

function EditProfile() {
  const [isEditing, setEditMode] = useState(false);

  const [images, setImages] = useState([]);
  const [isImageChanged, setImageChanged] = useState(false);
  const onUpload = (image) => {
    setImages(image);
    setImageChanged(true);
  };

  return (
    <Container fluid className="profile-color vh-100">
      {isEditing ? (
        <>
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
          <Form>
            <Form.Group className="forms-margin">
              <Form.Control placeholder="First Name" />
            </Form.Group>

            <Form.Group className="forms-margin">
              <Form.Control placeholder="Last Name" />
            </Form.Group>

            <Form.Group className="forms-margin">
              <Form.Control placeholder="Email" />
            </Form.Group>

            <Form.Group className="forms-margin">
              <Form.Control placeholder="Phone" />
            </Form.Group>

            <Form.Group className="forms-margin">
              <Form.Control placeholder="Location" />
            </Form.Group>

            <Form.Group className="forms-margin">
              <Form.Control placeholder="Biography" />
            </Form.Group>
          </Form>
          <Row className="justify-content-center">
            <Button className="edit-prof-btn" onClick={() => setEditMode(false)}>
              Confirm
            </Button>
          </Row>
        </>
      ) : (
        <>
          <Row className="justify-content-center">
            <img className="profile-pic" src={isImageChanged ? images[0].data_url : defProfilePic} />
          </Row>
          <div>
            <br />
            <p className="profile-text">Name: </p>
            <br />
            <p className="profile-text">Email: </p>
            <br />
            <p className="profile-text">Phone: </p>
            <br />
            <p className="profile-text">Location: </p>
            <br />
            <p className="profile-text">Bio: </p>
            <br />
          </div>
          <Row className="justify-content-center">
            <Button className="edit-prof-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </Button>
          </Row>
        </>
      )}
    </Container>
  );
}

export default EditProfile;
