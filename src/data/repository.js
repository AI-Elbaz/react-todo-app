import {Task, Note, Folder, Settings} from './models';

class Repository {
  constructor (key, template, _default=[]) {
    this.key = key;
    this.default = _default;
    this.template = template;
  }

  getAllData = () => {
    let data = JSON.parse(localStorage.getItem(this.key)) || this.default;
    if (Array.isArray(data)) {
      return data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return data;
  }
  
  setData = (value) => {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  createEntity = (item) => {
    let date = new Date();
    let id = this.getAllData().length + 1;
    return {...this.template, ...item, date, id};
  }

  getItem = (id) => {
    let data = this.getAllData();
    if (Array.isArray(data)) {
      return data.filter(i => i.id == id)[0];
    } else {
      return data;
    }
  }

  insertItem = (item) => {
    let data = this.getAllData();
    data.push(this.createEntity(item));
    this.setData(data);
  }

  deleteItem = (id) => {
    let data = this.getAllData().filter(i => i.id !== parseInt(id));
    this.setData(data);
  }

  updateItem = (item) => {
    item.edited = true;
    item.date = new Date();

    let data = this.getAllData().filter(i => i.id !== item.id);
    data.push(item);
    this.setData(data);
  }
}

export default Repository;

export const TasksRepo = new Repository('tasks', Task);
export const NotesRepo = new Repository('notes', Note);
export const FoldersRepo = new Repository('folders', Folder);
export const SettingsRepo = new Repository('settings', Settings, {});