import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import '../css/header.css';

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
