class CreateAutocorrelationVisitweeks < ActiveRecord::Migration[6.0]
  def change
    create_table :autocorrelation_visitweeks do |t|
      t.integer :index
      t.float :original
      t.float :generated

      t.timestamps
    end
  end
end
