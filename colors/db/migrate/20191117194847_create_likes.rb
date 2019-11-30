class CreateLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :likes do |t|
      t.integer :color_id
      t.integer :value
      t.timestamps
    end
  end
end
