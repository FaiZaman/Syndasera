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
#
# observations = File.read(Rails.root.join('lib', 'seeds', 'sorted.csv'))
# csv = CSV.parse(observations, :headers => true, :encoding => 'ISO-8859-1')
#
# csv.each do |row|
#
#     t = PrismObservation.new
#
#     t.observation_id = row['Observation_Id']
#     t.participant_id = row['Participant_Id']
#     t.household_id = row['Household_Id']
#     t.abdominal_pain = row['Abdominal pain [HP_0002027]']
#     t.abdominal_pain_duration = row['Abdominal pain duration (days) [EUPATH_0000154]']
#     t.admitting_hospital = row['Admitting hospital [EUPATH_0000318]']
#     t.age = row['Age at visit (years) [EUPATH_0000113]']
#     t.anorexia = row['Anorexia [SYMP_0000523]']
#     t.anorexia_duration = row['Anorexia duration (days) [EUPATH_0000155]']
#     t.plasmodium_parasite_density = row['Asexual Plasmodium parasite density, by microscopy [EUPATH_0000092]']
#     t.asexual_plasmodium_parasite_present = row['Asexual Plasmodium parasites present, by microscopy [EUPATH_0000048]']
#     t.basis_of_complicated_diagnosis = row['Basis of complicated diagnosis [EUPATH_0000316]']
#     t.complicated_malaria = row['Complicated malaria [EUPATH_0000040]']
#     t.cough = row['Cough [SYMP_0000614]']
#     t.cough_duration = row['Cough duration (days) [EUPATH_0000156]']
#     t.days_since_enrollment = row['Days since enrollment [EUPATH_0000191]']
#     t.diagnosis_at_hospitalisation = row['Diagnosis at hospitalization [EUPATH_0000638]']
#     t.diarrhoea = row['Diarrhea [DOID_13250]']
#     t.diarrhoea_duration = row['Diarrhea duration (days) [EUPATH_0000157]']
#     t.fatigue = row['Fatigue [SYMP_0019177]']
#     t.fatigue_duration = row['Fatigue duration (days) [EUPATH_0000158]']
#     t.febrile = row['Febrile [EUPATH_0000097]']
#     t.fever_duration = row['Fever, subjective duration (days) [EUPATH_0000164]']
#     t.headache = row['Headache [HP_0002315]']
#     t.headache_duration = row['Headache duration (days) [EUPATH_0000159]']
#     t.height = row['Height (cm) [EUPATH_0010075]']
#     t.haemoglobin = row['Hemoglobin (g/dL) [EUPATH_0000047]']
#     t.hospital_admission_date = row['Hospital admission date [EUPATH_0000319]']
#     t.hospital_discharge_date = row['Hospital discharge date [EUPATH_0000320]']
#     t.itn_last_night = row['ITN last night [EUPATH_0000216]']
#     t.jaundice = row['Jaundice [HP_0000952]']
#     t.jaundice_duration = row['Jaundice duration (days) [EUPATH_0000160]']
#     t.joint_pains = row['Joint pains [SYMP_0000064]']
#     t.joint_pains_duration = row['Joint pains duration (days) [EUPATH_0000161]']
#     t.malaria_diagnosis = row['Malaria diagnosis [EUPATH_0000090]']
#     t.malaria_diagnosis_and_parasite_status = row['Malaria diagnosis and parasite status [EUPATH_0000338]']
#     t.malaria_treatment = row['Malaria treatment [EUPATH_0000740]']
#     t.muscle_aches = row['Muscle aches [EUPATH_0000252]']
#     t.muscle_aches_duration = row['Muscle aches duration (days) [EUPATH_0000162]']
#     t.non_malaria_medication = row['Non-malaria medication [EUPATH_0000059]']
#     t.other_diagnosis = row['Other diagnosis [EUPATH_0000317]']
#     t.other_medical_complaint = row['Other medical complaint [EUPATH_0020002]']
#     t.plasmodium_gametocytes_present = row['Plasmodium gametocytes present, by microscopy [EUPATH_0000207]']
#     t.seizures = row['Seizures [SYMP_0000124]']
#     t.seizures_duration = row['Seizures duration (days) [EUPATH_0000163]']
#     t.severe_malaria_criteria = row['Severe malaria criteria [EUPATH_0000046]']
#     t.subjective_fever = row['Subjective fever [EUPATH_0000100]']
#     t.submicroscopic_plasmodium_present = row['Submicroscopic Plasmodium present, by LAMP [EUPATH_0000487]']
#     t.temperature = row['Temperature (C) [EUPATH_0000110]']
#     t.visit_date = row['Visit date [EUPATH_0000091]']
#     t.visit_type = row['Visit type [EUPATH_0000311]']
#     t.vomiting = row['Vomiting [HP_0002013]']
#     t.vomiting_duration = row['Vomiting duration (days) [EUPATH_0000165]']
#     t.weight = row['Weight (kg) [EUPATH_0000732]']
#
#     t.save
#     puts "#{t.observation_id}, #{t.participant_id} saved"
#
# end
#
# puts "There are now #{PrismObservation.count} rows in the transactions table"
#
# tSNE_plots = File.read(Rails.root.join('lib', 'seeds', 'tsne_coordinates.csv'))
# csv2 = CSV.parse(tSNE_plots, :headers => true, :encoding => 'ISO-8859-1')
# csv2.each do |row|
#   u = TSne.new
#
#   u.real_x = row['real_x']
#   u.real_y = row['real_y']
#   u.gen_x = row['gen_x']
#   u.gen_y = row['gen_y']
#
#   u.save
#   puts "#{u.real_x}, #{u.real_y} saved"
# end
#
# puts "There are now #{TSne.count} rows in the tSNE table"
#
# pca_plots = File.read(Rails.root.join('lib', 'seeds', 'pca_coordinates.csv'))
# csv3 = CSV.parse(pca_plots, :headers => true, :encoding => 'ISO-8859-1')
# csv3.each do |row|
#   v = PcaCoordinate.new
#
#   v.real_x = row['real_x']
#   v.real_y = row['real_y']
#   v.gen_x = row['gen_x']
#   v.gen_y = row['gen_y']
#
#   v.save
#   puts "#{v.real_x}, #{v.real_y} saved"
# end
#
# puts "There are now #{PcaCoordinate.count} rows in the PCA table"
#
# tpred_plot = File.read(Rails.root.join('lib', 'seeds', 't_Predictive_coordinates.csv'))
# csv4 = CSV.parse(tpred_plot, :headers => true, :encoding => 'ISO-8859-1')
# csv4.each do |row|
#   v = TPredictiveCoordinate.new
#
#   v.column = row['column']
#   v.test_loss_ori = row['test_loss_real']
#   v.test_metric_ori = row['test_metric_real']
#   v.test_loss_gen = row['test_loss_syn']
#   v.test_metric_gen = row['test_metric_syn']
#
#   v.save
#   puts "#{v.test_loss_ori}, #{v.test_metric_ori} saved"
# end
#
# puts "There are now #{TPredictiveCoordinate.count} rows in the t Pred table"
#
# mse3_plot = File.read(Rails.root.join('lib', 'seeds', 'MSE_3_coordinates_figure2.csv'))
# csv4 = CSV.parse(mse3_plot, :headers => true, :encoding => 'ISO-8859-1')
# csv4.each do |row|
#   v = Mse3Coordinate.new
#
#   v.model = row['model']
#   v.ori = row['ori']
#   v.gen = row['gen']
#
#   v.save
#   puts "#{v.model}, #{v.ori} saved"
# end
#
# puts "There are now #{Mse3Coordinate.count} rows in the MSE_3 table"
#
# cat_plot = File.read(Rails.root.join('lib', 'seeds', 'distribution_cat_coordinates.csv'))
# csv5 = CSV.parse(cat_plot, :headers => true, :encoding => 'ISO-8859-1')
# csv5.each do |row|
#   v = DistributionCatCoordinate.new
#
#   v.column = row['column']
#   v.ori = row['ori']
#   v.gen = row['gen']
#
#   v.save
#   puts "#{v.column}, #{v.ori} saved"
# end
#
# puts "There are now #{DistributionCatCoordinate.count} rows in the cat table"
#
# num_plot = File.read(Rails.root.join('lib', 'seeds', 'distribution_num_coordinates.csv'))
# csv6 = CSV.parse(num_plot, :headers => true, :encoding => 'ISO-8859-1')
# csv6.each do |row|
#   t = DistributionNumCoordinatesToday.new
#
#   t.ab_pain_dur_gen = row['ab_pain_dur_gen']
#   t.age_gen = row['age_gen']
#   t.aneroxia_dur_gen = row['aneroxia_dur_gen']
#   t.plasmodium_density_gen = row['plasmodium_density_gen']
#   t.cough_dur_gen = row['cough_dur_gen']
#   t.diarrhea_dur_gen = row['diarrhea_dur_gen']
#   t.fatigue_dur_gen = row['fatigue_dur_gen']
#   t.fever_dur_gen = row['fever_dur_gen']
#   t.headache_dur_gen = row['headache_dur_gen']
#   t.height_gen = row['height_gen']
#   t.hemoglobin_gen = row['hemoglobin_gen']
#   t.joint_pain_dur_gen = row['joint_pain_dur_gen']
#   t.muscle_ache_dur_gen = row['muscle_ache_dur_gen']
#   t.temp_gen = row['temp_gen']
#   t.vomit_dur_gen = row['vomit_dur_gen']
#   t.weight_gen = row['weight_gen']
#   t.dday_gen = row['dday_gen']
#   t.first_dday_gen = row['first_dday_gen']
#   t.ab_pain_dur_ori = row['ab_pain_dur_ori']
#   t.age_ori = row['age_ori']
#   t.aneroxia_dur_ori = row['aneroxia_dur_ori']
#   t.plasmodium_density_ori = row['plasmodium_density_ori']
#   t.cough_dur_ori = row['cough_dur_ori']
#   t.diarrhea_dur_ori = row['diarrhea_dur_ori']
#   t.fatigue_dur_ori = row['fatigue_dur_ori']
#   t.fever_dur_ori = row['fever_dur_ori']
#   t.headache_dur_ori = row['headache_dur_ori']
#   t.height_ori = row['height_ori']
#   t.hemoglobin_ori = row['hemoglobin_ori']
#   t.joint_pain_dur_ori = row['joint_pain_dur_ori']
#   t.muscle_ache_dur_ori = row['muscle_ache_dur_ori']
#   t.temp_ori = row['temp_ori']
#   t.vomit_dur_ori = row['vomit_dur_ori']
#   t.weight_ori = row['weight_ori']
#   t.dday_ori = row['dday_ori']
#   t.first_dday_ori = row['first_dday_ori']
#
#   t.save
#   puts "#{t.dday_gen}, #{t.dday_ori} saved"
# end
#
# puts "There are now #{DistributionNumCoordinatesToday.count} rows in the num table"
#
# mse1_plot = File.read(Rails.root.join('lib', 'seeds', 'MSE_1_coordinates_figure1.csv'))
# csv7 = CSV.parse(mse1_plot, :headers => true, :encoding => 'ISO-8859-1')
# csv7.each do |row|
#   v = Mse13Coordinate.new
#
#   v.model = row['model']
#   v.variable = row['variable']
#   v.mse_1_ori = row['mse_1_ori']
#   v.mse_1_gen = row['mse_1_gen']
#
#   v.save
#   puts "#{v.model}, #{v.variable} saved"
# end
#
# puts "There are now #{Mse13Coordinate.count} rows in the mse1 table"
#
# auto_visit_plot = File.read(Rails.root.join('lib', 'seeds', 'autocorrelation_visitweeks.csv'))
# csv8 = CSV.parse(auto_visit_plot, :headers => true, :encoding => 'ISO-8859-1')
# csv8.each do |row|
#   v = AutocorrelationVisitweek.new
#
#   v.index = row['index']
#   v.original = row['original']
#   v.generated = row['generated']
#
#   v.save
#   puts "#{v.index}, #{v.original} saved"
# end
#
# puts "There are now #{AutocorrelationVisitweek.count} rows in the auto visit table"
#
# auto_malaria_plot = File.read(Rails.root.join('lib', 'seeds', 'autocorrelation_malaria.csv'))
# csv9 = CSV.parse(auto_malaria_plot, :headers => true, :encoding => 'ISO-8859-1')
# csv9.each do |row|
#   v = AutocorrelationMalarium.new
#
#   v.index = row['index']
#   v.original = row['original']
#   v.generated = row['generated']
#
#   v.save
#   puts "#{v.index}, #{v.generated} saved"
# end
#
# puts "There are now #{AutocorrelationMalarium.count} rows in the auto visit table"
