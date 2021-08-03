import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { abi, address } from "../utils/constants";
import { useEagerConnect, useInactiveListener } from "../utils/hooks.ts";
import { Fetcher, WETH, Token, Route } from "@uniswap/sdk";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useRouter } from "next/router";
//import patterns

import { Header, Prompt, Card, Form, Block, Footer } from "../patterns";

//import data

import { seo, settings } from "../data";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { injected } from "../utils/connectors";
import Web3 from "web3";
import Modal from "../patterns/Modal";

const getFlooredFixed = (v, d) => {
  return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
};

export default function Home() {
  const router = useRouter();

  const [splashIsOn, setSplashIsOn] = useState(false);
  const [switchReferrerIsOn, setSwitchReferrerIsOn] = useState(false);
  const [inviteIsOn, setInviteIsOn] = useState(false);
  const [switchCoinIsOn, setSwitchCoinIsOn] = useState(false);
  const [acceptReferrerIsOn, setAcceptReferrerIsOn] = useState(false);
  const [connectWalletIsOn, setConnectWalletIsOn] = useState(false);
  const [toastIsOn, setToastIsOn] = useState(false);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const [isMetamask, setIsMetamask] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [price, setPrice] = useState();

  //const [address, setAddress] = useState("not connected");
  const [referrerAddress, setReferrerAddress] = useState("no referrer yet");
  const [dividendEarnings, setDividendEarnings] = useState("--");
  const [referralEarnings, setReferralEarnings] = useState();
  const [amountIn, setAmountIn] = useState(0);
  const [priceInBNB, setPriceInBNB] = useState();

  const [amountOut, setAmountOut] = useState("--");

  const [referrals, setReferrals] = useState([]);
  const [leaders, setLeaders] = useState([
    { address: "JH87SHV..HI", referrals: 23, earnings: 59 },
    { address: "87SHS9V..I4", referrals: 3, earnings: 509 },
  ]);

  const [WalletStatus, setWalletStatus] = useState();
  const [balance, setBalance] = useState();
  const [newReferer, setNewReferer] = useState();

  const { activate, active, account, connector, chainId } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = React.useState();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(async () => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
    if (active) {
      setWalletStatus("Connected");
      const balance = await updateBalance(account);
      setBalance(Web3.utils.fromWei(balance));
      const referals = await totalReferals(account);
      setReferrals(referals);
      await referalEarnings();
      await leaderBoard();
      getPriceofBiki();
    } else {
      setWalletStatus("Connect Wallet ⚛");
    }

    setSplashIsOn(true);
    setTimeout(() => {
      setSplashIsOn(false);
    }, 2000);
  }, [active, activatingConnector, connector, account]);

  useEffect(() => {
    setSplashIsOn(true);
    setTimeout(() => {
      setSplashIsOn(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (router.query.referrer) {
      setAcceptReferrerIsOn(true);
    }
  }, [router.query.referrer]);

  // handler functions

  const acceptReferrerHandler = async (e) => {
    e.preventDefault(e);
    setReferrerAddress(router.query.referrer);
    setAcceptReferrerIsOn(false);

    return await new new Web3(window.ethereum).eth.Contract(
      abi,
      address
    ).methods
      .setReferer(router.query.referrer)
      .send({ from: window.ethereum.selectedAddress });
  };

  const amountInHandler = (e) => {
    e.preventDefault(e);
    setAmountIn(e.target.value);
    setAmountOut(e.target.value / priceInBNB);
  };

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

  const getPriceofBiki = () => {
    const tokenAddress = address; // must be checksummed
    const decimals = 18;
    const BIKI = new Token(chainId, tokenAddress, decimals);

    const price = Promise.resolve(
      Fetcher.fetchPairData(BIKI, WETH[BIKI.chainId]),
      window.ethereum
    )
      .then((pair) => {
        return new Route([pair], WETH[BIKI.chainId]);
      })
      .then((route) => {
        return route.midPrice.toSignificant(6);
      })
      .then((res) => {
        setPriceInBNB(1 / res);
      });
  };

  const totalReferals = async (_address) => {
    const web3 = new Web3(window.ethereum);
    const topic = [
      "0x83819bdc988b1fce9e493fe39fff909311bd41a2f5671e45a4d7f5eab2d189a8",
      null,
      "0x" +
        web3.utils.toChecksumAddress(_address).split("0x")[1].padStart(64, "0"),
    ];
    const log = await web3.eth.getPastLogs({
      fromBlock: 0,
      toBlock: "latest",
      address: address,
      topics: topic,
    });
    console.log(log);
    const referals = new Array();
    for (let logs of log) {
      referals.push(web3.eth.abi.decodeParameter("address", logs.topics[1]));
    }

    return referals;
  };

  const sortTop = (info) => {
    const size = 10;
    const refs = info.slice(0, size).map((i) => {
      return i;
    });
    return refs;
  };

  const leaderBoard = async () => {
    const web3 = new Web3(window.ethereum);
    const topic = [
      "0x83819bdc988b1fce9e493fe39fff909311bd41a2f5671e45a4d7f5eab2d189a8",
      null,
      null,
    ];
    const log = await web3.eth.getPastLogs({
      fromBlock: 0,
      toBlock: "latest",
      address: address,
      topics: topic,
    });

    const referers = new Array();

    for (let logs of log) {
      referers.push(web3.eth.abi.decodeParameter("address", logs.topics[2]));
    }

    const info = new Array();

    if (referers != undefined) {
      for (let totalreferers of referers) {
        console.log(totalreferers);
        const totalReferers = await totalReferals(totalreferers);
        const totalreferal = totalReferers.length;
        info.push({ address: totalreferers, referrals: totalreferal });
      }
    }
    setLeaders(sortTop(info));
    console.log(sortTop(info));
  };

  const referalEarnings = async () => {
    const web3 = new Web3(window.ethereum);
    const totalReferal = await totalReferals(account);
    for (let referals of totalReferal) {
      const topic = [
        "0x7845c0c799d070edb9490e691a9c91923603f6edd8061ccd8570cd83a86c1745",
        "0x" +
          web3.utils
            .toChecksumAddress(account)
            .split("0x")[1]
            .padStart(64, "0"),
        "0x" +
          web3.utils
            .toChecksumAddress(referals)
            .split("0x")[1]
            .padStart(64, "0"),
      ];

      const log = await web3.eth.getPastLogs({
        fromBlock: 0,
        toBlock: "latest",
        address: address,
        topics: topic,
      });
      console.log(log);

      const referalRewards = new Array();
      for (let logs of log) {
        referalRewards =
          referalRewards +
          web3.utils.fromWei(web3.utils.hexToNumberString(logs.topics[3]));
      }
      setReferralEarnings(referalRewards);
    }
  };

  const inviteHandler = (e) => {
    e.preventDefault(e);
    setInviteIsOn(true);
  };

  const buyCoinHandler = (e) => {
    e.preventDefault(e);
  };

  const copyHandler = (e, msg) => {
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
    <block className="block_two">
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
        <p>{dividendEarnings}</p>
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
    <block className="block_three">
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
        <p>{referralEarnings} BIKI</p>
      </blockcontent>
    </block>
  );

  const renderMyEarningsBlock = (
    <block className="earnings_row">
      <block className="block_one">
        <h2>{dividendEarnings + referralEarnings}</h2>
        <h4>BNB Earned till now</h4>
      </block>

      {renderAutoDividendEarningsBlock}
      {renderReferralEarningBlock}
    </block>
  );

  const buyCoinFormContent = (
    <>
      <input
        onChange={(e) => amountInHandler(e)}
        value={amountIn}
        type="number"
        min={1}
        placeholder="enter BNB amount"
      />
      <label>You will get</label>
      <h3>{amountOut} DOGEX</h3>
      <label>for {amountIn} BNB</label>
      <button
        onClick={() => {
          window.open(
            "https://app.uniswap.org/#/swap?outputCurrency=".concat(address)
          );
        }}
      >
        Buy
      </button>
    </>
  );

  const mapReferrals = referrals.map((referral, index) => {
    return (
      <blockinput className="ref" key={index}>
        <icon>
          <Image
            src="/assets/icons/icon-address.svg"
            alt="illustration"
            width="14px"
            height="14px"
          />
        </icon>
        <p>
          1
          {/* {`${referral?.address?.slice(0, 6)}...${referral?.address?.slice(
              referral?.address?.length - 6
            )}`} */}
        </p>
        <CopyToClipboard text={referral}>
          <icon onClick={(e) => copyHandler(e)}>
            <Image
              src="/assets/icons/icon-copy.svg"
              alt="illustration"
              width="14px"
              height="14px"
            />
          </icon>
        </CopyToClipboard>
      </blockinput>
    );
  });

  const refferalContent =
    referrals.length !== 0 ? (
      mapReferrals
    ) : (
      <div
        style={{
          textAlign: "center",
          height: "inherit",
          display: "grid",
          placeItems: "center",
        }}
      >
        You haven't reffered anyone yet.
      </div>
    );

  const mapLeaders = leaders.map((leader, index) => {
    return (
      <div key={index}>
        <blockinput className="ref">
          <icon>
            <Image
              src="/assets/icons/icon-address.svg"
              alt="illustration"
              width="14px"
              height="14px"
            />
          </icon>
          <p>
            {`${leader?.address?.slice(0, 6)}...${leader?.address?.slice(
              leader?.address?.length - 6
            )}`}
          </p>
          <CopyToClipboard text={leader?.address}>
            <icon onClick={(e) => copyHandler(e)}>
              <Image
                src="/assets/icons/icon-copy.svg"
                alt="illustration"
                width="14px"
                height="14px"
              />
            </icon>
          </CopyToClipboard>
        </blockinput>
        <block style={{ marginTop: "12px" }} className="card_row">
          <label>Earned | {leader.earnings} USD</label>
          <label>Referrals | {leader.referrals}</label>
        </block>
      </div>
    );
  });

  const leaderboardContent =
    leaders.length !== 0 ? (
      mapLeaders
    ) : (
      <label
        style={{
          marginTop: "130px",
          alignSelf: "center",
          justifySelf: "center",
        }}
      >
        The winners will be announced shortly.
      </label>
    );

  const renderMain = (
    <contentmain>
      <Card
        variant="referrals-card"
        content={refferalContent}
        count={referrals?.length}
      />
      <column>
        <div className="form_header">
          <div>
            <h3 style={{ marginBottom: 16 }}>
              Stake DogeX and start earning BNB / DOGE
            </h3>
            <div className="flex_gap">
              <info>You will be redirected to UNISWAP for buying DogeX</info>
              <button
                onClick={(e) => switchCoinHandler(e)}
                className="button-mini"
              >
                switch coin
              </button>
            </div>
          </div>
          <div></div>
        </div>
        <Form
          address={address}
          amountIn={amountIn}
          amountInHandler={amountInHandler}
          amountOut={amountOut}
        />
      </column>
      <Card variant="leaderboard-card" content={leaderboardContent} />
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
        <p>{balance && getFlooredFixed(balance, 2)}</p>
      </blockcontent>
    </block>
  );

  // rendering contents

  const switchReferrerPromptContent = (
    <>
      <input
        placeholder="paste new referrer address here"
        onChange={(e) => setNewReferer(e.target.value)}
      />
      <button
        onClick={async () => {
          return await new new Web3(window.ethereum).eth.Contract(
            abi,
            address
          ).methods
            .setReferer(newReferer)
            .send({ from: window.ethereum.selectedAddress });
        }}
      >
        Add referrer
      </button>
    </>
  );

  const acceptReferrerPromptContent = (
    <blockinput className="ref">
      <icon>
        <Image
          src="/assets/icons/icon-referrer.svg"
          alt="illustration"
          width="14px"
          height="14px"
        />
      </icon>
      <p> {router.query.referrer}</p>
      <button onClick={(e) => acceptReferrerHandler(e)}>Accept referrer</button>
    </blockinput>
  );

  const invitePromptContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <blockinput className="ref">
        <icon>
          <Image
            src="/assets/icons/icon-referrer.svg"
            alt="illustration"
            width="14px"
            height="14px"
          />
        </icon>
        <p>
          {settings.application_base_url}/?referrer={account}
        </p>
        <CopyToClipboard
          text={`${settings.application_base_url}/?referrer=${account}`}
        >
          <icon onClick={(e) => copyHandler(e, "url")}>
            <Image
              src="/assets/icons/icon-copy.svg"
              alt="illustration"
              width="14px"
              height="14px"
            />
          </icon>
        </CopyToClipboard>
      </blockinput>
      <label style={{ color: "rgb(24, 177, 24)", fontSize: "10px" }}>
        Copy your link and invite friends via this link
      </label>
    </div>
  );

  const connectWalletPromptContent = (
    <>
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
      <label style={{ color: "rgb(24, 177, 24)", fontSize: "10px" }}>
        Copy your link and invite friends via this link
      </label>
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
      <button onClick={() => activate(injected)}>{WalletStatus}</button>
    </>
  );

  const renderUserDetails = (
    <div className="user_details">
      <Block switchReferrerHandler={switchReferrerHandler} />
      <blockinput>
        <icon>
          <Image
            src="/assets/icons/icon-address.svg"
            alt="illustration"
            width="24px"
            height="24px"
            layout="fixed"
            objectFit="contain"
          />
        </icon>
        <blockinputcontent>
          <label>My address</label>
          {account && (
            <p>{`${account?.slice(0, 6)}...${account?.slice(
              account?.length - 6
            )}`}</p>
          )}
        </blockinputcontent>
        <CopyToClipboard text={account}>
          <icon onClick={(e) => copyHandler(e)}>
            <Image
              src="/assets/icons/icon-copy.svg"
              alt="illustration"
              width="14px"
              height="14px"
              layout="fixed"
              objectFit="contain"
            />
          </icon>
        </CopyToClipboard>
      </blockinput>
      {renderBalanceBlock}
    </div>
  );

  const renderCopiedToast = (
    <toast>
      <label>copied address</label>
    </toast>
  );

  return (
    <>
      {splashIsOn && renderSplash}
      <div className={styles.container}>
        {toastIsOn && renderCopiedToast}
        {renderseo}
        <Header
          logo={settings.application_logo_path}
          title={settings.application_name}
          content={headerContent}
          isLoggedIn={false}
        />
        {renderUserDetails}
        <content>
          {renderMain}
          {renderInviteBanner}
          {renderFeatureBanner}
          <Prompt
            isOpen={
              switchReferrerIsOn ||
              connectWalletIsOn ||
              switchCoinIsOn ||
              inviteIsOn ||
              acceptReferrerIsOn
            }
            setIsOpen={
              (switchReferrerIsOn && setSwitchReferrerIsOn) ||
              (connectWalletIsOn && setConnectWalletIsOn) ||
              (switchCoinIsOn && setSwitchCoinIsOn) ||
              (inviteIsOn && setInviteIsOn) ||
              (acceptReferrerIsOn && setAcceptReferrerIsOn)
            }
            title={
              (switchReferrerIsOn && "Switch Referrer") ||
              (connectWalletIsOn && "Select a wallet") ||
              (switchCoinIsOn && "Feature under construction") ||
              (inviteIsOn && "Your invite link") ||
              (acceptReferrerIsOn && "Accept referrer")
            }
            content={
              (switchReferrerIsOn && switchReferrerPromptContent) ||
              (connectWalletIsOn && connectWalletPromptContent) ||
              (switchCoinIsOn && switchCoinPromptContent) ||
              (inviteIsOn && invitePromptContent) ||
              (acceptReferrerIsOn && acceptReferrerPromptContent)
            }
          />
        </content>
        <Footer />
      </div>
      {isConnected && (
        <Modal
          title="Connect your wallet"
          connect={true}
          activate={activate}
          setIsModal={setIsConnected}
        />
      )}
      {isWrongNetwork && (
        <Modal
          title="WrongNetwork"
          content="Please connect to Goering test net"
          setIsModal={setIsWrongNetwork}
        />
      )}
      {isMetamask && (
        <Modal
          title="Install metamask"
          inValid={true}
          content="Install metamask extension from your browser to proceed further"
          setIsModal={setIsMetamask}
        />
      )}
    </>
  );
}
