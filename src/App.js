import {useStore, withStore} from 'react-context-hook';
import {Tasks, Create, Folders} from './views/views';
import {Navbar,  CreateDialog, SideMenu} from './components/components';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {TasksRepo, FoldersRepo} from './data/repository';

const App = () => {
  const [dialog, setDialog, deleteDialog] = useStore('showCreateFolderDialog');

  return (
    <div className="app">
      <Router>
        {dialog && <CreateDialog />}
        <Navbar />
        <SideMenu />
        <Switch>
          <Route exact path="/">
            <Tasks />
          </Route>
          <Route path="/task/:id?">
            <Create />
          </Route>
          <Route path="/folders">
            <Folders />
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
  data: {
    tasks: TasksRepo.getAllData(),
    folders: FoldersRepo.getAllData(),
  }
};

export default withStore(App, initialState);