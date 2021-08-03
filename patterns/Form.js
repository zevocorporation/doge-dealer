import Image from "next/image";
import React, { useState } from "react";
import { render } from "react-dom";

const Form = ({ variant, address, amountIn, amountInHandler, amountOut }) => {
  const renderInputForm = (
    <div className="form_control">
      <p>Enter a DOGE amount</p>
      <div>
        <input
          type="number"
          placeholder="0"
          min="0"
          onChange={(e) => amountInHandler(e)}
          value={amountIn === 0 ? "" : amountIn}
          placeholder="Enter BNB amount"
        />
        <p>
          <Image
            src="/assets/icons/dogecoin.jpg"
            width="24px"
            height="24px"
            layout="fixed"
            objectFit="contain"
          />
          <span style={{ fontSize: 16 }}>DOGE</span>
        </p>
      </div>
    </div>
  );

  const renderOutputForm = (
    <div className="form_control">
      <p>you will get</p>
      <div>
        <input type="number" value={amountOut} placeholder="0" readOnly />
        <p>
          <Image
            src="/assets/logos/logo.png"
            width="24px"
            height="24px"
            layout="fixed"
            objectFit="contain"
          />
          <span style={{ fontSize: 16 }}>DOGEX</span>
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
