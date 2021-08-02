import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { abi, address } from "../utils/constants";

const Block = ({ variant, logo, title, content, isLoggedIn }) => {
  const [Referrer, setReferer] = useState();

  const { active, account, chainId } = useWeb3React();

  useEffect(async () => {
    if (active) {
      const referrer = await updateReferer(account);
      setReferer(referrer);
    }
  }, [active, account, chainId]);

  const updateReferer = async (_address) => {
    return await new new Web3(window.ethereum).eth.Contract(
      abi,
      address
    ).methods
      .referer(_address)
      .call();
  };

  const renderDefaultBlock = (
    <block>
      <icon>
        <Image
          src="/assets/icons/icon-referrer.svg"
          alt="illustration"
          width="24px"
          height="24px"
        />
      </icon>
      <blockcontent>
        <label>Referrer address</label>
        <p>{Referrer}</p>
      </blockcontent>
    </block>
  );

  return !variant && renderDefaultBlock;
};

export default Block;
