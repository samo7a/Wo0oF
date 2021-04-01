import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import '../css/buttons.css';
import 'font-awesome/css/font-awesome.min.css';

function DislikeButton() {
    return (
        <div>
            <Button className="dislike-button"><i class="fa fa-times"></i></Button>
        </div>
    );
}

export default DislikeButton;