import { Link } from "react-router-dom";
import {updateTask} from "../data/tasks-repository";
import { useEffect, useState } from "react";
import { getFolder } from "../data/folders-repository";

const Task = ({task, onCheck}) => {
  const folder = getFolder(task.folderId);
  const [completed, setCompleted] = useState(task.completed);
  
  useEffect(() => {
    let newTask = {...task, completed: completed};
    updateTask(newTask);
    onCheck(completed);
  }, [completed]);

  return (
    <div className={`task ${completed ? "checked" : ""}`}>
      <div className="badge" style={{background: folder ? folder.color : "var(--gray-300)"}}></div>
      <input type="checkbox" checked={completed} onChange={() => setCompleted(currn => !currn)}/>
      <Link to={"/task/" + task.id} className="task__title">
        {task.title}
      </Link>
    </div>
  );
}

export default Task;