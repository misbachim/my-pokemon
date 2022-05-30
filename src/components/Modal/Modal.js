import React from "react";
import './styles.css';

export default function Modal({ handleClose, show, children }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main framed">
        {children}
      </section>
    </div>
  );
};