import { useStore } from "react-context-hook";
import { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { TasksRepo, FoldersRepo } from "../data/repository";
import {BackButton, FolderPicker, RepeatingPicker} from '../components/components';

const Create = () => {
  const {id} = useParams();
  const history = useHistory();
  const form = useRef();

  const [task, setTask] = useState(null);
  const [folder, setFolder] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks, deleteTasks] = useStore('data.tasks');

  const componentWillUnmount = useRef(false);

  const repeatingOptions = {
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly',
    YEARLY: 'Yearly',
    NONE: null,
  };

  useEffect(() => {
    const f = form.current;
    const s = document.querySelector('section');
    let padding = parseInt(
      window.getComputedStyle(s, null).getPropertyValue('padding-top').replace('px', ''));

    f.style.height = `calc(100vh - ${f.offsetTop + padding}px)`;

    if (id) {
      let task = TasksRepo.getItem(id);

      setTask(task);
      setTitle(task.title);
      setDescription(task.description);

      if (task.folderId) {
        setFolder(FoldersRepo.getItem(task.folderId));
      }
    }
  }, [id]);

  useEffect(() => {
    return () => componentWillUnmount.current = true;
  }, []);

  useEffect(() => {
    return () => {
      if (componentWillUnmount.current) {
        console.log('willUnMount');
        handleSave();
        setTasks(TasksRepo.getAllData());
      }
    };
  }, [title, description, folder]);

  const handleSave = () => {
    if (id) {
      if (title !== task.title || description !== task.description || (folder && folder.id !== task.folderId)) {
        editTask();
      }
    } else if (title.length !== 0) {
      saveTask()
    };
  }

  const saveTask = () => {
    let folderId = folder && folder.id;
    TasksRepo.insertItem({
      title,
      description,
      folderId
    });
  }

  const editTask = () => {
    let folderId = folder && folder.id;
    TasksRepo.updateItem({
      ...task,
      title,
      description,
      folderId
    });
  }

  const handleDelete = () => {
    TasksRepo.deleteItem(id);
    console.log(TasksRepo.getAllData());
    history.goBack();
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
    const zfill = (m) => m < 10 ? "0"+m : m;

    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} at ${h[0]}:${zfill(d.getMinutes())}${h[1]}`;
  }

  const handleRepeatingChange = (option) => {
    // const d = task?.date;
    // let newDate;

    // switch (option) {
    //   case repeatingOptions.DAILY:
    //     newDate = new Date(d).setDa
    //     break;
    
    //   default:
    //     break;
    // }
  }

  return ( 
    <section className="create">
      <div className="container">
        <div className="header">
          <BackButton />
          {task && <p className="date">{formatDate(task.date)}</p>}
          <FolderPicker value={folder} onChange={setFolder}/>
          <RepeatingPicker options={repeatingOptions} onChange={handleRepeatingChange}/>
          {task && <button className="delete-btn" onClick={handleDelete}>Delete</button>}
        </div>
        <form ref={form}>
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