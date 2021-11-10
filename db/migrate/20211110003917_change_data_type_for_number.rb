class ChangeDataTypeForNumber < ActiveRecord::Migration[6.1]
  def change
    change_column :pokemons, :number, "integer USING number::integer"
  end
end
