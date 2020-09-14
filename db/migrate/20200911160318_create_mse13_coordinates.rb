class CreateMse13Coordinates < ActiveRecord::Migration[6.0]
  def change
    create_table :mse13_coordinates do |t|
      t.string :model
      t.string :variable
      t.float :mse_1_ori
      t.float :mse_1_gen

      t.timestamps
    end
  end
end
