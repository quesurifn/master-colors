class LikesController < ApplicationController
    accepts_nested_attributes_for :colors
    def create
        color = Color.find(:color_id)
        color.likes.create(value: 1)
    end

    private
    
    def likes_params
        params.require(:like).permit(:value,  color_attributes: [:id])
    end
end
