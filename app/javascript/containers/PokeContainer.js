import React, { useState } from 'react'
import Catalog from '../components/Catalog'
import Search from '../components/Search'

function PokeContainer() {
  const [pocketMonsters, setpocketMonsters] = useState({
    name: '',
    type: '',
    activePokemon: null,
    search_results: [],
    query: ''
  })

  const handleQuery = (e) => {
    setpocketMonsters({
      ...pocketMonsters,
      [e.target.name]: e.target.value,
    })
  }

  const { query } = pocketMonsters;

  return (
    <>
      <Search query={query} handleQuery={handleQuery} />
      <Catalog />
    </>
  )
}

export default PokeContainer
