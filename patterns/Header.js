import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Header = ({ variant, logo, title, content, isLoggedIn }) => {
  const [isSidebar, setIsSidebar] = useState(false);

  const renderDefaultHeader = (
    <header>
      <logo>
        <Image
          alt="logo"
          width="48px"
          height="48px"
          layout="fixed"
          objectFit="contain"
          src={logo}
        />
        <h3>{title}</h3>
      </logo>
      {content}
    </header>
  );

  return !variant && renderDefaultHeader;
};

export default Header;
