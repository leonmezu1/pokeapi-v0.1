import React, { useRef } from 'react';

const Modal = function ({ children, show, setshow }) {
  const modalRef = useRef();

  return show ? (
    <>
      <div
        className="modal-background"
        ref={modalRef}
        onClick={() => setshow && setshow(false)}
      />
      <div className="styled-modal">
        <div className="close" onClick={() => setshow && setshow(false)}>
          &#10006;
        </div>
        {children}
      </div>
    </>
  ) : null;
};

export default Modal;
