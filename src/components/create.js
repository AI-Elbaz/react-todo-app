import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import BackButton from "./backButton";
import {getTask, deleteTask, updateTask, insertTask} from "../data/repository";

const Create = () => {
  const {id} = useParams();
  const [task, setTask] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (id) {
      let task = getTask(id)
      setTask(task);
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [id]);

  const handleBackButton = () => {
    if (id) {
      if (title !== task.title || description !== task.description) {
        editTask();
      }
    } else if (title.length !== 0) {
      saveTask();
    }
  }

  const saveTask = () => {
    insertTask({
      title,
      description,
    });
    history.push('/');
  }

  const editTask = () => {
    let editedTask = { ...task, title, description};
    updateTask(editedTask);
  }

  const handleDelete = () => {
    deleteTask(id);
    history.push("/");
  }

  const tConv = (t) => {
    if (t < 12) return [t, "AM"];
    else if (t == 12) return [t, "PM"];
    return [t-12, "PM"];
  }

  const formatDate = (date) => {
    let d = new Date(date);

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    let h = tConv(d.getHours());

    return `${months[d.getMonth()]} ${d.getDay()}, ${d.getFullYear()} at ${h[0]}:${d.getMinutes()}${h[1]}`;
  }

  return ( 
    <section className="create">
      <div className="container">
        <div className="header">
          <BackButton callback={handleBackButton}/>
          {task && <p className="date">{formatDate(task.date)}</p>}
          {task && <button className="delete-btn" onClick={handleDelete}>Delete</button>}
        </div>
        <form>
          <input
            type="text"
            required
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>
      </div>
    </section>
  );
}
 
export default Create;