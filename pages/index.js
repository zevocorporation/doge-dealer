import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

//import patterns

import { Header, Prompt, Card, Form, Block, Footer } from "../patterns";

//import data

import { seo, settings } from "../data";

export default function Home() {
  const [splashIsOn, setSplashIsOn] = useState(false);
  const [switchReferrerIsOn, setSwitchReferrerIsOn] = useState(false);
  const [connectWalletIsOn, setConnectWalletIsOn] = useState(false);

  useEffect(() => {
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
        <button>Get invite link</button>
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
        <h3>Switch earnings</h3>
        <h2>DOGE COIN.</h2>
      </div>
      <p>Feature releasing next in a while.</p>
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
      <button className="button-mini">switch coin</button>
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

  const renderMain = (
    <contentmain>
      <Card variant="referrals-card" />
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
      <icon>
        <Image
          src="/assets/logos/logo-metamask.png"
          alt="logo-metamask"
          width="146px"
          height="70px"
        />
      </icon>
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
          <label>My address</label>
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

      <Footer />
    </div>
  );
}
