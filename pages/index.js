import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

//import patterns

import { Header, Prompt, Card, Form, Block, Footer } from "../patterns";

//import data

import { seo, settings } from "../data";
import { useWeb3React } from "@web3-react/core";

export default function Home() {
  const [splashIsOn, setSplashIsOn] = useState(false);
  const [switchReferrerIsOn, setSwitchReferrerIsOn] = useState(false);
  const [connectWalletIsOn, setConnectWalletIsOn] = useState(false);

  const { active, account } = useWeb3React();

  useEffect(() => {
    if (active) {
      console.log(account);
    } else {
      console.log("connect wallet");
    }

    setSplashIsOn(true);
    setTimeout(() => {
      setSplashIsOn(false);
    }, 2000);
  }, []);

  // handler functions

  const connectWalletHandler = (e) => {
    e.preventDefault(e);
    console.log("connecting...");

    setConnectWalletIsOn(true);
  };

  const inviteHandler = (e) => {
    e.preventDefault(e);
  };

  const buyCoinHandler = (e) => {
    e.preventDefault(e);
  };

  const copyHandler = (e) => {
    e.preventDefault(e);
  };

  const switchCoinHandler = (e) => {
    e.preventDefault(e);
  };

  const switchReferrerHandler = (e) => {
    e.preventDefault(e);
    setSwitchReferrerIsOn(true);
  };

  const renderseo = (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="icon" href={seo.favicon_public_path} />
    </Head>
  );

  const renderMyEarningsBlock = (
    <block>
      <blockheader>
        <h4>Earnings in BNB | 250 BNB</h4>
        <button className="button-mini">switch coin</button>
      </blockheader>
    </block>
  );

  const buyCoinFormContent = (
    <>
      <input placeholder="enter BNB amount" />
      <button>Buy now</button>
    </>
  );

  const renderMain = (
    <contentmain>
      <Card variant="referrals-card" />
      <column>
        {renderMyEarningsBlock}
        <Form
          title={"Buy DogeX"}
          label={"1 DogeX = 0.09 BNB"}
          content={buyCoinFormContent}
        />
      </column>
      <Card variant="leaderboard-card" />
    </contentmain>
  );

  const renderSplash = (
    <splash>
      <splashcontent>
        <p>loading</p>
      </splashcontent>
    </splash>
  );

  const renderBalanceBlock = (
    <block>
      <icon>
        <Image
          src="/assets/icons/icon-balance.svg"
          alt="illustration"
          width="24px"
          height="24px"
        />
      </icon>
      <blockcontent>
        <label>DOGEX Balance</label>
        <p>0</p>
      </blockcontent>
    </block>
  );

  // rendering contents

  const switchReferrerPromptContent = (
    <>
      <input placeholder="paste new referrer address here" />
      <button>Switch referrer</button>
    </>
  );

  const connectWalletPromptContent = (
    <>
      <icon>Metamask Wallet</icon>
      <button>Connect wallet</button>
    </>
  );

  const headerContent = (
    <>
      <Block />
      <button onClick={(e) => switchReferrerHandler(e)} className="button-mini">
        Switch referrer
      </button>
      <blockinput>
        <icon>
          <Image
            src="/assets/icons/icon-address.svg"
            alt="illustration"
            width="24px"
            height="24px"
          />
        </icon>
        <blockinputcontent>
          <label>DOGEX Balance</label>
          <p>x98abhv..87</p>
        </blockinputcontent>
        <icon>
          <Image
            src="/assets/icons/icon-copy.svg"
            alt="illustration"
            width="24px"
            height="24px"
          />
        </icon>
      </blockinput>
      {renderBalanceBlock}
      <button onClick={(e) => connectWalletHandler(e)}>Connect wallet</button>
    </>
  );

  return (
    <div className={styles.container}>
      {renderseo}
      {splashIsOn && renderSplash}
      <Header
        logo={settings.application_logo_path}
        title={settings.application_name}
        content={headerContent}
        isLoggedIn={false}
      />

      <content>
        {renderMain}
        <Prompt
          isOpen={switchReferrerIsOn || connectWalletIsOn}
          setIsOpen={
            (switchReferrerIsOn && setSwitchReferrerIsOn) ||
            (connectWalletIsOn && setConnectWalletIsOn)
          }
          title={
            (switchReferrerIsOn && "Switch Referrer") ||
            (connectWalletIsOn && "Select a wallet")
          }
          content={
            (switchReferrerIsOn && switchReferrerPromptContent) ||
            (connectWalletIsOn && connectWalletPromptContent)
          }
        />
      </content>

      <banner>
        <Image
          src="/assets/images/doge-dog.png"
          alt="illustration"
          width="68px"
          height="85px"
        />

        <div
          style={{ display: "grid", flexDirection: "row", lineHeight: "0px" }}
        >
          <h3>Switch earnings</h3>
          <h2>DOGE COIN.</h2>
        </div>
        <p>Feature releasing next in a while.</p>
      </banner>
      <Footer />
    </div>
  );
}
