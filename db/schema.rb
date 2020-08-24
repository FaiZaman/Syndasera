# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_24_152203) do

  create_table "prism_observations", force: :cascade do |t|
    t.integer "observation_id"
    t.integer "participant_id"
    t.string "household_id"
    t.string "abdominal_pain"
    t.integer "abdominal_pain_duration"
    t.string "admitting_hospital"
    t.float "age"
    t.string "anorexia"
    t.integer "anorexia_duration"
    t.integer "plasmodium_parasite_density"
    t.string "asexual_plasmodium_parasite_present"
    t.string "basis_of_complicated_diagnosis"
    t.string "complicated_malaria"
    t.string "cough"
    t.integer "cough_duration"
    t.integer "days_since_enrollment"
    t.string "diagnosis_at_hospitalisation"
    t.string "diarrhoea"
    t.integer "diarrhoea_duration"
    t.string "fatigue"
    t.integer "fatigue_duration"
    t.string "febrile"
    t.integer "fever_duration"
    t.string "headache"
    t.integer "headache_duration"
    t.integer "height"
    t.float "haemoglobin"
    t.date "hospital_admission_date"
    t.date "hospital_discharge_date"
    t.string "itn_last_night"
    t.string "jaundice"
    t.integer "jaundice_duration"
    t.string "joint_pains"
    t.integer "joint_pains_duration"
    t.string "malaria_diagnosis"
    t.string "malaria_diagnosis_and_parasite_status"
    t.string "malaria_treatment"
    t.string "muscle_aches"
    t.integer "muscle_aches_duration"
    t.string "non_malaria_medication"
    t.string "other_diagnosis"
    t.string "other_medical_complaint"
    t.string "plasmodium_gametocytes_present"
    t.string "seizures"
    t.integer "seizures_duration"
    t.string "severe_malaria_criteria"
    t.string "subjective_fever"
    t.string "submicroscopic_plasmodium_present"
    t.float "temperature"
    t.date "visit_date"
    t.string "visit_type"
    t.string "vomiting"
    t.integer "vomiting_duration"
    t.float "weight"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "syn_data_requests", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "company_name"
    t.string "dataset_type"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "dataset_name"
    t.string "status", default: "received"
    t.index ["user_id"], name: "index_syn_data_requests_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "syn_data_requests", "users"
end
