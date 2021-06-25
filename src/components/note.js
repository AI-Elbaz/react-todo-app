import { Link } from "react-router-dom";
import {FoldersRepo} from "../data/repository";

const Note = ({model}) => {
  const color = model.folderId ? FoldersRepo.getItem(model.folderId).color : null;

  return (
    <Link to={'/note/' + model.id}>
      <div className="note">
        {color && <div className="note__badge" style={{background: color}}></div>}
        <h2 className="note__title">
          {model.title}
        </h2>
        <p className="note__description">
          {model.description}
        </p>
      </div>
    </Link>
  );
}
 
export default Note;