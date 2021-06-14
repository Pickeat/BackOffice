import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import UsersPage from './pages/users';
import AnnouncesPage from './pages/announces';
import './App.css';
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Switch,
  Route,
    Redirect
} from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={(props) => {
            if (Cookies.get("jwt") === undefined) {
                return <Redirect to="/"/>;
            } else {
                return (<Component {...props}/>);
            }
        }}
    />
);

function App() {
    return (
   <Router>
      <Switch>
          <Route exact path="/" component={LoginPage}/>
          <PrivateRoute exact path="/users" component={UsersPage}/>
          <PrivateRoute exact path="/announces" component={AnnouncesPage}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        </Switch>
   </Router>
  );
}

export default App;
