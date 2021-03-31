import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button } from 'react-bootstrap';
import '../css/navbar.css';
import { Link } from 'react-router-dom';

function NavbarProfile() {
    return(
        <Row className="bkgd-color vw-100 justify-content-center">
            <Link className="nav-btn" to="/home">Home</Link>
            <Link className="nav-btn" to="/dogmanager">Dog Manager</Link>
            <Link className="nav-btn" to="/messages">Messages</Link>
            <Link className="nav-btn" to="/profile">Profile</Link>
        </Row>
    );
}

export default NavbarProfile;