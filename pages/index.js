import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


//import patterns 

import {Header,Prompt,Card,Form,Footer} from '../patterns'


//import data

import {seo, settings} from '../data'

export default function Home() {

  const [splashIsOn, setSplashIsOn] = useState(false)
  const [switchReferrerIsOn,setSwitchReferrerIsOn] = useState(false)
  const [connectWalletIsOn,setConnectWalletIsOn] = useState(false)

  useEffect(() => {

    setSplashIsOn(true)
    setTimeout(() => { setSplashIsOn(false) }, 2000)
  },[])

  // handler functions

   const connectWalletHandler = (e) => {
     e.preventDefault(e)
     console.log('connecting...')
     setConnectWalletIsOn(true)
  }

  const inviteHandler = (e) => {
    e.preventDefault(e)
  }

  const buyCoinHandler = (e) => {
    e.preventDefault(e)
  }

  const copyHandler = (e) => {
    e.preventDefault(e)
  }

  const switchCoinHandler = (e) => {
    e.preventDefault(e)
  }

  const switchReferrerHandler = (e) => {
    e.preventDefault(e)
    setSwitchReferrerIsOn(true)
  }



  const renderseo =
    <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="icon" href={seo.favicon_public_path} />
    </Head>
  
    const renderMyEarningsBlock =
  <block>
      <blockheader>
        <h4>Earnings in BNB     |  250 BNB</h4>
        <button className='button-mini'>
          switch coin
        </button>
      </blockheader>
      </block>
  



  const renderMain =
    <contentmain >
      <Card variant='referrals-card' />
      <column>{renderMyEarningsBlock}
        <Form />
      </column>
      <Card variant='leaderboard-card'/>
    </contentmain>
  
  const renderSplash =
  <splash>
      <splashcontent>
      <p>loading</p>
      </splashcontent>
  </splash>
  

  

  

  const renderReferrerBlock = <blockinformation>
    <icon>
      <Image src='/assets/icons/icon-referrer.svg' alt='illustration' width='24px' height='24px' />
  </icon>
          <blockcon>
          <label>
            Referrer address
          </label>
      <p>0x4c7...497A1De2a69</p>
    </blockcon>
  </blockinformation>
  

  const renderBalanceBlock = <blockinformation>
    <icon>
      <Image src='/assets/icons/icon-balance.svg' alt='illustration' width='24px' height='24px' />
  </icon>
          <blockcon>
          <label>
            DOGEX Balance
          </label>
      <p>0</p>
    </blockcon>
  </blockinformation>

  // rendering contents

  const switchReferrerPromptContent =
  <>
    <input placeholder='paste new referrer address here' />
    <button>Switch referrer</button>
  </>
  
    const connectWalletPromptContent =
  <>
        <icon>Metamask Wallet</icon>
    <button>Connect wallet</button>
  </>
  

  const headerContent =
  <>
      {renderReferrerBlock}
      <button onClick={(e) => switchReferrerHandler(e)} className='button-mini'>Switch referrer</button>
      <inputblock><p>x98abhv..87</p></inputblock>
      {renderBalanceBlock}
      <button onClick={(e)=> connectWalletHandler(e)}>Connect wallet</button>
  </>
 
  return (
    <div className={styles.container}>
      
      {renderseo}
      {splashIsOn && renderSplash}
      <Header logo={settings.application_logo_path} title={settings.application_name} content={headerContent} isLoggedIn={ false}/>

      <content>
        {renderMain}
        <Prompt
          isOpen={switchReferrerIsOn || connectWalletIsOn}
          setIsOpen={switchReferrerIsOn && setSwitchReferrerIsOn
            || connectWalletIsOn && setConnectWalletIsOn}
          title={switchReferrerIsOn && 'Switch Referrer' ||
                  connectWalletIsOn && 'Select a wallet'}
          content={switchReferrerIsOn && switchReferrerPromptContent
            || connectWalletIsOn && connectWalletPromptContent} />
      </content>

      <banner>
                <Image src='/assets/images/doge-dog.png' alt='illustration' width='68px' height='85px' />

        <div style={{ display: 'grid', flexDirection: 'row', lineHeight: '0px'}}>
           <h3>
          Switch earnings
        </h3>
          <h2>
          DOGE COIN.
        </h2>
        </div>
        <p>Feature releasing next in a while.</p>
      </banner>
      <Footer/>
    </div>
  )
}
