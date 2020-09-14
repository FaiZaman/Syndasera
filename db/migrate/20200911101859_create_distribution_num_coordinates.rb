class CreateDistributionNumCoordinates < ActiveRecord::Migration[6.0]
  def change
    create_table :distribution_num_coordinates do |t|
      t.float :dday_gen
      t.float :weight_gen
      t.float :height_gen
      t.float :age_gen
      t.float :temp_gen
      t.float :dday_ori
      t.float :weight_ori
      t.float :height_ori
      t.float :age_ori
      t.float :temp_ori

      t.timestamps
    end
  end
end
