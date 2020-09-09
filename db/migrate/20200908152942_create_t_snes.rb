class CreateTSnes < ActiveRecord::Migration[6.0]
  def change
    create_table :t_snes do |t|
      t.float :real_x
      t.float :real_y
      t.float :gen_x
      t.float :gen_y

      t.timestamps
    end
  end
end
