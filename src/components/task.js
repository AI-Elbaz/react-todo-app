import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FoldersRepo, TasksRepo } from "../data/repository";

const Task = ({task}) => {
  const folder = FoldersRepo.getItem(task.folderId);
  const [completed, setCompleted] = useState(task.completed);

  const handleCheck = (e) => {
    let checked = e.target.checked;
    let newTask = {...task, completed: checked};
    setCompleted(checked);
    TasksRepo.updateItem(newTask);
  }

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