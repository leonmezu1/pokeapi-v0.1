import React from 'react';

export default function Pagination({ setoffset, itemsCount }) {
  return (
    <div className="pagination-buttons">
      <button
        onClick={() => setoffset((offset) => {
          if (offset > itemsCount) {
            return (offset -= itemsCount);
          }
          return 0;
        })}
      >
        {'< Prev'}
      </button>
      <button onClick={() => setoffset((offset) => (offset += itemsCount))}>
        {'Next >'}
      </button>
    </div>
  );
}
