class CreateSynDataRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :syn_data_requests do |t|
      t.string :first_name
      t.string :last_name
      t.string :company_name
      t.string :dataset_type
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
