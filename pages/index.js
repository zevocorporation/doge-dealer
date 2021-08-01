import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { abi, address } from "../utils/constants";

//import patterns

import { Header, Prompt, Card, Form, Block, Footer } from "../patterns";

//import data

import { seo, settings } from "../data";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../utils/connectors";
import Web3 from "web3";

export default function Home() {
  const [splashIsOn, setSplashIsOn] = useState(false);
  const [switchReferrerIsOn, setSwitchReferrerIsOn] = useState(false);
  const [inviteIsOn, setInviteIsOn] = useState(false);
  const [switchCoinIsOn, setSwitchCoinIsOn] = useState(false);
  const [connectWalletIsOn, setConnectWalletIsOn] = useState(false);
  const [toastIsOn, setToastIsOn] = useState(false);
  const [WalletStatus, setWalletStatus] = useState();
  const [balance, setBalance] = useState();

  const { activate, active, account } = useWeb3React();

  useEffect(async () => {
    if (active) {
      setWalletStatus("Connected👍");
      const balance = await updateBalance(account);
      setBalance(balance);
    } else {
      setWalletStatus("Coonect Wallet to Proceed⚛");
    }

    setSplashIsOn(true);
    setTimeout(() => {
      setSplashIsOn(false);
    }, 2000);
  }, [active, account]);

  // handler functions

  const connectWalletHandler = (e) => {
    e.preventDefault(e);
    setConnectWalletIsOn(true);
  };

  const updateBalance = async (_address) => {
    return await new new Web3(window.ethereum).eth.Contract(
      abi,
      address
    ).methods
      .balanceOf(_address)
      .call();
  };

  const inviteHandler = (e) => {
    e.preventDefault(e);
    setInviteIsOn(true);
  };

  const buyCoinHandler = (e) => {
    e.preventDefault(e);
  };

  const copyHandler = (e) => {
    e.preventDefault(e);
    setToastIsOn(true);
    if (inviteIsOn) {
      setInviteIsOn(false);
    }
    setTimeout(() => {
      setToastIsOn(false);
    }, 1000);
  };

  const switchCoinHandler = (e) => {
    e.preventDefault(e);
    setSwitchCoinIsOn(true);
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

  const renderAutoDividendEarningsBlock = (
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
        <label>Auto-dividend earnings</label>
        <p>0</p>
      </blockcontent>
    </block>
  );

  const renderInviteBanner = (
    <banner className="mini-banner">
      <>
        <h3>Invite & Earn referral income with</h3>
        <h2>AUTO DIVIDENDS</h2>
        <button onClick={(e) => inviteHandler(e)}>Get invite link</button>
      </>
    </banner>
  );

  const renderFeatureBanner = (
    <banner>
      <Image
        src="/assets/images/doge-dog.png"
        alt="illustration"
        width="68px"
        height="85px"
      />

      <div style={{ display: "grid", flexDirection: "row", lineHeight: "0px" }}>
        <column className="row">
          <h3>Switch earnings to</h3>
          <h2 style={{ color: "black" }}>DOGE COIN.</h2>
        </column>
      </div>
      <p>Upnext ! Feature releasing in a while.</p>
    </banner>
  );

  const renderReferralEarningBlock = (
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
        <label>Referral earnings</label>
        <p>0</p>
      </blockcontent>
    </block>
  );

  const totalEarnings = 90;
  const renderMyEarningsBlock = (
    <block className="row">
      <block>
        <h2>{totalEarnings}</h2>
        <h4>BNB Earned till now</h4>
      </block>

      {renderAutoDividendEarningsBlock}
      {renderReferralEarningBlock}
      <button onClick={(e) => switchCoinHandler(e)} className="button-mini">
        switch coin
      </button>
    </block>
  );

  const buyCoinFormContent = (
    <>
      <input type="number" placeholder="enter BNB amount" />
      <label>You will get</label>
      <h3>{"0"} DOGEX</h3>
      <label>for 50 BNB</label>
      <button>Buy</button>
    </>
  );

  const refferalContent = (
    <blockinput className="ref">
      <icon>
        <Image
          src="/assets/icons/icon-address.svg"
          alt="illustration"
          width="14px"
          height="14px"
        />
      </icon>
      <p> A8BH..X8</p>
      <icon onClick={(e) => copyHandler(e)}>
        <Image
          src="/assets/icons/icon-copy.svg"
          alt="illustration"
          width="14px"
          height="14px"
        />
      </icon>
    </blockinput>
  );

  const renderMain = (
    <contentmain>
      <Card variant="referrals-card" content={refferalContent} />
      <column>
        {renderMyEarningsBlock}
        <block className="row">
          <h3>Stake DogeX and start earning BNB / DOGE</h3>
          <info>
            <span>
              <icon>
                <Image
                  alt="info"
                  src="/assets/icons/icon-asterisk.svg"
                  height="10px"
                  width="10px"
                />
              </icon>
            </span>
            You will be redirected to UNISWAP for buying DogeX
          </info>
        </block>
        <Form label={"1 DogeX = 0.09 BNB"} content={buyCoinFormContent} />
        {renderInviteBanner}
        {renderFeatureBanner}
      </column>
      <Card variant="leaderboard-card" />
    </contentmain>
  );

  const renderSplash = (
    <splash>
      <splashcontent>
        <Image
          alt="logo"
          src="/assets/logos/logo.png"
          width="120px"
          height="120px"
        />
        <h3>Dogedealer</h3>
        <p>loading...</p>
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
        <p>{balance}</p>
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

  const invitePromptContent = (
    <>
      <blockinput className="ref">
        <icon>
          <Image
            src="/assets/icons/icon-address.svg"
            alt="illustration"
            width="14px"
            height="14px"
          />
        </icon>
        <p> A8BH..X8</p>
        <icon onClick={(e) => copyHandler(e)}>
          <Image
            src="/assets/icons/icon-copy.svg"
            alt="illustration"
            width="14px"
            height="14px"
          />
        </icon>
      </blockinput>{" "}
      <label style={{ color: "rgb(24, 177, 24)", fontSize: "10px" }}>
        Copy your link and invite friends via this link
      </label>
    </>
  );

  const connectWalletPromptContent = (
    <>
      <icon>
        <Image
          src="/assets/logos/logo-metamask.png"
          alt="logo-metamask"
          width="146px"
          height="70px"
        />
      </icon>
      <button>Connect now</button>
    </>
  );

  const switchCoinPromptContent = (
    <label>
      We are building a feature to switch earnings to DOGE. Releasing in a
      while.
    </label>
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
          <label>My address</label>
          <p>{account}</p>
        </blockinputcontent>
        <icon onClick={(e) => copyHandler(e)}>
          <Image
            src="/assets/icons/icon-copy.svg"
            alt="illustration"
            width="14px"
            height="14px"
          />
        </icon>
      </blockinput>
      {renderBalanceBlock}
      <button onClick={() => activate(injected)}>{WalletStatus}</button>
    </>
  );

  const renderCopiedToast = (
    <toast>
      <label>copied address</label>
    </toast>
  );

  return (
    <div className={styles.container}>
      {toastIsOn && renderCopiedToast}
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
          isOpen={
            switchReferrerIsOn ||
            connectWalletIsOn ||
            switchCoinIsOn ||
            inviteIsOn
          }
          setIsOpen={
            (switchReferrerIsOn && setSwitchReferrerIsOn) ||
            (connectWalletIsOn && setConnectWalletIsOn) ||
            (switchCoinIsOn && setSwitchCoinIsOn) ||
            (inviteIsOn && setInviteIsOn)
          }
          title={
            (switchReferrerIsOn && "Switch Referrer") ||
            (connectWalletIsOn && "Select a wallet") ||
            (switchCoinIsOn && "Feature under construction") ||
            (inviteIsOn && "Your invite link")
          }
          content={
            (switchReferrerIsOn && switchReferrerPromptContent) ||
            (connectWalletIsOn && connectWalletPromptContent) ||
            (switchCoinIsOn && switchCoinPromptContent) ||
            (inviteIsOn && invitePromptContent)
          }
        />
      </content>

      <Footer />
    </div>
  );
}
