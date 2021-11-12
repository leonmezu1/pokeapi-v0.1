import React, { useState, useEffect } from 'react';
import Pokemon from '../components/Pokemon';
import Search from '../components/Search';
import usePokedex from '../engine/usePokedex';
import usePokeSearch from '../engine/usePokeSearch';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import Modal from '../components/ModalStatic';

export default function PokeContainer() {
  const [query, setquery] = useState('');
  const [offset, setoffset] = useState(0);
  const [itemsCount] = useState(10);
  const [pokedexLoading, setLoading] = useState(false);
  const [searchLoading, setSearching] = useState(false);
  const [currentPokemons, setcurrentPokemons] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [detailedPokemon, setdetailedPokemon] = useState(null);

  const { pokemons: foundPokemons } = usePokeSearch(query, setSearching);
  const { pokemons: pokedex } = usePokedex(offset, itemsCount, setLoading);

  const handleQuery = e => {
    setquery(e.target.value);
  };

  const handleClick = poke => {
    setshowModal(true);
    setdetailedPokemon(poke);
  };

  useEffect(() => {
    console.log(foundPokemons);
    if (typeof foundPokemons === 'object' && !Array.isArray(foundPokemons)) {
      setcurrentPokemons([foundPokemons]);
    } else if (foundPokemons.length > 0 || foundPokemons === 'Not Found') {
      setcurrentPokemons(foundPokemons);
    } else {
      setcurrentPokemons(pokedex);
    }
  }, [foundPokemons, pokedex]);

  return (
    <>
      {pokedexLoading && <Spinner />}
      {searchLoading && <Spinner />}
      <div className="wrapper">
        <Search query={query} handleQuery={handleQuery} />
        <div className="poke-container">
          <>
            {currentPokemons === 'Not Found' && (
              <span className="not-found">Not Found</span>
            )}
            {currentPokemons.length > 0 && (
              <>
                {Array.isArray(currentPokemons) &&
                  currentPokemons.map(poke => (
                    <Pokemon
                      pokemonData={poke}
                      key={poke.id}
                      handleClick={handleClick}
                    />
                  ))}
              </>
            )}
          </>
        </div>
        <Modal show={showModal} setshow={setshowModal}>
          <Pokemon pokemonData={detailedPokemon} full />
        </Modal>
        <Pagination setoffset={setoffset} itemsCount={itemsCount} />
      </div>
    </>
  );
}
