class CreateMse3Coordinates < ActiveRecord::Migration[6.0]
  def change
    create_table :mse3_coordinates do |t|
      t.string :model
      t.float :ori
      t.float :gen

      t.timestamps
    end
  end
end
