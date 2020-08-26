class AddDatasetNameToSynDataRequests < ActiveRecord::Migration[6.0]
  def change
    add_column :syn_data_requests, :dataset_name, :string
  end
end
