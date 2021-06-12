import {useEffect, useState} from "react";
import Task from "./task";
import Folder from "./folder";
import CreateDialog from "./createFolderDialog";
import {getAllTasks} from "../data/tasks-repository";
import { getAllFolders, getFolder } from "src/data/folders-repository";

const Tasks = () => {
  const [tasks, setTasks] = useState(null);
  const [folders, setFolders] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [activeFolder, setActiveFolder] = useState(null);
  const [showFolders, setShowFolders] = useState(true);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 992px)');
    mediaQuery.onchange = e => {
      if (e.matches) setShowFolders(true);
    };
    return () => {
      mediaQuery.onchange = null;
    }
  }, [])

  useEffect(() => {
    setFolders(getAllFolders());
    if (!activeFolder) {
      setTasks(getAllTasks());
    } else {
      setTasks(getAllTasks().filter(t => t.folderId == activeFolder));
    }
  }, [activeFolder]);

  const handleCreate = () => {
    setDialog(true);
  }

  const handleActiveFolder = (id) => {
    if (activeFolder !== id) {
      setActiveFolder(id);
    } else {
      setActiveFolder(null);
    }
  }

  const closeDialog = () => {
    setDialog(false);
    setFolders(getAllFolders());
  }

  return (
    <section className="tasks">
      {dialog && <CreateDialog handleClose={closeDialog}/>}

      <div className="container">
        <div className="tasks-list">
          {tasks ? 
            tasks.length == 0 ? <div className="loading">You don't have any Tasks</div> : tasks.map(t => <Task key={t.id} task={t}/>)
          : <div className="loading">Loading..</div>}
        </div>

        <div className="folders-wrapper">
          <div className="folders-toggler" onClick={() => setShowFolders(!showFolders)}>
            <h2>Folders</h2>
            {activeFolder && <span className="active-folder">&nbsp;| {getFolder(activeFolder).title}</span>}
            <span className="icon">{showFolders ? "expand_less" :"expand_more"}</span>
          </div>
          {showFolders && <div className="folders-list">
          {folders && folders.map(f => <Folder key={f.id} folder={f} active={activeFolder == f.id} handleClick={handleActiveFolder}/>)}
          <Folder create={true} handleClick={handleCreate}/>
          </div>}
        </div>
        
      </div>
    </section>
  );
}
 
export default Tasks;