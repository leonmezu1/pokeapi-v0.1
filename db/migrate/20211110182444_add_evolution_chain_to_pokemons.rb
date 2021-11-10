class AddEvolutionChainToPokemons < ActiveRecord::Migration[6.1]
  def change
    add_column :pokemons, :evolution_chain, :string
  end
end
