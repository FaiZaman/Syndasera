class EvalController < ApplicationController

    protect_from_forgery with: :null_session
    respond_to :js, :json, :html

    def get_tSNE_data
        @tSNE_data = TSne.all.to_json()
        render json: @tSNE_data
    end

end
