import { useHistory } from "react-router";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

const BackButton = () => {
    const history = useHistory();

    return (
        <button className="back-btn" onClick={() => history.goBack()}>
            <ArrowBackIosRoundedIcon />
        </button>
    );
}
 
export default BackButton;