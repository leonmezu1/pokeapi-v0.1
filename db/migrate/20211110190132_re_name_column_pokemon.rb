class ReNameColumnPokemon < ActiveRecord::Migration[6.1]
  def change
    rename_column :pokemons, :type, :pokemon_type
    # Ex:- rename_column("admin_users", "pasword","hashed_pasword")
  end
end
