class CreateJwtBlacklists < ActiveRecord::Migration[6.0]
  def change
    create_table :jwt_blacklists do |t|
      t.string :token
      t.integer :expiration
      t.timestamps
    end
  end
end
