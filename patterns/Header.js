import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Header = ({ variant, logo, title, content, isLoggedIn }) => {
  const renderDefaultHeader = (
    <header>
      <logo>
        <Image alt="logo" width="72px" height="72px" src={logo} />
        <h3>{title}</h3>
      </logo>
      {content}
    </header>
  );

  return !variant && renderDefaultHeader;
};

export default Header;
