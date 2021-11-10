class RemoveShinyColumnFromPokemons < ActiveRecord::Migration[6.1]
  def change
    remove_column :pokemons, :shiny
  end
end
