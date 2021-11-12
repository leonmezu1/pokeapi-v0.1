import React from 'react';

export default function Search({ handleQuery, query }) {
  return (
    <>
      <div className="search shadow">
        <h2>Look for a pokemon!</h2>
        <form>
          <div className="form-group">
            <label>
              <input
                type="text"
                name="query"
                id="query"
                placeholder="Type here"
                autoComplete="off"
                value={query}
                onChange={handleQuery}
              />
            </label>
          </div>
        </form>
      </div>
    </>
  );
}
