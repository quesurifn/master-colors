class ApplicationController < ActionController::API

    def not_found
        render json: {error: 'not_found'}
    end

    def authorize_request
        header = request.headers['Authorization']
        header = header.split(' ').last 
        if header
            begin
                token = JWTBlacklist.find_by(token: header)
                isExpired? === Time.now.to_i > token[:expiration] 
                if isExpired?
                    render json: {errors: "token_expired"}, status: :unauthorized
                end
                @decoded = JsonWebToken.decode(header)
                @current_user = User.find(@decoded[:user_id])
            rescue ActiveRecord::RecordNotFound => e
                render json: {errors: e.message}, status: :unauthorized
            rescue JWT::DecodeError => e
                render json: {errors: e.message}, status: :unauthorized
            end
        end
    end
end
