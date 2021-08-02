import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Header = ({ variant, logo, title, content, isLoggedIn }) => {
  const [isSidebar, setIsSidebar] = useState(false);

  const renderDefaultHeader = (
    <header>
      <div className="header_routes">
        <logo>
          <Image alt="logo" width="72px" height="72px" src={logo} />
          <h3>{title}</h3>
        </logo>
        <div className="hamburger">
          {isSidebar ? (
            <Image
              src="/assets/icons/close.svg"
              alt="logo"
              width="24px"
              height="24px"
              layout="fixed"
              objectFit="contain"
              onClick={() => setIsSidebar(false)}
            />
          ) : (
            <Image
              src="/assets/icons/menu.svg"
              alt="logo"
              width="24px"
              height="24px"
              layout="fixed"
              objectFit="contain"
              onClick={() => setIsSidebar(true)}
            />
          )}
        </div>
      </div>
      <div className={isSidebar ? "header_content active" : "header_content"}>
        {content}
      </div>
    </header>
  );

  return !variant && renderDefaultHeader;
};

export default Header;
