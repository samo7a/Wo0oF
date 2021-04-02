import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/header.css';
import profilePic from "../../img/def-pic.jpg";

function ProfileHeader(props) {
    return (
        <>
            <Col sm={4} className="bkgd-color1">
                <Row className="justify-content-start h-100">
                    <Col sm={1}>
                        <img src={profilePic} className="header-logo" />
                    </Col>
                    <Col sm={4} className="profile-header-name">
                        <p className="pt-3">{props.name}</p>
                    </Col>
                </Row>
            </Col>
            <Col sm={8} className="bkgd-color1">
                <Row className="justify-content-end h-100">
                    <Col sm={4} className="header-name">
                        <p className="pt-3">{props.page}</p>
                    </Col>
                    <Col sm={4} className="pt-1">
                        <Link to="/" className="sign-out-btn">Sign Out</Link>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default ProfileHeader;