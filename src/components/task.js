import { Link } from "react-router-dom";
import { useState } from "react";
import { FoldersRepo, TasksRepo } from "../data/repository";
import { useStore } from "react-context-hook";

const Task = ({ task }) => {
  const folder = FoldersRepo.getItem(task.folderId);
  const [completed, setCompleted] = useState(task.completed);
  const [, setTasks,] = useStore('data.tasks');

  const handleCheck = (e) => {
    let checked = e.target.checked;
    let newTask = { ...task, completed: checked };
    setCompleted(checked);
    TasksRepo.updateItem(newTask);
    setTasks(TasksRepo.getAllData());
  }

  return (
    <div className={`task ${completed ? "checked" : ""}`}>
      <div className="badge" style={{ background: folder ? folder.color : "var(--gray-300)" }}></div>
      <input type="checkbox" checked={completed} onChange={handleCheck} />
      <Link to={"/task/" + task.id} className="task__title">
        <p>{task.title}</p>
      </Link>
    </div>
  );
}

export default Task;