const db = localStorage;

export const getAllFolders = () => {
  return JSON.parse(db.getItem('folders')) || [];
}

export const insertFolder = (folder) => {
  folder.id = getAllFolders().length + 1;
  folder.date = new Date();

  let folders = getAllFolders();
  folders.push(folder);
  
  db.setItem('folders', JSON.stringify(folders));
}

export const getFolder = (id) => {
  return getAllFolders().filter((i) => i.id == id)[0];
}

export const deleteFolder = (id) => {
  let folders = getAllFolders().filter(i => i.id !== id);
  db.setItem('folders', JSON.stringify(folders));
}

export const updateFolder = (folder) => {
  let folders = getAllFolders().filter(i => i.id !== folder.id);
  folder.date = new Date();
  folders.push(folder);
  db.setItem('folders', JSON.stringify(folders));
}