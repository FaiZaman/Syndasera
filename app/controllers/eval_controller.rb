class EvalController < ApplicationController

    protect_from_forgery with: :null_session
    respond_to :js, :json, :html

    def get_tSNE_data
        @tSNE_data = TSne.all.to_json()
        render json: @tSNE_data
    end

    def get_PCA_data
        @PCA_data = PcaCoordinate.all.to_json()
        render json: @PCA_data
    end

end
