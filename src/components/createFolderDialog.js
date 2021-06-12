import ColorPicker from './colorPicker';
import {useState} from 'react';
import {insertFolder} from "../data/folders-repository";

const CreateDialog = ({handleClose}) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title !== "") {
      insertFolder({
        title,
        color
      });
    }
    handleClose();
  }

  const handleColor = (c) => {
    setColor(c);
  }

  return (
    <div className="dialog-wrapper">
      <div className="dialog-bg"></div>
      <div className="create-dialog">
        <div className="header">
          <div className="icon">folder</div>
          <p className="title">Create Folder</p>
          <button className="close-btn" onClick={handleClose}>close</button>
        </div>
        <div className="icon main" style={{color: color}}>folder</div>
        <div className="form">
          <input
            required
            type="text"
            value={title}
            placeholder="Folder title"
            onChange={e => setTitle(e.target.value)}
          />

          <ColorPicker onChange={handleColor}/>

          <input
            type="submit"
            value="Create"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateDialog;