import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import "../css/editProfile.css";
import defProfilePic from "../../img/def-pic.jpg";
import ImageUploading from "react-images-uploading";
import axios from "axios";

function EditProfile() {
  const bp = require("../../bp.js");
  const storage = require("../../tokenStorage.js");
  const jwt = require("jsonwebtoken");

  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok, { complete: true });

  const userID = ud.payload.userId;
  const UDfirstName = ud.payload.firstName;
  const UDlastName = ud.payload.lastName;
  const UDisOwner = ud.payload.isOwner;
  const UDemail = ud.payload.email;
  const UDphone = ud.payload.phone;
  const UDlocation = ud.payload.location;
  const UDbio = ud.payload.bio;

  const doEditUser = async (event) => {
    var obj = {
      UserID: userID,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Phone: phone,
      Location: location,
      ProfilePicture: "save us GridFS",
      ShortBio: bio,
    };
    console.log(firstName);
    console.log(lastName);
    console.log(bio);

    var js = JSON.stringify(obj);

    try {
      // Axios code follows
      var config = {
        method: "post",
        url: bp.buildPath("editUser"),
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
            storage.storeToken(jwt.refresh(res));
            window.location.href = "/";
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

  const [isEditing, setEditMode] = useState(false);

  const [images, setImages] = useState([]);
  const [isImageChanged, setImageChanged] = useState(false);
  const onUpload = (image) => {
    setImages(image);
    setImageChanged(true);
  };

  const callEdit = () => {
    setEditMode(false);
    doEditUser();
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

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
              <Form.Label>First Name:</Form.Label>
              <Form.Control placeholder={UDfirstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>

            <Form.Group className="forms-margin">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control placeholder={UDlastName} onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>

            <Form.Group className="forms-margin">
              <Form.Label>Email:</Form.Label>
              <Form.Control placeholder={UDemail} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="forms-margin">
              <Form.Label>Phone:</Form.Label>
              <Form.Control placeholder={UDphone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>

            <Form.Group className="forms-margin">
              <Form.Label>Location:</Form.Label>
              <Form.Control placeholder={UDlocation} onChange={(e) => setLocation(e.target.value)} />
            </Form.Group>

            <Form.Group className="forms-margin">
              <Form.Label>Bio:</Form.Label>
              <textarea className="form-control" rows="3" type="text" placeholder={UDbio} onChange={(e) => setBio(e.target.value)}></textarea>
            </Form.Group>
          </Form>
          <Row className="justify-content-center">
            <Button className="edit-prof-btn" onClick={callEdit}>
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
            <p className="profile-text">Name: {UDfirstName + " " + UDlastName}</p>
            <br />
            <p className="profile-text">Email: {UDemail}</p>
            <br />
            <p className="profile-text">Phone: {UDphone}</p>
            <br />
            <p className="profile-text">Location: {UDlocation}</p>
            <br />
            <p className="bio-text">Bio: {UDbio}</p>
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
