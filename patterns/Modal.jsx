import React from "react";
import Image from "next/image";
import { injected } from "../utils/connectors";

const Modal = ({ title, content, setIsModal, inValid, activate, connect }) => {
  const renderModal = (
    <>
      <backdrop>
        <prompt>
          <promptheader>
            <h3>{title}</h3>
            {!inValid && (
              <icon onClick={() => setIsModal(false)}>
                <Image
                  src="/assets/icons/close.svg"
                  alt="icon"
                  width="24px"
                  height="24px"
                  layout="fixed"
                  objectFit="contain"
                />
              </icon>
            )}
          </promptheader>
          <div className="modal_content">{content}</div>
          {connect && (
            <button onClick={() => activate(injected)}>Connect wallet</button>
          )}
        </prompt>
      </backdrop>
    </>
  );
  return renderModal;
};

export default Modal;
