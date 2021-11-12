import React, { useRef } from 'react';
import PropTypes from 'prop-types';

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

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  show: PropTypes.bool.isRequired,
  setshow: PropTypes.func.isRequired,
};
