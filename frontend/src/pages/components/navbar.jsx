import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css';
import { useState } from 'react';
import { Row, Button } from 'react-bootstrap';
import EditProfile from './editProfile';
import Chat from './chat';
// import { set } from 'mongoose';

function NavbarProfile() {

    const [showChat, setShowChat] = useState(true);
    const [isProfileClicked, setProfileClicked] = useState(false);
    const [isChatClicked, setChatClicked] = useState(false);

    return (
        <>
            <Row>
                <div className="bkgd-color w-100">
                    <div className="center">
                        <Button className={
                            isProfileClicked ? "nav-btn-clicked mr-5" : "nav-btn mr-5"}
                            onClick={() => {
                                setShowChat(false);
                                setProfileClicked(true);
                                setChatClicked(false)
                            }}>
                            Profile
                        </Button>
                        <Button className={
                            isChatClicked ? "nav-btn-clicked mr-5" : "nav-btn mr-5"}
                            onClick={() => {
                                setShowChat(true);
                                setChatClicked(true);
                                setProfileClicked(false)
                            }}>
                            Messages
                        </Button>
                    </div>
                </div >
            </Row>
            <Row>
                {showChat ? <Chat /> : <EditProfile />}
            </Row>
        </>
    );
}

export default NavbarProfile;