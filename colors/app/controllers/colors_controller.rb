require 'csv'

class ColorsController < ApplicationController
    before_action :authorize_request!, :except => [:show, :index, :generate, :create]

    def index
        @colors = Color.order(created_at: :desc).take(50)
        render json: {data: @colors}
    end

    def create
        @color = Color.create(color_params)
        @tag = Tag.find_or_create_by(value: color_params[:tag_value])
        @color.tags << @tag
        render json: {data: @color}
    end

    def show
        @color = Color.find(color_params[:id])
        render json: {data: @color}
    end

    def generate
        path = File.expand_path("../../../lib/colornames.csv", __FILE__)
        colors = CSV.read(path)
        random_colors = []
        5.times { random_colors << colors.sample }
        formatted = random_colors.map { |e| Hash[ "name", e[0] , "color", e[1] ] }
        render json: {data: formatted}
    end

    private
    
    def color_params
        params.require(:color).permit(:id, :color_one, :color_two, :color_three, :color_four, :color_five, :description, tag_attributes: [:value])
    end
    
end
