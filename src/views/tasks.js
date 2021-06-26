import {TasksRepo} from "../data/repository";
import { useStore } from "react-context-hook";
import {Task, SectionHeader} from "../components/components";
import { useHistory } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks, deleteTasks] = useStore('data.tasks', TasksRepo.getAllData());
  const completedTasks = tasks.filter(t => t.completed);
  const incompletedTasks = tasks.filter(t => !t.completed);
  const history = useHistory();

  return (
    <section className="tasks">
      <SectionHeader title='Tasks' onCreate={() => history.push('/task')}/>
      <div className="container" data-empty="Tasks">
        {tasks.length !== 0 &&
          <div className="tasks-container">
            {incompletedTasks.length !== 0 &&
             <div>
               <h2>Incompleted</h2>
                <div className="tasks-list">
                  {incompletedTasks.map(t => <Task key={t.id} task={t} />)}
                </div>
             </div>}
            {completedTasks.length !== 0 && <div>
              <h2>Completed</h2>
              <div className="tasks-list">
                {tasks.filter(t => t.completed).map(t => <Task key={t.id} task={t} />)}
              </div>
            </div>}
          </div>
        }
      </div>
    </section>
  );
}

export default Tasks;