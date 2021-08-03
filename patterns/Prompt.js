import React, { useState } from "react";

import Image from "next/image";

const Prompt = ({ variant, title, content, isOpen, setIsOpen }) => {
  const closePromptHandler = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const renderDefaultPrompt = (
    <backdrop>
      <prompt>
        <promptheader>
          <h3>{title}</h3>
          <icon onClick={(e) => closePromptHandler(e)}>
            <Image
              src="/assets/icons/close.svg"
              alt="icon"
              width="24px"
              height="24px"
            />
          </icon>
        </promptheader>
        <promptcontent>{content}</promptcontent>
      </prompt>
    </backdrop>
  );

  return !variant && isOpen && renderDefaultPrompt;
};

export default Prompt;
