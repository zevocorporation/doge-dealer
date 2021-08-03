import Image from "next/image";
import React, { useState } from "react";
import { render } from "react-dom";

const Form = ({ variant, label, title, content, address }) => {
  const renderInputForm = (
    <div className="form_control">
      <p>Enter a BNB amount</p>
      <div>
        <input type="number" placeholder="0" min="0" />
        <p>
          <Image
            src="/assets/logos/logo.png"
            width="24px"
            height="24px"
            layout="fixed"
            objectFit="contain"
          />
          <span style={{ fontSize: 16 }}>BNB</span>
        </p>
      </div>
    </div>
  );

  const renderOutputForm = (
    <div className="form_control">
      <p>you will get DOGEX</p>
      <div>
        <input type="number" placeholder="0" min="0" />
        <p>
          <Image
            src="/assets/logos/logo.png"
            width="24px"
            height="24px"
            layout="fixed"
            objectFit="contain"
          />
          <span style={{ fontSize: 16 }}>BNB</span>
        </p>
      </div>
    </div>
  );

  const renderDefaultForm = (
    <form>
      {renderInputForm}
      {renderOutputForm}
      <button
        onClick={() => {
          window.open(
            "https://app.uniswap.org/#/swap?outputCurrency=".concat(address)
          );
        }}
      >
        Buy
      </button>
    </form>
  );

  return !variant && renderDefaultForm;
};

export default Form;
