import React from 'react';
import pokeball from 'images/pokeball.png';

const Spinner = function () {
  return (
    <div className="spin-wrap">
      <div className="spinner">
        <img src={pokeball} alt="pokeball spinner" />
      </div>
    </div>
  );
};

export default Spinner;
