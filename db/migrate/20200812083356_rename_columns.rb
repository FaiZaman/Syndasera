class RenameAgeAtVisitToAge < ActiveRecord::Migration[6.0]
  def change
    rename_column :prism_observations, :age_at_visit, :age
    rename_column :prism_observations, :asexual_plasmodium_parasite_density, :plasmodium_parasite_density
    rename_column :prism_observations, :malaria_diagnosis_and_parasite_status, :parasite_status
  end
end
