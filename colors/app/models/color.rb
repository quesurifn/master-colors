class Color < ApplicationRecord
    accepts_nested_attributes_for :tag
    has_and_belongs_to_many :tag
    has_many :like
end
