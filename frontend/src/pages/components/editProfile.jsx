import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";
import { Container, Row } from 'react-bootstrap';
import { useState } from "react";
import '../css/editProfile.css';
import defProfilePic from "../../img/def-pic.jpg";
// import ImageUploading from 'react-images-uploading';


function EditProfile() {
    const [isEditing, setEditMode] = useState(false);
    return (
        <Container fluid className="profile-color vh-100">
            {isEditing ?
                <>
                    <Row className="justify-content-center">
                        <img className="profile-pic" src={defProfilePic} />
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
                :
                <>
                    <Row className="justify-content-center">
                        <img className="profile-pic" src={defProfilePic} />
                    </Row>
                    <div className="profile-text">
                        <br />
                        <p>Name: </p>
                        <br />
                        <p>Email: </p>
                        <br />
                        <p>Phone: </p>
                        <br />
                        <p>Location: </p>
                        <br />
                        <p>Bio: </p>
                        <br />
                    </div>
                    <Row className="justify-content-center">
                        <Button className="edit-prof-btn" onClick={() => setEditMode(true)}>
                            Edit Profile
                        </Button>
                    </Row>
                </>
            }
        </Container>
    );
}

export default EditProfile;