import { useStore, withStore } from 'react-context-hook';
import { useEffect } from 'react';
import { Tasks, Folders, Notes, Create, Settings } from './views/views';
import { CreateDialog, SideMenu } from './components/components';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { TasksRepo, FoldersRepo, NotesRepo, SettingsRepo } from './data/repository';

const App = () => {
  const [dialog, ,] = useStore('showCreateFolderDialog');
  const [activeFolder, ,] = useStore('activeFolder');
  const [, setTasks,] = useStore('data.tasks');
  const [, setNotes,] = useStore('data.notes');
  const [darkMode, ,] = useStore('darkMode');

  useEffect(() => {
    const r = document.querySelector('html');
    r.className = darkMode ? "dark-mode" : "";

    if (darkMode) SettingsRepo.setData({ 'darkMode': true });
    else SettingsRepo.setData({ 'darkMode': false });
  }, [darkMode]);

  useEffect(() => {
    let newTasks = TasksRepo.getAllData();
    let newNotes = NotesRepo.getAllData();

    if (activeFolder) {
      newTasks = newTasks.filter(t => t.folderId === activeFolder.id);
      newNotes = newNotes.filter(t => t.folderId === activeFolder.id);
    }

    setTasks(newTasks);
    setNotes(newNotes);
  }, [activeFolder]);

  return (
    <div className="app">
      <Router>
        {dialog && <CreateDialog />}
        {/* <Navbar /> */}
        <SideMenu />
        <Switch>
          <Route exact path="/">
            <Tasks />
          </Route>
          <Route path="/task/:id?">
            <Create
              showRepeating={true}
              repository={TasksRepo}
              store='data.tasks'
            />
          </Route>
          <Route path="/note/:id?">
            <Create
              showRepeating={false}
              repository={NotesRepo}
              store='data.notes'
            />
          </Route>
          <Route path="/folders">
            <Folders />
          </Route>
          <Route path="/notes">
            <Notes />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const initialState = {
  showCreateFolderDialog: false,
  sideMenu: false,
  activeFolder: null,
  darkMode: SettingsRepo.getAllData().darkMode,
  data: {
    tasks: TasksRepo.getAllData(),
    folders: FoldersRepo.getAllData(),
    notes: NotesRepo.getAllData(),
  }
};

export default withStore(App, initialState);