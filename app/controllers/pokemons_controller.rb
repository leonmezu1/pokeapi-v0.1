class PokemonsController < ApplicationController
  def index; end

  def pokedex
    response = HTTParty.get("https://pokeapi.co/api/v2/pokemon/?offset=#{params[:page]}&limit=30")
    pokedex = [] unless response
    pokedex = JSON.parse(response.to_json, symbolize_names: true)[:results]
    names = pokedex.map { |result| result[:name] }

    new_pokemons = []
    
    names.each do |name|
      unless check_pokemon(name).length > 0 
        poke_response = HTTParty.get("https://pokeapi.co/api/v2/pokemon/#{name}")
        poke = nil unless poke_response
        poke = JSON.parse(poke_response.to_json, symbolize_names: true)
        new_pokemons << poke
      end
    end

    new_pokemons.each do |newpoke|
      Pokemon.create(name: newpoke[:name], number: newpoke[:id])
    end
    
    current_pokes = Pokemon.offset(params[:page]).limit(30)

    

    render json: {
      pokedex: pokedex,
      names: names,
      class: names.class,
      fetchedPokes: new_pokemons,
      currentPokes: current_pokes

      #inner: pokedex_inner
    } if pokedex != []
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
    render json: { pokemons: found_pokemons }
  end
end
