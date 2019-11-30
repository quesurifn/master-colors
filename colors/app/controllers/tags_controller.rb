class TagsController < ApplicationController
    before_action :authorize_request
    def create
        tag_params[:slug] = tag_params[:value].parameterize
        @tag = Tag.create(tag_params)
        render json: {data: @tag}
    end

    def destroy
        @tag = Tag.where(slug: tag_params[:slug]).destroy
        render json: {data: @tag}
    end

    private
    
    def tag_params
        params.require(:tag).permit(:id, :value, :slug)
    end
end
