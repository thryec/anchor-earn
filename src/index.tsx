import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
  NetworkInfo,
  WalletProvider,
  WalletStatus,
  getChainOptions,
} from "@terra-money/wallet-provider";

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <WalletProvider {...chainOptions}>
          <App />
        </WalletProvider>
      </Router>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
