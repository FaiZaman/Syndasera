class CreateDistributionNumCoordinates < ActiveRecord::Migration[6.0]
  def change
    create_table :distribution_num_coordinates do |t|
      t.float :ab_pain_dur_gen
      t.float :age_gen
      t.float :aneroxia_dur_gen
      t.float :plasmodium_density_gen
      t.float :cough_dur_gen
      t.float :diarrhea_dur_gen
      t.float :fatigue_dur_gen
      t.float :fever_dur_gen
      t.float :headache_dur_gen
      t.float :height_gen
      t.float :hemoglobin_gen
      t.float :joint_pain_dur_gen
      t.float :muscle_ache_dur_gen
      t.float :temp_gen
      t.float :vomit_dur_gen
      t.float :weight_gen
      t.float :dday_gen
      t.float :first_dday_gen
      t.float :ab_pain_dur_ori
      t.float :age_ori
      t.float :aneroxia_dur_ori
      t.float :plasmodium_density_ori
      t.float :cough_dur_ori
      t.float :diarrhea_dur_ori
      t.float :fatigue_dur_ori
      t.float :fever_dur_ori
      t.float :headache_dur_ori
      t.float :height_ori
      t.float :hemoglobin_ori
      t.float :joint_pain_dur_ori
      t.float :muscle_ache_dur_ori
      t.float :temp_ori
      t.float :vomit_dur_ori
      t.float :weight_ori
      t.float :dday_ori
      t.float :first_dday_ori

      t.timestamps
    end
  end
end
