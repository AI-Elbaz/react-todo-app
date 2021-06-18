import {useStore, withStore} from 'react-context-hook';
import Tasks from './components/home';
import Navbar from './components/navbar';
import Create from './components/create';
import CreateDialog from './components/createFolderDialog';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import { getAllFolders } from './data/folders-repository';

const App = () => {
  const [dialog, setDialog, deleteDialog] = useStore('showCreateFolderDialog');

  return (
    <>
      <Router>
        <Navbar />
        {dialog && <CreateDialog />}

        <Switch>
          <Route exact path="/">
            <Tasks />
          </Route>
          <Route path="/task/:id?">
            <Create />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

const initialState = {
  showCreateFolderDialog: false,
  showFoldersList: false,
  data: {
    folders: getAllFolders()
  }
}

export default withStore(App, initialState);