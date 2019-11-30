class Like < ApplicationRecord
    belongs_to :color
    accepts_nested_attributes_for :color
end
