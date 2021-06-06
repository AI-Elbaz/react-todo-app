import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const Tasks = () => {
  const {data:tasks} = useFetch("http://localhost:8000/tasks");

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
  const [completed, setCompleted] = useState(task.completed);
  const isInitialMount = useRef(true);

  const handleCheck = () => {
    setCompleted(currn => !currn);
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      let newTask = {...task, completed: completed};
      console.log(newTask);

      fetch("http://localhost:8000/tasks/" + task.id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newTask)
      });
    }
  }, [completed]);

  return (
    <div className="task">
      <input type="checkbox" checked={completed} onChange={handleCheck}/>
      <Link to={"/task/" + task.id}>
        <p className="task__title">{task.title}</p>
      </Link>
    </div> 
  );
}
 
export default Tasks;