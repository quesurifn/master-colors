class AddUserFields < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :bio, :string
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :avatar, :string
    add_column :users, :job_title, :string
    add_column :users, :company, :string
  end
end
