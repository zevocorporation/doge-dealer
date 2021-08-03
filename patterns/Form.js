import Image from "next/image";
import React, { useState } from "react";
import { render } from "react-dom";

const Form = ({ variant, label, title, content }) => {
  const renderInputForm = (
    <div className="form_control">
      <p>From</p>
      <div>
        <input type="number" placeholder="0" min="0" />
        <span>BNB</span>
      </div>
    </div>
  );

  const renderOutputForm = (
    <div className="form_control">
      <p>To</p>
      <div>
        <input type="number" placeholder="0" min="0" />
        <span>BNB</span>
      </div>
    </div>
  );

  const renderDefaultForm = (
    <form>
      {renderInputForm}
      {renderOutputForm}
      <button>Exchange</button>
    </form>
  );

  return !variant && renderDefaultForm;
};

export default Form;
