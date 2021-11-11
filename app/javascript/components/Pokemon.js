import React from 'react';
import PropTypes from 'prop-types';

function Pokemon({ pokemonData }) {
  return (
    <>
      <div className="img-container">
        <img src={pokemonData.image} alt={pokemonData.name} />
      </div>
      <div className="info">
        <span className="number">
          #${pokemonData.number.toString().padStart(3, '0')}
        </span>
        <h3 className="name">{pokemonData.name}</h3>
        <small className="type">
          {JSON.parse(pokemonData.pokemon_type).map(type => (
            <p key={`${pokemonData.name}-${type}`}>{type}</p>
          ))}
        </small>
      </div>
    </>
  );
}

export default Pokemon;

Pokemon.propTypes = {
  pokemonData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    abilities: PropTypes.string.isRequired,
    evolutions: PropTypes.string.isRequired,
    evolution_chain: PropTypes.string.isRequired,
    pokemon_type: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
};
