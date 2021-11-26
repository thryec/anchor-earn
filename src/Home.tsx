import { useWallet } from "@terra-money/wallet-provider";
import { LCDClient } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useEffect, useState, useMemo } from "react";
import "./styles.css";

const Home = () => {
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState<null | string>();
  const connectedWallet = useConnectedWallet();

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

  const connectTerraStation = () => {
    connect(availableConnections[0].type);
    setConnected(true);
  };

  const disconnectTerraStation = () => {
    disconnect();
    setConnected(false);
  };

  const lcd = useMemo(() => {
    if (!connectedWallet) {
      return null;
    }

    return new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    });
  }, [connectedWallet]);


  useEffect(() => {
    const fetchBalance = async () => {
      if (connectedWallet && lcd) {
        console.log('wallet: ', connectedWallet)
        const res = await lcd.bank.balance(connectedWallet.walletAddress)
        const coins = res[0].toString() 
        setBalance(coins)
      } else {
        setBalance(null);
      }
    }
    fetchBalance()
  }, [connectedWallet, lcd]);


  return (
    <div className="home">
      <div>
        <p>Status: {status}</p>
        <p>Network Name: {network.name}</p>
        <p>Chain ID: {network.chainID}</p>
      </div>

      <div>
        <p>Wallet Balance: {balance}</p>
      </div>
    </div>
  );
};

export default Home;
