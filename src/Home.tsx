import { useWallet } from "@terra-money/wallet-provider";
import { useEffect, useState } from "react";
import "./styles.css";

const Home = () => {
  const [connected, setConnected] = useState(false);

  const {
    status,
    network,
    wallets,
    availableConnectTypes,
    availableInstallTypes,
    availableConnections,
    supportFeatures,
    connect,
    install,
    disconnect,
  } = useWallet();

  const displayStatus = () => {
    return (
      <div>
        <p>Status: {status}</p>
        <p>Network Name: {network.name}</p>
        <p>Chain ID: {network.chainID}</p>
        <p>Wallets: {wallets}</p>
      </div>
    );
  };

  const connectTerraStation = () => {
    connect(availableConnections[0].type);
    setConnected(true);
  };

  const disconnectTerraStation = () => {
    disconnect();
    setConnected(false);
  };

  useEffect(() => {
    displayStatus();
  }, []);

  return (
    <div className="home">
      <section>
        {/* {displayStatus()} */}
        {connected ? (
          <div>
            Status: Connected <button onClick={disconnectTerraStation}>Disconnect</button>
          </div>
        ) : (
          <button onClick={connectTerraStation}>Connect</button>
        )}
      </section>
    </div>
  );
};

export default Home;
