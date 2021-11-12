class PokemonsController < ApplicationController
  def index
  end

  def pokedex
    response = HTTParty.get("https://pokeapi.co/api/v2/pokemon/?offset=#{params[:offset]}&limit=#{params[:items_count]}")
    pokedex = JSON.parse(response.to_json, symbolize_names: true)[:results]

    catalog = pokedex.map {|result| result[:name] }

    new_pokemons = []

    catalog.each do |name|
      next if Pokemon.where(name: name).length > 0

      poke_response = HTTParty.get("https://pokeapi.co/api/v2/pokemon/#{name}")
      poke = JSON.parse(poke_response.to_json, symbolize_names: true)
      new_pokemons << poke
    end

    new_pokemons.each do |poke|
      helpers.fetch_and_create(poke)
    end

    current_pokes = Pokemon.order("number ASC").offset(params[:offset]).limit(params[:items_count]).uniq

    return unless pokedex != []

    render json: {
      pokedex: pokedex,
      fetchedPokes: new_pokemons,
      currentPokes: current_pokes,
    }
  end

  def search
    found_pokemons = Pokemon.where("name LIKE (?)", "%#{params[:search]}%")
    unless found_pokemons.length > 0
      response = HTTParty.get("https://pokeapi.co/api/v2/pokemon/#{params[:search].downcase}")
      found_pokemons = response.parsed_response
      if found_pokemons != "Not Found"
        helpers.fetch_and_create(JSON.parse(found_pokemons.to_json, symbolize_names: true))
        found_pokemons = Pokemon.where(name: params[:search])
      end
    end
    render json: {pokemons: found_pokemons}
  end
end
