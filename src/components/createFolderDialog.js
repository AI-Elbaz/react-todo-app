import {useState, useEffect} from 'react';
import { useStore } from 'react-context-hook';
import {getAllFolders, insertFolder} from "../data/folders-repository";
import ColorPicker from './colorPicker';

const CreateDialog = () => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(null);
  const [folders, setFolders, deleteFolders] = useStore('data.folders');
  const [dialog, setDialog, deleteDialog] = useStore('showCreateFolderDialog');

  useEffect(() => {
    window.onscroll = () => window.scrollTo(0, 0);
    return () => {
      window.onscroll = null;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title !== "") {
      insertFolder({
        title,
        color
      });
    }
    setFolders(getAllFolders());
    handleClose();
  }

  const handleClose = () => {
    setDialog(false);
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
          <ColorPicker onChange={setColor}/>
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