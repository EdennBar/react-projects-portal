import './App.css';
import Info from './component/Info';
import Login from './component/Loing';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
function App() {
  return (
    <div>

      <Router>
        <Route exact path="/">
          <Login></Login>
        </Route>

        <Switch>
          <Route path="/info" exact component={Info} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
