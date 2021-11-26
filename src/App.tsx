import { useWallet } from "@terra-money/wallet-provider";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import { useState } from "react";
import Home from "./Home";
import "./styles.css";

function App() {
  const [connected, setConnected] = useState(false);
  const { availableConnections, connect, disconnect } = useWallet();
  const connectTerraStation = () => {
    connect(availableConnections[0].type);
    setConnected(true);
  };

  const disconnectTerraStation = () => {
    disconnect();
    setConnected(false);
  };
  return (
    <>
      <nav className="navbar">
        <Stack direction="row" spacing={2}>
          <Link to="/">
            <div className="navbar-link">Home</div>
          </Link>
          {connected ? (
            <>
              <Button onClick={disconnectTerraStation}>Disconnect</Button>
            </>
          ) : (
            <Button onClick={connectTerraStation}>Connect</Button>
          )}
        </Stack>
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
