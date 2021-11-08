import React from 'react'

function Search({ handleQuery, query }) {
  return (
    <>
      <h1>Look for a pokemon!</h1>
      <form>
        <div className="form-group">
          <label>
            Type a pokemon name
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
    </>
  )
}

export default Search
