class RenameColumns < ActiveRecord::Migration[6.0]
  def change
    rename_column :prism_observations, :parasite_status, :malaria_diagnosis_and_parasite_status
  end
end
