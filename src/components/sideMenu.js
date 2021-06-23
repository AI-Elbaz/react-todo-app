import { NavLink } from "react-router-dom";
import { useStore } from "react-context-hook";
import { TasksRepo, FoldersRepo } from "../data/repository";

import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const SideMenu = () => {
  const [tasks, setTasks, deleteTasks] = useStore('data.tasks', TasksRepo.getAllData());
  const [folders, setFolders, deleteFolders] = useStore('data.folders', FoldersRepo.getAllData());
  const [sideMenu, setSideMenu, deleteSideMenu] = useStore('sideMenu');

  return (
    <div className={`side-menu ${sideMenu ? "opened" : ""}`}>
      <ul className="menu" onClick={() => setSideMenu(false)}>
        <li>
          <NavLink exact to="/" className="item" activeClassName='active'>
            <AssignmentTurnedInOutlinedIcon />
            Tasks
            <span className="badge">{tasks.length}</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/notes" className="item" activeClassName='active'>
            <AssignmentOutlinedIcon />
            Notes
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/folders" className="item" activeClassName='active'>
            <FolderOutlinedIcon />
            Folders
            <span className="badge">{folders.length}</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/trash" className="item" activeClassName='active'>
            <DeleteOutlinedIcon />
            Trash
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
 
export default SideMenu;