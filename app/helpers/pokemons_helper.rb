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
    when 400..600
      evolution = []
    end
    evolution
  end
end
