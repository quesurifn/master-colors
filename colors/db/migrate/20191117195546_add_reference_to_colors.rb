class AddReferenceToColors < ActiveRecord::Migration[6.0]
  def change
    add_reference :colors, :like, foreign_key: true
  end
end
