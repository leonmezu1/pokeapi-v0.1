class AddColumnsToPokemon < ActiveRecord::Migration[6.1]
  def change
    add_column :pokemons, :type, :string
    add_column :pokemons, :weight, :integer
    add_column :pokemons, :abilities, :text
    add_column :pokemons, :description, :text
    add_column :pokemons, :evolutions, :text
  end
end
