import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button } from 'react-bootstrap';
import '../css/navbar.css';
import { useState } from 'react';
import { Container, Row } from 'reactstrap';
import EditProfile from './editProfile';
import Chat from './chat';

function NavbarProfile() {

    const [showChat, setShowChat] = useState(true);

    return (
        <Container fluid className="">
            <Row>
                <div className="bkgd-color w-100">
                    <div className="center">
                        <Button className="nav-btn m-right" onClick={() => { setShowChat(false) }}>
                            Profile
                        </Button>
                        <Button className="nav-btn" onClick={() => { setShowChat(true) }}>
                            Messages
                        </Button>
                    </div>
                </div >
            </Row>
            <Row>
                {showChat ? <Chat /> : <EditProfile />}
            </Row>
        </Container >
    );
}

export default NavbarProfile;