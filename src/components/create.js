import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import BackButton from "./backButton";
import FolderPicker from "./folderPicker";
import { getFolder } from "src/data/folders-repository";
import {getTask, deleteTask, updateTask, insertTask, getAllTasks} from "../data/tasks-repository";

const Create = () => {
  const {id} = useParams();
  const history = useHistory();

  const [task, setTask] = useState(null);
  const [folder, setFolder] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  useEffect(() => {
    if (id) {
      let task = getTask(id);

      setTask(task);
      setTitle(task.title);
      setDescription(task.description);

      if (task.folderId) {
        setFolder(getFolder(task.folderId));
      }
    }
  }, [id]);

  const handleBackButton = () => {
    if (id) {
      if (title !== task.title || description !== task.description || (folder && folder.id !== task.folderId)) {
        editTask();
      }
    } else if (title.length !== 0) saveTask();
  }

  const saveTask = () => {
    let folderId = folder && folder.id;
    insertTask({
      title,
      description,
      folderId
    });
  }

  const editTask = () => {
    let folderId = folder && folder.id;
    updateTask({
      ...task,
      title,
      description,
      folderId
    });
  }

  const handleDelete = () => {
    deleteTask(id);
    console.log(getAllTasks());
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
          <FolderPicker key={folder} value={folder} onChange={setFolder}/>
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