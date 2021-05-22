import LoginPage from './pages/login';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
   <Router>
      <Switch>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
   </Router>
  );
}

export default App;
