import React, { useState } from 'react';
import Catalog from '../components/Catalog';
import Search from '../components/Search';
import usePokedex from '../engine/usePokedex';
import usePokeSearch from '../engine/usePokeSearch';

function PokeContainer() {
  const [query, setquery] = useState('');
  const [page, setpage] = useState(0);

  const {
    pokemon,
    loading: searchLoading,
    error: searchError,
  } = usePokeSearch(query);
  const {
    pokedex,
    loading: pokedexLoading,
    error: pokedexError,
  } = usePokedex(page);

  const handleQuery = e => {
    setquery(e.target.value);
  };

  return (
    <>
      <Search query={query} handleQuery={handleQuery} />
      <Catalog />
    </>
  );
}

export default PokeContainer;
