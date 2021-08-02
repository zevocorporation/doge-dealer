import "../styles/globals.css";
import { useEagerConnect, useInactiveListener } from "../utils/hooks.ts";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";

import React from "react";
import Web3 from "web3";

function MyApp({ Component, pageProps }) {
  const getLibrary = (provider) => {
    return new Web3(provider);
  };
  // handle logic to recognize the connector currently being activated

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
