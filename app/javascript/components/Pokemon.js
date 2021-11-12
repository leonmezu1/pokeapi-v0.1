import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../helpers/colors';

const Pokemon = function ({ pokemonData, handleClick, full }) {
  const pokeTypes = JSON.parse(pokemonData.pokemon_type);
  const pokeAbilities = JSON.parse(pokemonData.abilities);
  const pokeEvo = JSON.parse(pokemonData.evolutions);
  return (
    <div
      className={`pokemon shadow ${full ? 'p-10 m-0' : null}`}
      style={{ background: colors[pokeTypes[0]] }}
      onClick={() => handleClick(pokemonData)}
    >
      <div className="img-container">
        <img src={pokemonData.image} alt={pokemonData.name} />
      </div>
      <div className="info">
        <span className="number">
          {pokemonData.number.toString().padStart(3, '0')}
        </span>
        <h3 className="name">{pokemonData.name}</h3>
        {full && (
          <div className="info-group">
            <h5 className="info-group-title">Description</h5>
            <div className="info-group-items">
              <p className="item">
                {pokemonData.description
                  .replace(/\n/g, ' ')
                  .replace(/\f/g, ' ')}
              </p>
            </div>
          </div>
        )}
        <div className="info-group">
          <h5 className="info-group-title">Types</h5>
          <div className="info-group-items">
            {pokeTypes.map(type => (
              <span
                className="type"
                key={`${pokemonData.name}-${type}`}
                style={{ background: colors[pokeTypes[0]] }}
              >
                {`${type[0].toUpperCase()}${type.substring(1)}`}
              </span>
            ))}
          </div>
        </div>
        {full && (
          <div className="info-group">
            <h5 className="info-group-title">Evolutions</h5>
            <div className="info-group-items">
              {pokeEvo.map(evo => (
                <span
                  className="type"
                  key={`${pokemonData.name}-${evo.name}`}
                  style={{ background: colors[pokeTypes[0]] }}
                >
                  {`${evo.name[0].toUpperCase()}${evo.name.substring(1)}`}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="info-group">
          <h5 className="info-group-title">Abilities</h5>
          <div className="info-group-items">
            {pokeAbilities.map(ability => (
              <span
                className="type"
                key={`${pokemonData.name}-${ability}`}
                style={{ background: colors[pokeTypes[0]] }}
              >
                {`${ability[0].toUpperCase()}${ability.substring(1)}`}
              </span>
            ))}
          </div>
        </div>
        <div className="info-group">
          <h5 className="info-group-title">Weight</h5>
          <div className="info-group-items">
            <span className="item">
              {(pokemonData.weight * 0.1).toFixed(2)} kg
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  full: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
