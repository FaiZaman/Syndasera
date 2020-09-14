class CreateDistributionCatCoordinates < ActiveRecord::Migration[6.0]
  def change
    create_table :distribution_cat_coordinates do |t|
      t.string :column
      t.float :ori
      t.float :gen

      t.timestamps
    end
  end
end
