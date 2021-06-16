import { Link } from "react-router-dom";
import {updateTask} from "../data/tasks-repository";
import { useEffect, useState, useRef } from "react";
import { getFolder } from "../data/folders-repository";

const Task = ({task}) => {
  const isInitialMount = useRef(true);
  const [completed, setCompleted] = useState(task.completed);
  const folder = getFolder(task.folderId);

  const handleCheck = () => {
    setCompleted(currn => !currn);
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      let newTask = {...task, completed: completed};
      updateTask(newTask);
    }
  }, [completed]);

  return (
    <div className={`task ${completed ? "checked" : ""}`}>
      <div className="badge" style={{background: folder ? folder.color : "var(--gray-300)"}}></div>
      <input type="checkbox" checked={completed} onChange={handleCheck}/>
      <Link to={"/task/" + task.id} className="task__title">
        {task.title}
      </Link>
    </div>
  );
}

export default Task;