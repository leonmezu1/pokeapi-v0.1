import React from 'react';
import pokeball from 'images/pokeball.png';
function Spinner() {
  return (
    <div className="spin-wrap">
      <div className="spinner">
        <img src={pokeball} alt="pokeball spinner" />
      </div>
    </div>
  );
}

export default Spinner;
