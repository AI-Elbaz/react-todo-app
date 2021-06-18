import {useEffect, useState} from "react";
import Task from "./task";
import Folder from "./folder";
import { useStore } from "react-context-hook";
import {getAllTasks} from "../data/tasks-repository";
import { getAllFolders, getFolder } from "../data/folders-repository";

const Tasks = () => {
  const [tasks, setTasks] = useState(null);
  const [folders, setFolders, deleteFolders] = useStore('data.folders', getAllFolders());
  const [activeFolder, setActiveFolder] = useState(null);
  const [showFolders, setShowFolders, deleteShowFolders] = useStore('showFoldersList');
  
  const handleResize = (mediaQuery) => {
    if (mediaQuery.matches) setShowFolders(true);
    else setShowFolders(false);
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 992px)');
    mediaQuery.onchange = handleResize;
    handleResize(mediaQuery);
    return () => mediaQuery.onchange = null;
  }, [])

  useEffect(() => {
    if (!activeFolder) {
      setTasks(getAllTasks());
    } else {
      setTasks(getAllTasks().filter(t => t.folderId == activeFolder));
    }
  }, [activeFolder]);

  const handleActiveFolder = (id) => {
    setActiveFolder(activeFolder !== id ? id : null);
  }

  const handleTaskCheck = () => {
    setFolders(getAllFolders());
  }

  return (
    <section className="tasks">
      <div className="container">
        <div className="tasks-list">
          {tasks ? 
            tasks.length == 0 ? <div className="loading">You don't have any Tasks</div> : tasks.map(t => <Task key={t.id} task={t} onCheck={handleTaskCheck}/>)
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
          </div>}
        </div>
      </div>
    </section>
  );
}

export default Tasks;