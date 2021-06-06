import { useHistory } from "react-router";

const BackButton = ({callback}) => {
    const history = useHistory();

    const handleClick = () => {
        callback();
        history.goBack();
    }

    return ( 
        <button className="back-btn" onClick={handleClick}>arrow_back_ios_new</button>
    );
}
 
export default BackButton;