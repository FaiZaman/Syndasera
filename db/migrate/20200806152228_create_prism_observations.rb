class CreatePrismObservations < ActiveRecord::Migration[6.0]
  def change
    create_table :prism_observations do |t|
      t.integer :observation_id
      t.integer :participant_id
      t.string :household_id
      t.string :abdominal_pain
      t.integer :abdominal_pain_duration
      t.string :admitting_hospital
      t.float :age
      t.string :anorexia
      t.integer :anorexia_duration
      t.integer :plasmodium_parasite_density
      t.string :asexual_plasmodium_parasite_present
      t.string :basis_of_complicated_diagnosis
      t.string :complicated_malaria
      t.string :cough
      t.integer :cough_duration
      t.integer :days_since_enrollment
      t.string :diagnosis_at_hospitalisation
      t.string :diarrhoea
      t.integer :diarrhoea_duration
      t.string :fatigue
      t.integer :fatigue_duration
      t.string :febrile
      t.integer :fever_duration
      t.string :headache
      t.integer :headache_duration
      t.integer :height
      t.float :haemoglobin
      t.date :hospital_admission_date
      t.date :hospital_discharge_date
      t.string :itn_last_night
      t.string :jaundice
      t.integer :jaundice_duration
      t.string :joint_pains
      t.integer :joint_pains_duration
      t.string :malaria_diagnosis
      t.string :parasite_status
      t.string :malaria_treatment
      t.string :muscle_aches
      t.integer :muscle_aches_duration
      t.string :non_malaria_medication
      t.string :other_diagnosis
      t.string :other_medical_complaint
      t.string :plasmodium_gametocytes_present
      t.string :seizures
      t.integer :seizures_duration
      t.string :severe_malaria_criteria
      t.string :subjective_fever
      t.string :submicroscopic_plasmodium_present
      t.float :temperature
      t.date :visit_date
      t.string :visit_type
      t.string :vomiting
      t.integer :vomiting_duration
      t.float :weight

      t.timestamps
    end
  end
end
