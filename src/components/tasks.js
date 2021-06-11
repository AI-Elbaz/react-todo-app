import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {getAllTasks, updateTask} from "../data/repository";

const Tasks = () => {
  const tasks = getAllTasks();

  return (
    <section className="tasks">
      <div className="container">
        <div className="tasks-list">
          {tasks ? 
            tasks.length == 0 ? <div className="loading">You don't have any Tasks</div> : tasks.map((task) => <Task key={task.id} task={task}/>)
          : <div className="loading">Loading..</div>}
        </div>
      </div>
    </section>
  );
}

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
    <div className="task">
      <input type="checkbox" checked={completed} onChange={handleCheck}/>
      <Link to={"/task/" + task.id} className="task__title">
        {task.title}
      </Link>
    </div>
  );
}
 
export default Tasks;