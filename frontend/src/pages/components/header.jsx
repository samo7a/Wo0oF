import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/header.css';
import goodDog from "../../img/good-dog.jpeg";

function Header(props) {
    return(
        <Row className="bkgd-color2">
            <Link className="signout" to='/'>Sign Out</Link>
            <Col className="app-title">
                <h1>Woof</h1>
                {/* <img src={logo} className="Login-logo"/> */}
            </Col>
            <Col>
                <img src={goodDog} className="header-logo" />
                <p className="header-name">{props.name}</p>
            </Col>
        </Row>
    );
}

export default Header;