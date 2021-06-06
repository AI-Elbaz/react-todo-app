import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import BackButton from "./backButton";

const Create = () => {
  const {id} = useParams();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  useEffect( async () => {
    if (id) {
      const res = await fetch("http://localhost:8000/tasks/" + id);
      const data = await res.json();
      setTask(data)

      setTitle(data.title);
      setDescription(data.description)
    }
  }, [id]);

  const handleBackButton = async () => {
    if (id) {
      if (title !== task.title || description !== task.description) {
        await saveTask();
      }
    } else if (title.length !== 0) {
      await saveTask();
    }
  }

  const saveTask = async () => {
    const newTask = {
      id,
      title,
      description,
      completed: id ? task.completed : false,
      "date": new Date(),
      "edited": id ? true : false,
    };

    await fetch("http://localhost:8000/tasks/" + (id || ""), {
      method: id ? "PUT" : "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newTask)
    });
  }

  const handleDelete = async () => {
    await fetch("http://localhost:8000/tasks/" + id, {
      method: "DELETE"
    });
    history.push("/");
  }

  return ( 
    <section className="create">
      <div className="container">
        <div className="header">
          <BackButton callback={handleBackButton}/>
          {task && <p className="date">
            {task.edited ? "Edited: ": "Created: "}
            {new Date(task.date).toLocaleString()}
          </p>}
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