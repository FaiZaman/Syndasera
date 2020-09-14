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

    def get_tPred_data
        @tPred_data = TPredictiveCoordinate.all.to_json()
        render json: @tPred_data
    end

    def get_MSE3_data
        @MSE3_data = Mse3Coordinate.all.to_json()
        render json: @MSE3_data
    end

    def get_cat_data
        @cat_data = DistributionCatCoordinate.all.to_json()
        render json: @cat_data
    end

    def get_num_data
        @num_data = DistributionNumCoordinate.all.to_json()
        render json: @num_data
    end

    def get_num_data_5000
      @num_data = DistributionNumCoordinate.first(5000).to_json()
      render json: @num_data
    end

    def get_MSE1_data
        @MSE1_data = Mse13Coordinate.all.to_json()
        render json: @MSE1_data
    end


end
