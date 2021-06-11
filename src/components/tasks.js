import {useState} from "react";
import Task from "./task";
import Folder from "./folder";
import CreateDialog from "./createFolderDialog";
import {getAllTasks} from "../data/tasks-repository";

const Tasks = () => {
  const [dialog, setDialog] = useState(false);
  const tasks = getAllTasks();
  const folders = [
    // {
    //   id: 1,
    //   title: "Home"
    // },
    // {
    //   id: 2,
    //   title: "Work"
    // },
    // {
    //   id: 3,
    //   title: "School"
    // },
    // {
    //   id: 3,
    //   title: "School"
    // }
  ];

  const handleCreate = () => {
    setDialog(true);
  }

  return (
    <section className="tasks">
      {dialog && <CreateDialog handleClose={() => setDialog(false)}/>}

      <div className="container">
        <div className="tasks-list">
          {tasks ? 
            tasks.length == 0 ? <div className="loading">You don't have any Tasks</div> : tasks.map(t => <Task key={t.id} task={t}/>)
          : <div className="loading">Loading..</div>}
        </div>

        <div className="folders-list">
        {folders &&
          folders.length == 0 ? <Folder create={true} handleClick={handleCreate}/> : folders.map(f => <Folder key={f.id} folder={f}/>)
        }
        </div>
      </div>
    </section>
  );
}
 
export default Tasks;