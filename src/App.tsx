import { Route, Link, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import "./styles.css";

function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <div className="navbar-link">Home</div>
        </Link>
      </nav>
      <hr />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </>
  );
}

export default App;
