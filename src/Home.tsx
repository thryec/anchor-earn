import { useWallet } from "@terra-money/wallet-provider";
import { LCDClient } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useEffect, useState, useMemo } from "react";
import {CHAINS, NETWORKS} from './variables'
import { AnchorEarn, Account } from "@anchor-protocol/anchor-earn";

import "./styles.css";

const Home = () => {
  const [balance, setBalance] = useState<null | string>();
  const connectedWallet = useConnectedWallet();
  const { status, network } = useWallet();

  const anchorEarn = new AnchorEarn({
    chain: CHAINS.TERRA,
    network: NETWORKS.BOMBAY_12,
    mnemonic: '...',
  });
  const account = new Account(CHAINS.TERRA); 


  const lcd = useMemo(() => {
    if (!connectedWallet) {
      return null;
    }
    return new LCDClient({
      URL: connectedWallet.network.lcd,
      chainID: connectedWallet.network.chainID,
    });
  }, [connectedWallet]);

  const fetchBalance = async () => {
    if (connectedWallet && lcd) {
      console.log("wallet: ", connectedWallet);
      const res = await lcd.bank.balance(connectedWallet.walletAddress);
      const coins = res[0].toString();
      setBalance(coins);
    } else {
      setBalance(null);
    }
  };

  useEffect(() => {
    fetchBalance();
    console.log('account: ', account)
  }, [connectedWallet, lcd]);



  return (
    <div className="home">
        <p>Status: {status}</p>
        <p>Network Name: {network.name}</p>
        <p>Chain ID: {network.chainID}</p>
        <p>Wallet Balance: {balance}</p>
    </div>
  );
};

export default Home;
