import { NavLink } from "react-router-dom";
import { useStore } from "react-context-hook";
import { TasksRepo, FoldersRepo, NotesRepo } from "../data/repository";

import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import FolderRoundedIcon from '@material-ui/icons/FolderRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

const SideMenu = () => {
  const [tasks, setTasks, deleteTasks] = useStore('data.tasks', TasksRepo.getAllData());
  const [folders, setFolders, deleteFolders] = useStore('data.folders', FoldersRepo.getAllData());
  const [notes, setNotes, deleteNotes] = useStore('data.notes', NotesRepo.getAllData());
  const [sideMenu, setSideMenu, deleteSideMenu] = useStore('sideMenu');

  const tabs = [
    {
      to: '/',
      title: 'Tasks',
      icon: <AssignmentTurnedInRoundedIcon />,
      badge: <span className="badge">{tasks.length}</span>
    },
    {
      to: '/notes',
      title: 'Notes',
      icon: <AssignmentRoundedIcon />,
      badge: <span className="badge">{notes.length}</span>
    },
    {
      to: '/folders',
      title: 'Folders',
      icon: <FolderRoundedIcon />,
    },
    {
      to: '/settings',
      title: 'Settings',
      icon: <SettingsRoundedIcon />,
    },
  ];

  return (
    <div className={`side-menu ${sideMenu ? "opened" : ""}`}>
      <ul className="menu">
        <li className="item toggler" onClick={() => setSideMenu(!sideMenu)}>
          <button className="side-menu__toggler">
            <MenuRoundedIcon />
          </button>
          <p>My<span>Space</span></p>
        </li>
        {tabs.map(t =>
          <li>
            <NavLink exact to={t.to} className='item' onClick={() => setSideMenu(false)} activeClassName='active'>
              {t.icon}
              {t.title}
              {t.badge && t.badge}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default SideMenu;