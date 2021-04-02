import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/header.css';
import goodDog from "../../img/good-dog.jpeg";

function Header(props) {
    return (
        <Col sm={8} className="bkgd-color2">
            {/* Dog Name or Person you are talking to*/}
            <div>
                <p className="header-name">{props.name}</p>
            </div>
        </Col>
    );
}

export default Header;
