FactoryBot.define do
  factory :pokemon do
    name { "MyPokemon" }
    number { 111111 }
    image { "http://mypokemonimage.com" }
    pokemon_type { "Pokemon" }
    weight { 50 }
    abilities { "invencible" }
    description { "A random pokemon" }
    evolutions { "none" }
    evolution_chain { "none" }
  end
end
