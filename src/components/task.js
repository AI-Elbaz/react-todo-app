import { Link } from "react-router-dom";
import {updateTask} from "../data/tasks-repository";
import { useEffect, useState, useRef } from "react";

const Task = ({task}) => {
  const isInitialMount = useRef(true);
  const [completed, setCompleted] = useState(task.completed);

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
      <input type="checkbox" checked={completed} onChange={handleCheck}/>
      <Link to={"/task/" + task.id} className="task__title">
        {task.title}
      </Link>
    </div>
  );
}

export default Task;