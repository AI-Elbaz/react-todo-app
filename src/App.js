import Navbar from './components/navbar';
import Create from './components/create';
import Tasks from './components/tasks';

import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Navbar />

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

export default App;