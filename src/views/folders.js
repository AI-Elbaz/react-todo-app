import { useEffect } from "react";
import { useStore } from "react-context-hook";
import {Folder} from "../components/components";
import { TasksRepo, FoldersRepo } from "../data/repository";

const Folders = () => {
  const [tasks, setTasks, deleteTasks] = useStore('data.tasks');
  const [activeFolder, setActiveFolder, deleteActiveFolder] = useStore('activeFolder');
  const [folders, setFolders, deleteFolders] = useStore('data.folders', FoldersRepo.getAllData());

  useEffect(() => {
    let newTasks = TasksRepo.getAllData();
    if (activeFolder) newTasks = newTasks.filter(t => t.folderId == activeFolder);
    setTasks(newTasks);
  }, [activeFolder]);

  const handleActiveFolder = (id) => {
    setActiveFolder(activeFolder !== id ? id : null);
  }

  return (
    <section className="folders">
      <div className="container">
        <div className="folders-list">
          {folders &&
            folders.map(f => 
              <Folder
                key={f.id}
                folder={f} 
                active={activeFolder == f.id}
                handleClick={handleActiveFolder}/>)}
        </div>
      </div>
    </section>
  );
}
 
export default Folders;