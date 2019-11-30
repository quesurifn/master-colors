class CreateColors < ActiveRecord::Migration[6.0]
  def change
    create_table :colors do |t|
      t.string :color_one
      t.string :color_two
      t.string :color_three
      t.string :color_four
      t.string :color_five
      t.string :description
      t.timestamps
    end
  end
end
