class UsersController < ApplicationController
    before_action :authorize_request, except: :create
    before_action :find_user, except: %i[create index]
    wrap_parameters :user, include: [:avatar, :first_name, :last_name, :bio, :job_title , :company , :password, :email]

    # GET /users
    def index
        @users = User.all
        render json: @users, status: :ok
    end

    # GET /users/{username}
    def show
       render json: @user, status: :ok
    end

    # POST /users 
    def create
        @user = User.new(user_params)
        if @user.save
            render json: @user, status: :created
        else 
            render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        unless @user.update(user_params)
            render json: {errors: @user.errors.fill_messages}, status: :unprocessable_entity
        end
    end


    def destroy
        @user.destroy
    end
    
    def find_user
        @user = User.find_by_email!(params[:_email])
        rescue ActiveRecord::RecordNotFound
            render json: {errors: 'User Not Found'}, status: :not_found
    end

    private

    def user_params
        params.require(:user).permit(:avatar, :first_name, :last_name, :bio, :job_title , :company , :password, :email)
    end
end