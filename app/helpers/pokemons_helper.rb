module PokemonsHelper
  def extract_evolution_chain(url)
    evolution = nil
    response = HTTParty.get(url)
    case response.code
    when 200
      data = JSON.parse(response.to_json, symbolize_names: true)
      evo_chain = []
      evo_data = data[:chain]

      while evo_data.try(:key?, :evolves_to)
        evo_chain << {name: evo_data[:species][:name]}
        evo_data = evo_data[:evolves_to][0]
      end
      evolution = evo_chain
    when 500..600
      evolution = []
    end
    evolution
  end

  def fetch_and_create(poke)
    species_response = HTTParty.get("https://pokeapi.co/api/v2/pokemon-species/#{poke[:id]}")
    species_response = JSON.parse(species_response.to_json, symbolize_names: true)
    poke[:evolution_chain] = species_response[:evolution_chain][:url]
    poke[:description] = species_response[:flavor_text_entries].select {|flavor| flavor[:language][:name] = "en" }[0][:flavor_text]
    poke[:evolutions] = extract_evolution_chain(species_response[:evolution_chain][:url])

    Pokemon.create(
      name: poke[:name],
      number: poke[:id].to_i,
      image: "https://img.pokemondb.net/artwork/large/#{poke[:name]}.jpg",
      weight: poke[:weight],
      abilities: poke[:abilities].map {|ability| ability[:ability][:name] }.to_json,
      pokemon_type: poke[:types].map {|type| type[:type][:name] }.to_json,
      evolution_chain: poke[:evolution_chain],
      description: poke[:description],
      evolutions: poke[:evolutions].to_json,
    )
  end
end
