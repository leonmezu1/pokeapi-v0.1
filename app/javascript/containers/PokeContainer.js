import React, { useState, useEffect } from 'react';
import Pokemon from '../components/Pokemon';
import Search from '../components/Search';
import usePokedex from '../engine/usePokedex';
import usePokeSearch from '../engine/usePokeSearch';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';

function PokeContainer() {
  const [query, setquery] = useState('');
  const [offset, setoffset] = useState(0);
  const [itemsCount, setItemsCount] = useState(50);
  const [pokedexLoading, setLoading] = useState(false);
  const [searchLoading, setSearching] = useState(false);
  const [currentPokemons, setcurrentPokemons] = useState([]);

  const { pokemons: foundPokemons, pokemonError: searchFetchError } =
    usePokeSearch(query, setSearching);
  const { pokemons: pokedex, error: pokedexFetchError } = usePokedex(
    offset,
    itemsCount,
    setLoading,
  );

  const handleQuery = e => {
    setquery(e.target.value);
  };

  useEffect(() => {
    if (foundPokemons.length > 0) {
      setcurrentPokemons(foundPokemons);
      return;
    } else {
      setcurrentPokemons(pokedex);
    }
  }, [foundPokemons, pokedex]);

  useEffect(() => {
    console.log(offset);
  }, [offset]);

  return (
    <>
      {pokedexLoading && <Spinner />}
      {searchLoading && <Spinner />}
      <div className="wrapper">
        <Search query={query} handleQuery={handleQuery} />
        <div className="poke-container">
          {currentPokemons.length > 0 && (
            <>
              {Array.isArray(currentPokemons) &&
                currentPokemons.map(poke => (
                  <Pokemon pokemonData={poke} key={poke.id} />
                ))}
            </>
          )}
        </div>
        <Pagination setoffset={setoffset} itemsCount={itemsCount} />
      </div>
    </>
  );
}

export default PokeContainer;
