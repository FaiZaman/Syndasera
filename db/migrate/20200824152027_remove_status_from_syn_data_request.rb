class RemoveStatusFromSynDataRequest < ActiveRecord::Migration[6.0]
  def change
    remove_column :syn_data_requests, :status, :string
  end
end
