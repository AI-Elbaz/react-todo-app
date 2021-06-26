import { ColorPicker } from './components';
import { useState, useEffect } from 'react';
import { useStore } from 'react-context-hook';
import { FoldersRepo } from '../data/repository';

import FolderIcon from '@material-ui/icons/Folder';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const CreateDialog = () => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(null);
  const [, setFolders,] = useStore('data.folders');
  const [, setDialog,] = useStore('showCreateFolderDialog');

  useEffect(() => {
    window.onscroll = () => window.scrollTo(0, 0);
    return () => window.onscroll = null;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title !== "") {
      FoldersRepo.insertItem({ title, color });
    }
    setFolders(FoldersRepo.getAllData());
    setDialog(false);
  }

  return (
    <div className="dialog-wrapper">
      <div className="dialog-bg"></div>
      <div className="container">
        <div className="create-dialog">
          <div className="header">
            <FolderIcon />
            <p className="title">Create Folder</p>
            <button className="close-btn" onClick={() => setDialog(false)}>
              <CloseRoundedIcon />
            </button>
          </div>
          <FolderIcon style={{ color: color }} className='preview-icon' />
          <div className="form">
            <div>
              <input
                required
                type="text"
                value={title}
                placeholder="Folder title"
                onChange={e => setTitle(e.target.value)}
              />
              <ColorPicker onChange={setColor} />
            </div>
            <input
              type="submit"
              value="Create"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateDialog;