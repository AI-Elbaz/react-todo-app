const db = localStorage;

export const getAllTasks = () => {
  return JSON.parse(db.getItem('tasks')) || [];
}

export const insertTask = (task) => {
  task.id = getAllTasks().length + 1;
  task.date = new Date();
  task.completed = false;

  let tasks = getAllTasks();
  tasks.push(task);
  db.setItem('tasks', JSON.stringify(tasks));
}

export const getTask = (id) => {
  return getAllTasks().filter(i => i.id == id)[0];
}

export const deleteTask = (id) => {
  let tasks = getAllTasks().filter(i => i.id != id);
  db.setItem('tasks', JSON.stringify(tasks));
}

export const updateTask = (task) => {
  let tasks = getAllTasks().filter(i => i.id != task.id);
  task.edited = true;
  task.date = new Date();
  tasks.push(task);
  db.setItem('tasks', JSON.stringify(tasks));
}