class CreateTPredictiveCoordinates < ActiveRecord::Migration[6.0]
  def change
    create_table :t_predictive_coordinates do |t|
      t.string :column
      t.float :test_loss_ori
      t.float :test_metric_ori
      t.float :test_loss_gen
      t.float :test_metric_gen

      t.timestamps
    end
  end
end
