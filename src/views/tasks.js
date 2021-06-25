import {TasksRepo} from "../data/repository";
import { useStore } from "react-context-hook";
import {Task, SectionHeader} from "../components/components";
import { useHistory } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks, deleteTasks] = useStore('data.tasks', TasksRepo.getAllData());
  const history = useHistory();

  return (
    <section className="tasks">
      <SectionHeader title='Tasks' onCreate={() => history.push('/task')}/>
      <div className="container" data-empty="Tasks">
        {tasks.length !== 0 && <div className="tasks-list">
          {tasks.map(t => <Task key={t.id} task={t} />)}
        </div>}
      </div>
    </section>
  );
}

export default Tasks;