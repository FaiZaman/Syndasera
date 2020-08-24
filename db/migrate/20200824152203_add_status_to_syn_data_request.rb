class AddStatusToSynDataRequest < ActiveRecord::Migration[6.0]
  def change
    add_column :syn_data_requests, :status, :string, :default => "received"
  end
end
