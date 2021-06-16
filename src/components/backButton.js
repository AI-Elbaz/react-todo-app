import { useHistory } from "react-router";

const BackButton = () => {
    const history = useHistory();

    return (
        <button className="back-btn" onClick={() => history.push('/')}>arrow_back_ios_new</button>
    );
}
 
export default BackButton;