class PokemonsController < ApplicationController
  def index
  end

  def pokedex
    response = HTTParty.get("https://pokeapi.co/api/v2/pokemon/?offset=#{params[:page]}&limit=50")
    case response.code
    when 200
      pokedex = JSON.parse(response.to_json, symbolize_names: true)[:results]
    when 500...600
      pokedex = []
    else
      raise StandardError
    end

    catalog = pokedex.map {|result| result[:name] }

    new_pokemons = []

    catalog.each do |name|
      next if check_pokemon(name).length > 0

      poke_response = HTTParty.get("https://pokeapi.co/api/v2/pokemon/#{name}")

      case poke_response.code
      when 200
        poke = JSON.parse(poke_response.to_json, symbolize_names: true)
        new_pokemons << poke
      else
        raise StandardError
      end
    end

    new_pokemons.each do |poke|
      species_response = HTTParty.get("https://pokeapi.co/api/v2/pokemon-species/#{poke[:id]}")
      species_response = JSON.parse(species_response.to_json, symbolize_names: true)
      poke[:evolution_chain] = species_response[:evolution_chain][:url]
      poke[:description] = species_response[:flavor_text_entries][0][:flavor_text]
      poke[:evolutions] = helpers.extract_evolution_chain(species_response[:evolution_chain][:url])

      Pokemon.create(
        name: poke[:name],
        number: poke[:id].to_i,
        image: "https://img.pokemondb.net/artwork/large/#{poke[:name]}.jpg",
        weight: poke[:weight],
        abilities: poke[:abilities].map {|ability| ability[:ability][:name] }.to_json,
        pokemon_type: poke[:types].map {|type| type[:type][:name] }.to_json,
        evolution_chain: poke[:evolution_chain],
        description: poke[:description],
        evolutions: poke[:evolutions],
      )
    end

    current_pokes = Pokemon.order("number ASC").offset(params[:page]).limit(50)

    return unless pokedex != []

    render json: {
      pokedex: pokedex,
      fetchedPokes: new_pokemons,
      currentPokes: current_pokes,
    }
  end

  def check_pokemon(name)
    Pokemon.where(name: name)
  end

  def search
    found_pokemons = Pokemon.where("name LIKE (?)", "%#{params[:search]}%")
    unless found_pokemons.length > 0
      response = HTTParty.get("https://pokeapi.co/api/v2/pokemon/#{params[:search].downcase}")
      found_pokemons = [] unless response
      found_pokemons = response.parsed_response
    end
    render json: {pokemons: found_pokemons}
  end
end
