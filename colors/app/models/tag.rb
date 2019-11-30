class Tag < ApplicationRecord
    validates :slug, uniqueness: true
    validates :value, uniqueness: true
    has_and_belongs_to_many :color
end