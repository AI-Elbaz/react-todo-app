import {useStore} from 'react-context-hook';
import FolderIcon from '@material-ui/icons/Folder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { TasksRepo, FoldersRepo } from '../data/repository';
import {Wrapper, Button, Menu, MenuItem} from 'react-aria-menubutton';

const Folder = ({folder, handleClick, active}) => {
  const tasks = TasksRepo.getAllData();
  const folderTasks = tasks.filter(t => t.folderId == folder.id);
  const completedTasks = folderTasks.filter(t => t.completed);

  return (
    <div className="folder-wrapper" style={{"--color": folder.color}}>
      <SettingsDropDown folderId={folder.id}/>
      <div className={`folder ${active ? "active" : ""}`} onClick={() => handleClick(folder?.id)}>
        <FolderIcon className="folder__icon"/>
        <div className="folder__title-container">
          <div>
            <p className="folder__title">{folder.title}</p>
            <p className="folder__counter">{folderTasks.length} Task</p>
          </div>
          {!folderTasks.length == 0 && <p className="folder__percentage">
            {Math.floor(completedTasks.length / folderTasks.length * 100)}%
          </p>}
        </div>
      </div>
    </div>
  );
}

const SettingsDropDown = ({folderId}) => {
  const [folders, setFolders, deleteFolders] = useStore('data.folders');

  const handleDelete = () => {
    FoldersRepo.deleteItem(folderId)
    setFolders(FoldersRepo.getAllData());
  }

  return (
    <Wrapper className="drop-down">
      <Button className='toggler'>
        <MoreVertIcon />
      </Button>
      <Menu>
        <ul className="menu">
          <li className="item" onClick={handleDelete}>
            <MenuItem>Delete</MenuItem>
          </li>
        </ul>
      </Menu>
    </Wrapper>
  );
}
 
export default Folder;