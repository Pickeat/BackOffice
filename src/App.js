import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import UsersPage from './pages/users';
import AnnouncesPage from './pages/announces';
import Settings from "./pages/settings";
import './App.css';
import Cookies from "js-cookie";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

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
                <PrivateRoute exact path="/settings" component={Settings}/>
            </Switch>
        </Router>
    );
}

export default App;
