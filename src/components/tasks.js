import { Link } from "react-router-dom";

const Tasks = () => {
  return (
    <section className="tasks">
      <div className="container">
        <div className="tasks-list">
          
        </div>
      </div>
    </section>
  );
}

const Task = ({task}) => {
  return (
    <Link to={task.link} key={task.id}>
      <div className="task">
        <input type="checkbox" checked={task.completed}/>
        <p className="task__title">{task.title}</p>
      </div>
    </Link>
  );
}
 
export default Tasks;