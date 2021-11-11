import React, { useState, useEffect } from 'react';
import Catalog from '../components/Catalog';
import Pokemon from '../components/Pokemon';
import Search from '../components/Search';
import usePokedex from '../engine/usePokedex';
import usePokeSearch from '../engine/usePokeSearch';

function PokeContainer() {
  const [query, setquery] = useState('');
  const [page, setpage] = useState(0);
  const [pokedexLoading, setLoading] = useState(false);
  const [searchLoading, setSearching] = useState(false);
  const [currentPokemons, setcurrentPokemons] = useState([]);

  const { pokemons: foundPokemons, pokemonError: searchFetchError } =
    usePokeSearch(query, setSearching);
  const { pokemons: pokedex, error: pokedexFetchError } = usePokedex(
    page,
    setLoading,
  );

  const handleQuery = e => {
    setquery(e.target.value);
  };

  useEffect(() => {
    console.log(pokedex, foundPokemons);
    if (foundPokemons.length > 0) {
      setcurrentPokemons(foundPokemons);
      return;
    } else {
      setcurrentPokemons(pokedex);
    }
  }, [foundPokemons, pokedex]);

  return (
    <>
      <Search query={query} handleQuery={handleQuery} />
      {pokedexLoading && <h1>Fetching Pokedex</h1>}
      {searchLoading && <h1>Searching</h1>}
      {currentPokemons.length > 0 && (
        <>
          {currentPokemons.map(poke => (
            <Pokemon pokemonData={poke} key={poke.id} />
          ))}
        </>
      )}
      <Catalog />
    </>
  );
}

export default PokeContainer;
