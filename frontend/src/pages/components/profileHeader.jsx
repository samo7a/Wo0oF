import goodDog from "../../img/good-dog.jpeg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import '../css/header.css';

function ProfileHeader(props) {
    return(
        <Col className="bkgd-color1">
            <img src={goodDog} className="header-logo" />
            <p className="profile-header-name">{props.name}</p>
        </Col>
    );
}

export default ProfileHeader;