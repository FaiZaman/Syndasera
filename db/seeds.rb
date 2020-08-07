require 'csv'

# This file should contain all the record creation needed to 
# seed the database with its default values.
# The data can then be loaded with the rails db:seed command 
# (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

observations = File.read(Rails.root.join('lib', 'seeds', 'isaFull.csv'))
csv = CSV.parse(observations, :headers => true, :encoding => 'ISO-8859-1')

csv.each do |row|

    t = PrismObservation.new
    
    t.observation_id = row['Observation_Id']
    t.participant_id = row['Participant_Id']
    t.household_id = row['Household_Id']
    t.abdominal_pain = row['Abdominal pain [HP_0002027]']
    t.abdominal_pain_duration = row['Abdominal pain duration (days) [EUPATH_0000154]']
    t.admitting_hospital = row['Admitting hospital [EUPATH_0000318]']
    t.age_at_visit = row['Age at visit (years) [EUPATH_0000113]']
    t.anorexia = row['Anorexia [SYMP_0000523]']
    t.anorexia_duration = row['Anorexia duration (days) [EUPATH_0000155]']
    t.asexual_plasmodium_parasite_density = row['Asexual Plasmodium parasite density, by microscopy [EUPATH_0000092]']
    t.asexual_plasmodium_parasite_present = row['Asexual Plasmodium parasites present, by microscopy [EUPATH_0000048]']
    t.basis_of_complicated_diagnosis = row['Basis of complicated diagnosis [EUPATH_0000316]']
    t.complicated_malaria = row['Complicated malaria [EUPATH_0000040]']
    t.cough = row['Cough [SYMP_0000614]']
    t.cough_duration = row['Cough duration (days) [EUPATH_0000156]']
    t.days_since_enrollment = row['Days since enrollment [EUPATH_0000191]']
    t.diagnosis_at_hospitalisation = row['Diagnosis at hospitalization [EUPATH_0000638]']
    t.diarrhoea = row['Diarrhea [DOID_13250]']
    t.diarrhoea_duration = row['Diarrhea duration (days) [EUPATH_0000157]']
    t.fatigue = row['Fatigue [SYMP_0019177]']
    t.fatigue_duration = row['Fatigue duration (days) [EUPATH_0000158]']
    t.febrile = row['Febrile [EUPATH_0000097]']
    t.fever_duration = row['Fever, subjective duration (days) [EUPATH_0000164]']
    t.headache = row['Headache [HP_0002315]']
    t.headache_duration = row['Headache duration (days) [EUPATH_0000159]']
    t.height = row['Height (cm) [EUPATH_0010075]']
    t.haemoglobin = row['Hemoglobin (g/dL) [EUPATH_0000047]']
    t.hospital_admission_date = row['Hospital admission date [EUPATH_0000319]']
    t.hospital_discharge_date = row['Hospital discharge date [EUPATH_0000320]']
    t.itn_last_night = row['ITN last night [EUPATH_0000216]']
    t.jaundice = row['Jaundice [HP_0000952]']
    t.jaundice_duration = row['Jaundice duration (days) [EUPATH_0000160]']
    t.joint_pains = row['Joint pains [SYMP_0000064]']
    t.joint_pains_duration = row['Joint pains duration (days) [EUPATH_0000161]']
    t.malaria_diagnosis = row['Malaria diagnosis [EUPATH_0000090]']
    t.malaria_diagnosis_and_parasite_status = row['Malaria diagnosis and parasite status [EUPATH_0000338]']
    t.malaria_treatment = row['Malaria treatment [EUPATH_0000740]']
    t.muscle_aches = row['Muscle aches [EUPATH_0000252]']
    t.muscle_aches_duration = row['Muscle aches duration (days) [EUPATH_0000162]']
    t.non_malaria_medication = row['Non-malaria medication [EUPATH_0000059]']
    t.other_diagnosis = row['Other diagnosis [EUPATH_0000317]']
    t.other_medical_complaint = row['Other medical complaint [EUPATH_0020002]']
    t.plasmodium_gametocytes_present = row['Plasmodium gametocytes present, by microscopy [EUPATH_0000207]']
    t.seizures = row['Seizures [SYMP_0000124]']
    t.seizures_duration = row['Seizures duration (days) [EUPATH_0000163]']
    t.severe_malaria_criteria = row['Severe malaria criteria [EUPATH_0000046]']
    t.subjective_fever = row['Subjective fever [EUPATH_0000100]']
    t.submicroscopic_plasmodium_present = row['Submicroscopic Plasmodium present, by LAMP [EUPATH_0000487]']
    t.temperature = row['Temperature (C) [EUPATH_0000110]']
    t.visit_date = row['Visit date [EUPATH_0000091]']
    t.visit_type = row['Visit type [EUPATH_0000311]']
    t.vomiting = row['Vomiting [HP_0002013]']
    t.vomiting_duration = row['Vomiting duration (days) [EUPATH_0000165]']
    t.weight = row['Weight (kg) [EUPATH_0000732]']

    t.save
    puts "#{t.observation_id}, #{t.participant_id} saved"

end

puts "There are now #{PrismObservation.count} rows in the transactions table"
