import {TasksRepo} from "../data/repository";
import { useStore } from "react-context-hook";
import {Task} from "../components/components";

const Tasks = () => {
  const [tasks, setTasks, deleteTasks] = useStore('data.tasks', TasksRepo.getAllData());
  
  return (
    <section className="tasks">
      <div className="container">
        <div className="tasks-list">
          {tasks && (tasks.length == 0 ? <div className="loading">You don't have any Tasks</div> : 
          tasks.map(t => <Task key={t.id} task={t} onCheck={() => {}}/>))}
        </div>
      </div>
    </section>
  );
}

export default Tasks;